import type { SmsAction } from '../types/rule';

type SmsActionFieldsProps = {
  action: SmsAction;
  onChange: (updatedAction: SmsAction) => void;
};

const MAX_SMS_LENGTH = 160;

export function SmsActionFields({
  action,
  onChange,
}: SmsActionFieldsProps) {
  const phoneNumberId = `sms-phone-${action.id}`;
  const messageId = `sms-message-${action.id}`;
  const counterId = `sms-counter-${action.id}`;

  const remainingCharacters =
    MAX_SMS_LENGTH - action.message.length;

  return (
    <div className="space-y-5">
      <div>
        <label
          htmlFor={phoneNumberId}
          className="mb-2 block text-sm font-medium"
        >
          Número telefónico
        </label>

        <input
          id={phoneNumberId}
          name={phoneNumberId}
          type="tel"
          autoComplete="tel"
          value={action.phoneNumber}
          onChange={(event) =>
            onChange({
              ...action,
              phoneNumber: event.target.value,
            })
          }
          placeholder="+52 961 123 4567"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />

        <p className="mt-2 text-xs text-slate-500">
          Incluye el código de país.
        </p>
      </div>

      <div>
        <label
          htmlFor={messageId}
          className="mb-2 block text-sm font-medium"
        >
          Mensaje SMS
        </label>

        <textarea
          id={messageId}
          name={messageId}
          rows={4}
          maxLength={MAX_SMS_LENGTH}
          aria-describedby={counterId}
          value={action.message}
          onChange={(event) =>
            onChange({
              ...action,
              message: event.target.value.slice(
                0,
                MAX_SMS_LENGTH
              ),
            })
          }
          placeholder="Escribe el mensaje de notificación..."
          className="w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />

        <div
          id={counterId}
          className="mt-2 flex flex-wrap justify-between gap-2 text-xs text-slate-500"
        >
          <span>
            Máximo {MAX_SMS_LENGTH} caracteres.
          </span>

          <span
            className={
              remainingCharacters === 0
                ? 'font-semibold text-amber-700'
                : 'text-slate-500'
            }
          >
            {action.message.length}/{MAX_SMS_LENGTH}
          </span>
        </div>
      </div>
    </div>
  );
}
