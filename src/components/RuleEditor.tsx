import { useState } from 'react';

import { WizardSteps } from './WizardSteps';
import { TriggerStep } from './TriggerStep';
import { ConditionsStep } from './ConditionsStep';
import { triggerOptions } from '../config/ruleOptions';

import type { WizardStep } from './WizardSteps';

import type {
  RuleSummary,
  Trigger,
  Condition,
  ConditionLogic,
} from '../types/rule';

type RuleEditorProps = {
  rule?: RuleSummary;
  onBack: () => void;
};

type MoveDirection = 'up' | 'down';

export function RuleEditor({ rule, onBack }: RuleEditorProps) {
  const [currentStep, setCurrentStep] = useState<WizardStep>(1);

  const [name, setName] = useState(rule?.name ?? '');

  const [trigger, setTrigger] = useState<Trigger>(
    rule?.trigger ?? 'customer_created'
  );

  const [conditions, setConditions] = useState<Condition[]>([]);

  const [conditionLogic, setConditionLogic] =
    useState<ConditionLogic>('AND');

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
    setConditionLogic('AND');
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
  };

  const removeCondition = (conditionId: string) => {
    setConditions((currentConditions) =>
      currentConditions.filter(
        (condition) => condition.id !== conditionId
      )
    );
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

  const goToNextStep = () => {
    setCurrentStep((step) => (step === 1 ? 2 : 3));
  };

  const goToPreviousStep = () => {
    setCurrentStep((step) => (step === 3 ? 2 : 1));
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-800 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8">
          <button
            type="button"
            onClick={onBack}
            className="mb-4 cursor-pointer text-sm text-blue-600 hover:underline"
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
            onStepChange={setCurrentStep}
          />

          <div className="min-h-48">
            {currentStep === 1 && (
              <TriggerStep
                name={name}
                trigger={trigger}
                onNameChange={setName}
                onTriggerChange={changeTrigger}
              />
            )}

            {currentStep === 2 && (
              <ConditionsStep
                trigger={trigger}
                conditions={conditions}
                conditionLogic={conditionLogic}
                onLogicChange={setConditionLogic}
                onAddCondition={addCondition}
                onRemoveCondition={removeCondition}
                onMoveCondition={moveCondition}
                onConditionChange={updateCondition}
              />
            )}

            {currentStep === 3 && (
              <div>
                <h2 className="text-lg font-semibold">
                  Paso 3 — Acciones
                </h2>

                <p className="mt-3 text-sm text-slate-500">
                  Aquí configuraremos las acciones de notificación.
                </p>
              </div>
            )}
          </div>

          <footer className="mt-8 flex items-center justify-between border-t border-slate-200 pt-5">
            <button
              type="button"
              onClick={goToPreviousStep}
              disabled={currentStep === 1}
              className="cursor-pointer rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Anterior
            </button>

            <button
              type="button"
              onClick={goToNextStep}
              disabled={currentStep === 3}
              className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Siguiente
            </button>
          </footer>
        </section>
      </div>
    </main>
  );
}
