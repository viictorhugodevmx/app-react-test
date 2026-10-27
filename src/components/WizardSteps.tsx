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
              className={`flex min-h-14 w-full cursor-pointer flex-col items-center justify-center gap-0.5 rounded-lg px-1 py-2 text-center text-xs font-medium transition-colors sm:min-h-0 sm:flex-row sm:gap-1 sm:px-2 sm:py-3 sm:text-sm ${
                currentStep === step.number
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>{step.number}.</span>
              <span>{step.label}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
