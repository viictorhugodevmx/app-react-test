import { operatorOptions, triggerOptions } from '../config/ruleOptions';

import type {
  Condition,
  ConditionLogic,
  ConditionOperator,
  Trigger,
} from '../types/rule';

type MoveDirection = 'up' | 'down';

type ConditionsStepProps = {
  trigger: Trigger;
  conditions: Condition[];
  conditionLogic: ConditionLogic;
  onLogicChange: (logic: ConditionLogic) => void;
  onAddCondition: () => void;
  onRemoveCondition: (conditionId: string) => void;
  onMoveCondition: (
    conditionId: string,
    direction: MoveDirection
  ) => void;
  onConditionChange: (
    conditionId: string,
    changes: Partial<Condition>
  ) => void;
};

export function ConditionsStep({
  trigger,
  conditions,
  conditionLogic,
  onLogicChange,
  onAddCondition,
  onRemoveCondition,
  onMoveCondition,
  onConditionChange,
}: ConditionsStepProps) {
  const availableFields = triggerOptions[trigger].fields;

  const changeField = (conditionId: string, field: string) => {
    onConditionChange(conditionId, {
      field,
      operator: 'equals',
      value: '',
    });
  };

  return (
    <section aria-labelledby="conditions-title">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2
            id="conditions-title"
            className="text-lg font-semibold"
          >
            Paso 2 — Condiciones
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Define las condiciones que debe cumplir la regla.
          </p>
        </div>

        <button
          type="button"
          onClick={onAddCondition}
          className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          + Agregar condición
        </button>
      </div>

      <div className="mt-6 rounded-lg border border-slate-200 bg-white p-4">
        <label
          htmlFor="condition-logic"
          className="mb-2 block text-sm font-medium"
        >
          Combinar condiciones
        </label>

        <select
          id="condition-logic"
          value={conditionLogic}
          onChange={(event) =>
            onLogicChange(event.target.value as ConditionLogic)
          }
          disabled={conditions.length < 2}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm focus:border-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 sm:max-w-sm"
        >
          <option value="AND">
            Todas deben cumplirse (Y)
          </option>

          <option value="OR">
            Al menos una debe cumplirse (O)
          </option>
        </select>

        <p className="mt-2 text-xs text-slate-500">
          {conditions.length < 2
            ? 'Agrega al menos dos condiciones para elegir cómo combinarlas.'
            : conditionLogic === 'AND'
              ? 'La regla se cumple cuando todas las condiciones son verdaderas.'
              : 'La regla se cumple cuando al menos una condición es verdadera.'}
        </p>
      </div>

      {conditions.length === 0 ? (
        <div className="mt-6 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center">
          <p className="text-sm font-medium text-slate-700">
            No hay condiciones configuradas.
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Puedes agregar una condición o continuar sin condiciones.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {conditions.map((condition, index) => {
            const selectedField =
              availableFields.find(
                (field) => field.value === condition.field
              ) ?? availableFields[0];

            const availableOperators =
              operatorOptions[selectedField.type];

            const fieldId = `condition-field-${condition.id}`;
            const operatorId = `condition-operator-${condition.id}`;
            const valueId = `condition-value-${condition.id}`;

            const isFirstCondition = index === 0;
            const isLastCondition = index === conditions.length - 1;

            return (
              <div
                key={condition.id}
                className="rounded-lg border border-slate-200 bg-slate-50 p-4"
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold">
                    Condición {index + 1}
                  </h3>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        onMoveCondition(condition.id, 'up')
                      }
                      disabled={isFirstCondition}
                      aria-label={`Subir condición ${index + 1}`}
                      className="cursor-pointer rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      ↑ Subir
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        onMoveCondition(condition.id, 'down')
                      }
                      disabled={isLastCondition}
                      aria-label={`Bajar condición ${index + 1}`}
                      className="cursor-pointer rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      ↓ Bajar
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        onRemoveCondition(condition.id)
                      }
                      className="cursor-pointer rounded-lg px-2 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <label
                      htmlFor={fieldId}
                      className="mb-2 block text-sm font-medium"
                    >
                      Campo
                    </label>

                    <select
                      id={fieldId}
                      value={condition.field}
                      onChange={(event) =>
                        changeField(
                          condition.id,
                          event.target.value
                        )
                      }
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm focus:border-blue-500 focus:outline-none"
                    >
                      {availableFields.map((field) => (
                        <option
                          key={field.value}
                          value={field.value}
                        >
                          {field.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor={operatorId}
                      className="mb-2 block text-sm font-medium"
                    >
                      Operador
                    </label>

                    <select
                      id={operatorId}
                      value={condition.operator}
                      onChange={(event) =>
                        onConditionChange(condition.id, {
                          operator: event.target
                            .value as ConditionOperator,
                        })
                      }
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm focus:border-blue-500 focus:outline-none"
                    >
                      {availableOperators.map((operator) => (
                        <option
                          key={operator.value}
                          value={operator.value}
                        >
                          {operator.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor={valueId}
                      className="mb-2 block text-sm font-medium"
                    >
                      Valor
                    </label>

                    <input
                      id={valueId}
                      type={selectedField.type}
                      step={
                        selectedField.type === 'number'
                          ? 'any'
                          : undefined
                      }
                      value={condition.value}
                      onChange={(event) => {
                        const newValue =
                          selectedField.type === 'number' &&
                          event.target.value !== ''
                            ? Number(event.target.value)
                            : event.target.value;

                        onConditionChange(condition.id, {
                          value: newValue,
                        });
                      }}
                      placeholder="Ingresa un valor"
                      className="w-full rounded-lg border border-slate-300 px-3 py-3 text-sm focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <p className="mt-4 text-xs text-slate-500">
        Condiciones configuradas: {conditions.length}
      </p>
    </section>
  );
}
