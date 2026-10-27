import { EmailActionFields } from './EmailActionFields';
import { SmsActionFields } from './SmsActionFields';
import { WebhookActionFields } from './WebhookActionFields';

import type { RuleAction } from '../types/rule';
import type { ActionErrors } from '../utils/ruleValidation';

type ActionType = RuleAction['type'];

type ActionsStepProps = {
  actions: RuleAction[];
  actionErrors: ActionErrors;
  actionsError: string | null;
  isActionsValidated: boolean;
  onAddAction: () => void;
  onRemoveAction: (actionId: string) => void;
  onActionTypeChange: (
    actionId: string,
    actionType: ActionType
  ) => void;
  onActionChange: (updatedAction: RuleAction) => void;
};

const actionTypeOptions: {
  value: ActionType;
  label: string;
}[] = [
  { value: 'email', label: 'Email' },
  { value: 'sms', label: 'SMS' },
  { value: 'webhook', label: 'Webhook' },
];

export function ActionsStep({
  actions,
  actionErrors,
  actionsError,
  isActionsValidated,
  onAddAction,
  onRemoveAction,
  onActionTypeChange,
  onActionChange,
}: ActionsStepProps) {
  const hasFieldErrors = Object.keys(actionErrors).length > 0;

  return (
    <section aria-labelledby="actions-title">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2
            id="actions-title"
            className="text-lg font-semibold"
          >
            Paso 3 — Acciones
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Define qué notificaciones se ejecutarán cuando
            se cumpla la regla.
          </p>
        </div>

        <button
          type="button"
          onClick={onAddAction}
          className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          + Agregar acción
        </button>
      </div>

      {actions.length === 0 ? (
        <div className="mt-6 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center">
          <p className="text-sm font-medium text-slate-700">
            No hay acciones configuradas.
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Agrega al menos una acción para definir
            cómo se enviará la notificación.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {actions.map((action, index) => {
            const actionTypeId = `action-type-${action.id}`;
            const errors = actionErrors[action.id];

            return (
              <div
                key={action.id}
                className="rounded-lg border border-slate-200 bg-slate-50 p-4"
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold">
                    Acción {index + 1}
                  </h3>

                  <button
                    type="button"
                    onClick={() => onRemoveAction(action.id)}
                    className="cursor-pointer rounded-lg px-2 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    Eliminar
                  </button>
                </div>

                <div>
                  <label
                    htmlFor={actionTypeId}
                    className="mb-2 block text-sm font-medium"
                  >
                    Tipo de acción
                  </label>

                  <select
                    id={actionTypeId}
                    name={actionTypeId}
                    value={action.type}
                    onChange={(event) =>
                      onActionTypeChange(
                        action.id,
                        event.target.value as ActionType
                      )
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm focus:border-blue-500 focus:outline-none sm:max-w-sm"
                  >
                    {actionTypeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-4 rounded-lg border border-slate-200 bg-white p-4">
                  {action.type === 'email' && (
                    <EmailActionFields
                      action={action}
                      errors={errors}
                      onChange={onActionChange}
                    />
                  )}

                  {action.type === 'sms' && (
                    <SmsActionFields
                      action={action}
                      errors={errors}
                      onChange={onActionChange}
                    />
                  )}

                  {action.type === 'webhook' && (
                    <WebhookActionFields
                      action={action}
                      errors={errors}
                      onChange={onActionChange}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <p className="mt-4 text-xs text-slate-500">
        Acciones configuradas: {actions.length}
      </p>

      {actionsError && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {actionsError}
        </p>
      )}

      {hasFieldErrors && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          Revisa los campos marcados antes de continuar.
        </p>
      )}

      {isActionsValidated && (
        <p role="status" className="mt-3 text-sm text-green-700">
          Todas las acciones están correctamente configuradas.
        </p>
      )}
    </section>
  );
}
