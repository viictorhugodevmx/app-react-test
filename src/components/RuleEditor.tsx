import { useRef, useState } from 'react';

import { WizardSteps } from './WizardSteps';
import { TriggerStep } from './TriggerStep';
import { ConditionsStep } from './ConditionsStep';
import { ActionsStep } from './ActionsStep';

import { triggerOptions } from '../config/ruleOptions';
import { ApiError } from '../services/rulesApi';

import type { RuleInput } from '../services/rulesApi';

import {
  validateRuleName,
  validateConditions,
  validateActions,
} from '../utils/ruleValidation';

import type {
  ActionErrors,
  ConditionErrors,
} from '../utils/ruleValidation';

import type { WizardStep } from './WizardSteps';

import type {
  Rule,
  Trigger,
  Condition,
  ConditionLogic,
  RuleAction,
} from '../types/rule';

type RuleEditorProps = {
  rule?: Rule;
  onBack: () => void;
  onSave: (input: RuleInput) => Promise<void>;
};

type MoveDirection = 'up' | 'down';
type ActionType = RuleAction['type'];

function createAction(
  actionType: ActionType,
  actionId: string = crypto.randomUUID()
): RuleAction {
  switch (actionType) {
    case 'email':
      return {
        id: actionId,
        type: 'email',
        recipient: '',
        subject: '',
        body: '',
      };

    case 'sms':
      return {
        id: actionId,
        type: 'sms',
        phoneNumber: '',
        message: '',
      };

    case 'webhook':
      return {
        id: actionId,
        type: 'webhook',
        url: '',
        method: 'POST',
      };
  }
}

function getSaveErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return error.details.length > 0
      ? `${error.message} ${error.details.join(' ')}`
      : error.message;
  }

  return 'No fue posible guardar la regla. Verifica la conexión con el servidor.';
}

