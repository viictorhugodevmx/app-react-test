import { triggerOptions } from '../config/ruleOptions';

import type { RuleSummary } from '../types/rule';

type RulesTableProps = {
  rules: RuleSummary[];
  onToggleRuleStatus: (ruleId: string) => void;
  onCreateRule?: () => void;
  onEditRule?: (rule: RuleSummary) => void;
  updatingRuleId?: string | null;
};

export function RulesTable({
  rules,
  onToggleRuleStatus,
  onCreateRule,
  onEditRule,
  updatingRuleId = null,
}: RulesTableProps) {
  const hasRules = rules.length > 0;
  const isUpdatingStatus = updatingRuleId !== null;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-800 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Reglas de notificación
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Consulta y administra las reglas del sistema.
          </p>
        </header>

        <section
          aria-labelledby="rules-title"
          className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
        >
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2
                id="rules-title"
                className="text-lg font-semibold"
              >
                Listado de reglas
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Administra las reglas disponibles.
              </p>

              {!onCreateRule && (
                <p className="mt-2 text-xs text-slate-500">
                  La creación y edición se conectarán en el
                  Punto 10.3.
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={onCreateRule}
              disabled={!onCreateRule}
              className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              + Nueva regla
            </button>
          </div>

          {!hasRules ? (
            <div className="rounded-lg border border-dashed border-slate-300 px-4 py-12 text-center">
              <h3 className="text-base font-semibold">
                Todavía no hay reglas
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                No hay reglas registradas en el servidor.
              </p>

              <button
                type="button"
                onClick={onCreateRule}
                disabled={!onCreateRule}
                className="mt-5 cursor-pointer rounded-lg border border-blue-200 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Crear primera regla
              </button>
            </div>
          ) : (
            <table className="w-full text-left text-sm md:table-fixed">
              <caption className="sr-only">
                Listado de reglas de notificación
              </caption>

              <colgroup className="hidden md:table-column-group">
                <col className="w-[30%]" />
                <col className="w-[32%]" />
                <col className="w-[22%]" />
                <col className="w-[16%]" />
              </colgroup>

              <thead className="hidden bg-slate-50 text-slate-600 md:table-header-group">
                <tr>
                  <th
                    scope="col"
                    className="rounded-l-lg px-4 py-3 font-medium"
                  >
                    Nombre
                  </th>

                  <th
                    scope="col"
                    className="px-4 py-3 font-medium"
                  >
                    Disparador
                  </th>

                  <th
                    scope="col"
                    className="px-4 py-3 font-medium"
                  >
                    Estado
                  </th>

                  <th
                    scope="col"
                    className="rounded-r-lg px-4 py-3 font-medium"
                  >
                    Acciones
                  </th>
                </tr>
              </thead>

              <tbody className="block space-y-3 md:table-row-group md:space-y-0">
                {rules.map((rule) => (
                  <tr
                    key={rule.id}
                    className="block rounded-lg border border-slate-200 p-4 md:table-row md:rounded-none md:border-0 md:p-0"
                  >
                    <td className="block font-medium wrap-break-word md:table-cell md:border-b md:border-slate-100 md:px-4 md:py-4">
                      {rule.name}
                    </td>

                    <td className="mt-1 block text-slate-500 md:mt-0 md:table-cell md:border-b md:border-slate-100 md:px-4 md:py-4">
                      {triggerOptions[rule.trigger].label}
                    </td>

                    <td className="mt-3 block md:mt-0 md:table-cell md:border-b md:border-slate-100 md:px-4 md:py-4">
                      <label className="inline-flex cursor-pointer items-center gap-2 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={rule.isActive}
                          disabled={isUpdatingStatus}
                          onChange={() =>
                            onToggleRuleStatus(rule.id)
                          }
                          className="h-4 w-4 shrink-0 cursor-pointer accent-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                        />

                        <span
                          className={`inline-block min-w-16 ${
                            rule.isActive
                              ? 'text-slate-700'
                              : 'text-slate-400'
                          }`}
                        >
                          {rule.isActive ? 'Activa' : 'Inactiva'}
                        </span>

                        <span className="sr-only">
                          : {rule.name}
                        </span>
                      </label>
                    </td>

                    <td className="mt-3 block md:mt-0 md:table-cell md:border-b md:border-slate-100 md:px-4 md:py-4">
                      <button
                        type="button"
                        onClick={() => onEditRule?.(rule)}
                        disabled={!onEditRule}
                        className="cursor-pointer text-sm font-medium text-blue-600 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-40 disabled:no-underline"
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </main>
  );
}
