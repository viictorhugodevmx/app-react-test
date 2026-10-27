import { triggerOptions } from '../config/ruleOptions';
import type { Trigger } from '../types/rule';

type TriggerStepProps = {
  name: string;
  trigger: Trigger;
  onNameChange: (name: string) => void;
  onTriggerChange: (trigger: Trigger) => void;
};

export function TriggerStep({
  name,
  trigger,
  onNameChange,
  onTriggerChange,
}: TriggerStepProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold">
        Paso 1 — Disparador
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Define el nombre de la regla y cuándo debe ejecutarse.
      </p>

      <div className="mt-6 space-y-5">
        <div>
          <label
            htmlFor="rule-name"
            className="mb-2 block text-sm font-medium"
          >
            Nombre de la regla
          </label>

          <input
            id="rule-name"
            type="text"
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
            placeholder="Ej. Notificar pagos importantes"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label
            htmlFor="rule-trigger"
            className="mb-2 block text-sm font-medium"
          >
            Disparador
          </label>

          <select
            id="rule-trigger"
            value={trigger}
            onChange={(event) =>
              onTriggerChange(event.target.value as Trigger)
            }
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            {Object.entries(triggerOptions).map(([value, option]) => (
              <option key={value} value={value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
