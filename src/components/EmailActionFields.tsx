import type { EmailAction } from '../types/rule';
import type { ActionFieldErrors } from '../utils/ruleValidation';

type EmailActionFieldsProps = {
  action: EmailAction;
  errors?: ActionFieldErrors;
  onChange: (updatedAction: EmailAction) => void;
};

export function EmailActionFields({
  action,
  errors,
  onChange,
}: EmailActionFieldsProps) {
  const recipientId = `email-recipient-${action.id}`;
  const subjectId = `email-subject-${action.id}`;
  const bodyId = `email-body-${action.id}`;

  const inputClassName = (hasError: boolean) =>
    `w-full rounded-lg border bg-white px-3 py-3 text-sm focus:outline-none focus:ring-2 ${
      hasError
        ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
        : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
    }`;

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
          aria-invalid={Boolean(errors?.recipient)}
          aria-describedby={
            errors?.recipient ? `${recipientId}-error` : undefined
          }
          onChange={(event) =>
            onChange({
              ...action,
              recipient: event.target.value,
            })
          }
          placeholder="destinatario@ejemplo.com"
          className={inputClassName(Boolean(errors?.recipient))}
        />

        {errors?.recipient && (
          <p
            id={`${recipientId}-error`}
            role="alert"
            className="mt-2 text-sm text-red-600"
          >
            {errors.recipient}
          </p>
        )}
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
          aria-invalid={Boolean(errors?.subject)}
          aria-describedby={
            errors?.subject ? `${subjectId}-error` : undefined
          }
          onChange={(event) =>
            onChange({
              ...action,
              subject: event.target.value,
            })
          }
          placeholder="Ej. Confirmación de pago"
          className={inputClassName(Boolean(errors?.subject))}
        />

        {errors?.subject && (
          <p
            id={`${subjectId}-error`}
            role="alert"
            className="mt-2 text-sm text-red-600"
          >
            {errors.subject}
          </p>
        )}
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
          aria-invalid={Boolean(errors?.body)}
          aria-describedby={
            errors?.body ? `${bodyId}-error` : undefined
          }
          onChange={(event) =>
            onChange({
              ...action,
              body: event.target.value,
            })
          }
          placeholder="Escribe el contenido del correo..."
          className={`${inputClassName(Boolean(errors?.body))} resize-y`}
        />

        {errors?.body && (
          <p
            id={`${bodyId}-error`}
            role="alert"
            className="mt-2 text-sm text-red-600"
          >
            {errors.body}
          </p>
        )}
      </div>
    </div>
  );
}
