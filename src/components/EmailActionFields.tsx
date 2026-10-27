import type { EmailAction } from '../types/rule';

type EmailActionFieldsProps = {
  action: EmailAction;
  onChange: (updatedAction: EmailAction) => void;
};

export function EmailActionFields({
  action,
  onChange,
}: EmailActionFieldsProps) {
  const recipientId = `email-recipient-${action.id}`;
  const subjectId = `email-subject-${action.id}`;
  const bodyId = `email-body-${action.id}`;

  return (
    <div className="space-y-5">
      <div>
        <label
          htmlFor={recipientId}
          className="mb-2 block text-sm font-medium"
        >
          Correo del destinatario
        </label>

        <input
          id={recipientId}
          name={recipientId}
          type="email"
          autoComplete="email"
          value={action.recipient}
          onChange={(event) =>
            onChange({
              ...action,
              recipient: event.target.value,
            })
          }
          placeholder="destinatario@ejemplo.com"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div>
        <label
          htmlFor={subjectId}
          className="mb-2 block text-sm font-medium"
        >
          Asunto
        </label>

        <input
          id={subjectId}
          name={subjectId}
          type="text"
          value={action.subject}
          onChange={(event) =>
            onChange({
              ...action,
              subject: event.target.value,
            })
          }
          placeholder="Ej. Confirmación de pago"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div>
        <label
          htmlFor={bodyId}
          className="mb-2 block text-sm font-medium"
        >
          Cuerpo del mensaje
        </label>

        <textarea
          id={bodyId}
          name={bodyId}
          rows={5}
          value={action.body}
          onChange={(event) =>
            onChange({
              ...action,
              body: event.target.value,
            })
          }
          placeholder="Escribe el contenido del correo..."
          className="w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
      </div>
    </div>
  );
}
