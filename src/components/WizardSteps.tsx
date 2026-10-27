export type WizardStep = 1 | 2 | 3;

type WizardStepsProps = {
  currentStep: WizardStep;
  onStepChange: (step: WizardStep) => void;
};

const steps: { number: WizardStep; label: string }[] = [
  { number: 1, label: 'Disparador' },
  { number: 2, label: 'Condiciones' },
  { number: 3, label: 'Acciones' },
];

export function WizardSteps({
  currentStep,
  onStepChange,
}: WizardStepsProps) {
  return (
    <nav aria-label="Pasos del editor" className="mb-8">
      <ol className="grid grid-cols-3 gap-2">
        {steps.map((step) => (
          <li key={step.number}>
            <button
              type="button"
              onClick={() => onStepChange(step.number)}
              aria-current={
                currentStep === step.number ? 'step' : undefined
              }
              className={`w-full cursor-pointer rounded-lg px-2 py-3 text-sm font-medium transition-colors ${
                currentStep === step.number
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {step.number}. {step.label}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
