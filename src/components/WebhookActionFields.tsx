import type { WebhookAction } from '../types/rule';

type WebhookActionFieldsProps = {
  action: WebhookAction;
  onChange: (updatedAction: WebhookAction) => void;
};

export function WebhookActionFields({
  action,
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
          onChange={(event) =>
            onChange({
              ...action,
              url: event.target.value,
            })
          }
          placeholder="https://api.ejemplo.com/webhook"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />

        <p className="mt-2 text-xs text-slate-500">
          Utiliza una dirección HTTP o HTTPS.
        </p>
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
          onChange={(event) =>
            onChange({
              ...action,
              method: event.target.value as WebhookAction['method'],
            })
          }
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 sm:max-w-sm"
        >
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
        </select>

        <p className="mt-2 text-xs text-slate-500">
          Selecciona cómo se enviará la solicitud
          al endpoint configurado.
        </p>
      </div>
    </div>
  );
}