export function RuleEditor({
  rule,
  onBack,
  onSave,
}: RuleEditorProps) {
  const [currentStep, setCurrentStep] = useState<WizardStep>(1);

  const [name, setName] = useState(rule?.name ?? '');
  const [nameError, setNameError] = useState<string | null>(
    null
  );

  const [trigger, setTrigger] = useState<Trigger>(
    rule?.trigger ?? 'customer_created'
  );

  const [conditions, setConditions] = useState<Condition[]>(
    () =>
      rule?.conditions.map((condition) => ({
        ...condition,
      })) ?? []
  );

  const [conditionErrors, setConditionErrors] =
    useState<ConditionErrors>({});

  const [conditionLogic, setConditionLogic] =
    useState<ConditionLogic>(
      rule?.conditionLogic ?? 'AND'
    );

  const [actions, setActions] = useState<RuleAction[]>(
    () =>
      rule?.actions.map((action) => ({
        ...action,
      })) ?? []
  );

  const [actionErrors, setActionErrors] =
    useState<ActionErrors>({});

  const [actionsError, setActionsError] =
    useState<string | null>(null);

  const [isActionsValidated, setIsActionsValidated] =
    useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(
    null
  );

  const saveRequestInProgress = useRef(false);

  const clearConditionError = (conditionId: string) => {
    setConditionErrors((currentErrors) => {
      const nextErrors = { ...currentErrors };
      delete nextErrors[conditionId];
      return nextErrors;
    });
  };

  const clearActionError = (actionId: string) => {
    setActionErrors((currentErrors) => {
      const nextErrors = { ...currentErrors };
      delete nextErrors[actionId];
      return nextErrors;
    });

    setIsActionsValidated(false);
  };

  const changeName = (newName: string) => {
    setName(newName);
    setNameError(null);
    setSaveError(null);
  };

  const changeTrigger = (newTrigger: Trigger) => {
    if (newTrigger === trigger) {
      return;
    }

    if (conditions.length > 0) {
      const shouldClearConditions = window.confirm(
        `Cambiar el disparador eliminará las ${conditions.length} condiciones configuradas. ¿Deseas continuar?`
      );

      if (!shouldClearConditions) {
        return;
      }
    }

    setTrigger(newTrigger);
    setConditions([]);
    setConditionErrors({});
    setConditionLogic('AND');
    setSaveError(null);
  };

  const addCondition = () => {
    const newCondition: Condition = {
      id: crypto.randomUUID(),
      field: triggerOptions[trigger].fields[0].value,
      operator: 'equals',
      value: '',
    };

    setConditions((currentConditions) => [
      ...currentConditions,
      newCondition,
    ]);

    setSaveError(null);
  };

  const removeCondition = (conditionId: string) => {
    setConditions((currentConditions) =>
      currentConditions.filter(
        (condition) => condition.id !== conditionId
      )
    );

    clearConditionError(conditionId);
    setSaveError(null);
  };

  const updateCondition = (
    conditionId: string,
    changes: Partial<Condition>
  ) => {
    setConditions((currentConditions) =>
      currentConditions.map((condition) =>
        condition.id === conditionId
          ? { ...condition, ...changes }
          : condition
      )
    );

    clearConditionError(conditionId);
    setSaveError(null);
  };

  const moveCondition = (
    conditionId: string,
    direction: MoveDirection
  ) => {
    setConditions((currentConditions) => {
      const currentIndex = currentConditions.findIndex(
        (condition) => condition.id === conditionId
      );

      if (currentIndex === -1) {
        return currentConditions;
      }

      const targetIndex =
        currentIndex + (direction === 'up' ? -1 : 1);

      if (
        targetIndex < 0 ||
        targetIndex >= currentConditions.length
      ) {
        return currentConditions;
      }

      const reorderedConditions = [...currentConditions];

      const [movedCondition] = reorderedConditions.splice(
        currentIndex,
        1
      );

      if (!movedCondition) {
        return currentConditions;
      }

      reorderedConditions.splice(
        targetIndex,
        0,
        movedCondition
      );

      return reorderedConditions;
    });
  };

  const addAction = () => {
    setActions((currentActions) => [
      ...currentActions,
      createAction('email'),
    ]);

    setActionsError(null);
    setIsActionsValidated(false);
    setSaveError(null);
  };

  const removeAction = (actionId: string) => {
    setActions((currentActions) =>
      currentActions.filter(
        (action) => action.id !== actionId
      )
    );

    clearActionError(actionId);
    setActionsError(null);
    setSaveError(null);
  };

  const changeActionType = (
    actionId: string,
    actionType: ActionType
  ) => {
    setActions((currentActions) =>
      currentActions.map((action) =>
        action.id === actionId && action.type !== actionType
          ? createAction(actionType, action.id)
          : action
      )
    );

    clearActionError(actionId);
    setSaveError(null);
  };

  const updateAction = (updatedAction: RuleAction) => {
    setActions((currentActions) =>
      currentActions.map((action) =>
        action.id === updatedAction.id &&
        action.type === updatedAction.type
          ? updatedAction
          : action
      )
    );

    clearActionError(updatedAction.id);
    setSaveError(null);
  };

  const validateActionDraft = (): boolean => {
    const validationResult = validateActions(actions);

    setActionErrors(validationResult.actionErrors);
    setActionsError(validationResult.actionsError);

    const isValid =
      validationResult.actionsError === null &&
      Object.keys(validationResult.actionErrors).length === 0;

    setIsActionsValidated(isValid);

    return isValid;
  };

  const changeWizardStep = (nextStep: WizardStep) => {
    if (isSaving) {
      return;
    }

    if (nextStep > 1) {
      const validationError = validateRuleName(name);

      if (validationError) {
        setNameError(validationError);
        setCurrentStep(1);
        return;
      }
    }

    if (nextStep === 3) {
      const validationErrors = validateConditions(
        conditions,
        trigger
      );

      setConditionErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        setCurrentStep(2);
        return;
      }
    }

    setCurrentStep(nextStep);
  };

  const goToNextStep = () => {
    const nextStep: WizardStep =
      currentStep === 1 ? 2 : 3;

    changeWizardStep(nextStep);
  };

  const goToPreviousStep = () => {
    const previousStep: WizardStep =
      currentStep === 3 ? 2 : 1;

    changeWizardStep(previousStep);
  };

  const saveRule = async () => {
    if (saveRequestInProgress.current) {
      return;
    }

    setSaveError(null);

    const validationError = validateRuleName(name);

    setNameError(validationError);

    if (validationError) {
      setCurrentStep(1);
      return;
    }

    const validationErrors = validateConditions(
      conditions,
      trigger
    );

    setConditionErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setCurrentStep(2);
      return;
    }

    if (!validateActionDraft()) {
      setCurrentStep(3);
      return;
    }

    const input: RuleInput = {
      name: name.trim(),
      trigger,
      conditionLogic,
      conditions: conditions.map((condition) => ({
        ...condition,
      })),
      actions: actions.map((action) => ({
        ...action,
      })),
    };

    saveRequestInProgress.current = true;
    setIsSaving(true);

    try {
      await onSave(input);
    } catch (error) {
      if (
        error instanceof ApiError &&
        error.status === 409 &&
        error.code === 'DUPLICATE_RULE_NAME'
      ) {
        setNameError(error.message);
        setCurrentStep(1);
      } else {
        setSaveError(getSaveErrorMessage(error));
      }
    } finally {
      saveRequestInProgress.current = false;
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-800 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8">
          <button
            type="button"
            onClick={onBack}
            disabled={isSaving}
            className="mb-4 cursor-pointer text-sm text-blue-600 hover:underline disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← Volver al listado
          </button>

          <h1 className="text-2xl font-semibold sm:text-3xl">
            {rule ? 'Editar regla' : 'Nueva regla'}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Configura tu regla de notificación.
          </p>
        </header>

        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <WizardSteps
            currentStep={currentStep}
            onStepChange={changeWizardStep}
          />

          <div className="min-h-48">
            {currentStep === 1 && (
              <TriggerStep
                name={name}
                nameError={nameError}
                trigger={trigger}
                onNameChange={changeName}
                onTriggerChange={changeTrigger}
              />
            )}

            {currentStep === 2 && (
              <ConditionsStep
                trigger={trigger}
                conditions={conditions}
                conditionLogic={conditionLogic}
                conditionErrors={conditionErrors}
                onLogicChange={setConditionLogic}
                onAddCondition={addCondition}
                onRemoveCondition={removeCondition}
                onMoveCondition={moveCondition}
                onConditionChange={updateCondition}
              />
            )}

            {currentStep === 3 && (
              <ActionsStep
                actions={actions}
                actionErrors={actionErrors}
                actionsError={actionsError}
                isActionsValidated={isActionsValidated}
                onAddAction={addAction}
                onRemoveAction={removeAction}
                onActionTypeChange={changeActionType}
                onActionChange={updateAction}
              />
            )}
          </div>

          {saveError && (
            <p
              role="alert"
              className="mt-5 text-sm text-red-700"
            >
              {saveError}
            </p>
          )}

          <footer className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5">
            <button
              type="button"
              onClick={goToPreviousStep}
              disabled={currentStep === 1 || isSaving}
              className="cursor-pointer rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Anterior
            </button>

            {currentStep === 3 ? (
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={validateActionDraft}
                  disabled={isSaving}
                  className="cursor-pointer rounded-lg border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Validar acciones
                </button>

                <button
                  type="button"
                  onClick={() => void saveRule()}
                  disabled={isSaving}
                  className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSaving ? 'Guardando...' : 'Guardar regla'}
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={goToNextStep}
                disabled={isSaving}
                className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Siguiente
              </button>
            )}
          </footer>
        </section>
      </div>
    </main>
  );
}
