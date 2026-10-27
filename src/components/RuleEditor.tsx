import { triggerOptions } from '../config/ruleOptions';
import type { RuleSummary } from '../types/rule';

type RuleEditorProps = {
  rule?: RuleSummary;
  onBack: () => void;
};

export function RuleEditor({ rule, onBack }: RuleEditorProps) {
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
            Configura las reglas de notificación del sistema.
          </p>
        </header>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">
            Editor de regla
          </h2>

          {rule ? (
            <div className="space-y-2 text-sm">
              <p>
                <strong>Nombre:</strong> {rule.name}
              </p>

              <p>
                <strong>Disparador:</strong>{' '}
                {triggerOptions[rule.trigger].label}
              </p>
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              Configuración de una nueva regla.
            </p>
          )}

          <p className="mt-6 text-sm text-slate-400">
            El formulario de tres pasos se implementará en el Paso 4.
          </p>
        </section>
      </div>
    </main>
  );
}
