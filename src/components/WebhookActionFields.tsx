import type { WebhookAction } from '../types/rule';
import type { ActionFieldErrors } from '../utils/ruleValidation';

type WebhookActionFieldsProps = {
  action: WebhookAction;
  errors?: ActionFieldErrors;
  onChange: (updatedAction: WebhookAction) => void;
};

export function WebhookActionFields({
  action,
  errors,
  onChange,
}: WebhookActionFieldsProps) {
  const urlId = `webhook-url-${action.id}`;
  const methodId = `webhook-method-${action.id}`;

  return (
    <div className="space-y-5">
      <div>
        <label
          htmlFor={urlId}
          className="mb-2 block text-sm font-medium"
        >
          URL del Webhook
        </label>

        <input
          id={urlId}
          name={urlId}
          type="url"
          autoComplete="url"
          value={action.url}
          aria-invalid={Boolean(errors?.url)}
          aria-describedby={
            errors?.url ? `${urlId}-error` : undefined
          }
          onChange={(event) =>
            onChange({
              ...action,
              url: event.target.value,
            })
          }
          placeholder="https://api.ejemplo.com/webhook"
          className={`w-full rounded-lg border bg-white px-3 py-3 text-sm focus:outline-none focus:ring-2 ${
            errors?.url
              ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
              : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
          }`}
        />

        {errors?.url ? (
          <p
            id={`${urlId}-error`}
            role="alert"
            className="mt-2 text-sm text-red-600"
          >
            {errors.url}
          </p>
        ) : (
          <p className="mt-2 text-xs text-slate-500">
            Utiliza una dirección HTTP o HTTPS.
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor={methodId}
          className="mb-2 block text-sm font-medium"
        >
          Método HTTP
        </label>

        <select
          id={methodId}
          name={methodId}
          value={action.method}
          aria-invalid={Boolean(errors?.method)}
          aria-describedby={
            errors?.method ? `${methodId}-error` : undefined
          }
          onChange={(event) =>
            onChange({
              ...action,
              method: event.target.value as WebhookAction['method'],
            })
          }
          className={`w-full rounded-lg border bg-white px-3 py-3 text-sm focus:outline-none focus:ring-2 sm:max-w-sm ${
            errors?.method
              ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
              : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
          }`}
        >
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
        </select>

        {errors?.method ? (
          <p
            id={`${methodId}-error`}
            role="alert"
            className="mt-2 text-sm text-red-600"
          >
            {errors.method}
          </p>
        ) : (
          <p className="mt-2 text-xs text-slate-500">
            Selecciona cómo se enviará la solicitud
            al endpoint configurado.
          </p>
        )}
      </div>
    </div>
  );
}
