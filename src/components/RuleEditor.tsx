import { useState } from 'react';
import { WizardSteps } from './WizardSteps';
import { TriggerStep } from './TriggerStep';
import type { WizardStep } from './WizardSteps';
import type { RuleSummary, Trigger } from '../types/rule';

type RuleEditorProps = {
  rule?: RuleSummary;
  onBack: () => void;
};

export function RuleEditor({ rule, onBack }: RuleEditorProps) {
  const [currentStep, setCurrentStep] = useState<WizardStep>(1);

  const [name, setName] = useState(rule?.name ?? '');
  const [trigger, setTrigger] = useState<Trigger>(
    rule?.trigger ?? 'customer_created'
  );

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
                onTriggerChange={setTrigger}
              />
            )}

            {currentStep === 2 && (
              <div>
                <h2 className="text-lg font-semibold">
                  Paso 2 — Condiciones
                </h2>

                <p className="mt-3 text-sm text-slate-500">
                  Aquí configuraremos las condiciones de la regla.
                </p>
              </div>
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
