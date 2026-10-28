import { useEffect, useRef, useState } from 'react';

import { RulesTable } from './components/RulesTable';
import { RuleEditor } from './components/RuleEditor';
import { NotificationToast } from './components/NotificationToast';

import {
  ApiError,
  listRules,
  getRuleById,
  createRule,
  updateRule,
  updateRuleStatus,
} from './services/rulesApi';

import type { RuleInput } from './services/rulesApi';
import type { Rule, RuleSummary } from './types/rule';

type EditorState = {
  rule?: Rule;
};

type NotificationType = 'success' | 'error' | 'loading';

type Notification = {
  id: number;
  type: NotificationType;
  message: string;
};

const successNotificationDuration = 4000;

function getApiErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message;
  }

  return 'No fue posible conectar con el servidor. Verifica que Express esté funcionando.';
}

export default function App() {
  const [rules, setRules] = useState<RuleSummary[]>([]);
  const [editor, setEditor] = useState<EditorState | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [reloadAttempt, setReloadAttempt] = useState(0);

  const [updatingRuleId, setUpdatingRuleId] = useState<
    string | null
  >(null);

  const [notification, setNotification] =
    useState<Notification | null>(null);

  const notificationId = useRef(0);

  const statusRequestInProgress = useRef(false);
  const editRequestInProgress = useRef(false);

  const showNotification = (
    type: NotificationType,
    message: string
  ) => {
    notificationId.current += 1;

    setNotification({
      id: notificationId.current,
      type,
      message,
    });
  };

  useEffect(() => {
    if (notification?.type !== 'success') {
      return;
    }

    const currentNotificationId = notification.id;

    const timeoutId = window.setTimeout(() => {
      setNotification((currentNotification) =>
        currentNotification?.id === currentNotificationId
          ? null
          : currentNotification
      );
    }, successNotificationDuration);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [notification]);

  useEffect(() => {
    let isCurrentRequest = true;

    async function loadRules() {
      try {
        const fetchedRules = await listRules();

        if (!isCurrentRequest) {
          return;
        }

        setRules(fetchedRules);
        setLoadError(null);
      } catch (error) {
        if (isCurrentRequest) {
          setLoadError(getApiErrorMessage(error));
        }
      } finally {
        if (isCurrentRequest) {
          setIsLoading(false);
        }
      }
    }

    void loadRules();

    return () => {
      isCurrentRequest = false;
    };
  }, [reloadAttempt]);

  const retryLoadingRules = () => {
    setIsLoading(true);
    setLoadError(null);
    setNotification(null);

    setReloadAttempt((currentAttempt) => currentAttempt + 1);
  };

  const openCreateRule = () => {
    if (
      editRequestInProgress.current ||
      statusRequestInProgress.current
    ) {
      return;
    }

    setNotification(null);
    setEditor({});
  };

  const openEditRule = async (selectedRule: RuleSummary) => {
    if (
      editRequestInProgress.current ||
      statusRequestInProgress.current
    ) {
      return;
    }

    editRequestInProgress.current = true;


    showNotification(
      'loading',
      'Cargando la configuración de la regla...'
    );

    try {
      const completeRule = await getRuleById(selectedRule.id);

      setNotification(null);
      setEditor({ rule: completeRule });
    } catch (error) {
      showNotification(
        'error',
        getApiErrorMessage(error)
      );
    } finally {
      editRequestInProgress.current = false;
    }
  };

  const closeEditor = () => {
    setEditor(null);
  };

  const saveRule = async (input: RuleInput): Promise<void> => {
    const existingRule = editor?.rule;

    const savedRule = existingRule
      ? await updateRule(existingRule.id, input)
      : await createRule(input);

    const savedSummary: RuleSummary = {
      id: savedRule.id,
      name: savedRule.name,
      trigger: savedRule.trigger,
      isActive: savedRule.isActive,
    };

    setRules((currentRules) =>
      existingRule
        ? currentRules.map((rule) =>
            rule.id === savedRule.id ? savedSummary : rule
          )
        : [savedSummary, ...currentRules]
    );

    setEditor(null);

    showNotification(
      'success',
      existingRule
        ? 'La regla se actualizó correctamente en el servidor.'
        : 'La regla se creó correctamente en el servidor.'
    );
  };

  const toggleRuleStatus = async (ruleId: string) => {
    if (
      statusRequestInProgress.current ||
      editRequestInProgress.current
    ) {
      return;
    }

    const selectedRule = rules.find(
      (rule) => rule.id === ruleId
    );

    if (!selectedRule) {
      return;
    }

    statusRequestInProgress.current = true;

    setUpdatingRuleId(ruleId);

    showNotification(
      'loading',
      'Guardando el estado de la regla...'
    );

    try {
      const updatedRule = await updateRuleStatus(
        ruleId,
        !selectedRule.isActive
      );

      setRules((currentRules) =>
        currentRules.map((rule) =>
          rule.id === updatedRule.id
            ? { ...rule, isActive: updatedRule.isActive }
            : rule
        )
      );

      showNotification(
        'success',
        updatedRule.isActive
          ? `La regla "${updatedRule.name}" fue activada.`
          : `La regla "${updatedRule.name}" fue desactivada.`
      );
    } catch (error) {
      showNotification(
        'error',
        getApiErrorMessage(error)
      );
    } finally {
      statusRequestInProgress.current = false;
      setUpdatingRuleId(null);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-800">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-2xl font-semibold">
            Reglas de notificación
          </h1>

          <div
            role="status"
            className="mt-6 flex items-center gap-3 text-sm text-slate-600"
          >
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />

            Cargando reglas desde el servidor...
          </div>
        </div>
      </main>
    );
  }

  if (loadError) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-800">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-2xl font-semibold">
            Reglas de notificación
          </h1>

          <div
            role="alert"
            className="mt-6 max-w-xl rounded-xl border border-red-200 bg-white p-5 shadow-sm"
          >
            <h2 className="font-semibold text-red-700">
              No se pudieron cargar las reglas
            </h2>

            <p className="mt-2 text-sm text-slate-600">
              {loadError}
            </p>

            <button
              type="button"
              onClick={retryLoadingRules}
              className="mt-4 cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Reintentar
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (editor !== null) {
    return (
      <RuleEditor
        rule={editor.rule}
        onBack={closeEditor}
        onSave={saveRule}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {notification && (
        <NotificationToast
          key={notification.id}
          type={notification.type}
          message={notification.message}
          onDismiss={() => setNotification(null)}
        />
      )}

      <RulesTable
        rules={rules}
        onToggleRuleStatus={toggleRuleStatus}
        onCreateRule={openCreateRule}
        onEditRule={openEditRule}
        updatingRuleId={updatingRuleId}
      />
    </div>
  );
}
