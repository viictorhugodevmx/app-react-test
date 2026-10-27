import { useState } from 'react';
import { triggerOptions } from '../config/ruleOptions';
import type { RuleSummary } from '../types/rule';

const initialRules: RuleSummary[] = [
  {
    id: '1',
    name: 'Bienvenida',
    trigger: 'customer_created',
    isActive: true,
  },
  {
    id: '2',
    name: 'Confirmar pago',
    trigger: 'payment_received',
    isActive: true,
  },
  {
    id: '3',
    name: 'Ticket pendiente',
    trigger: 'ticket_unanswered',
    isActive: false,
  },
];

export function RulesTable() {
  const [rules, setRules] = useState<RuleSummary[]>(initialRules);

  const toggleRuleStatus = (ruleId: string) => {
    setRules((currentRules) =>
      currentRules.map((rule) =>
        rule.id === ruleId
          ? { ...rule, isActive: !rule.isActive }
          : rule
      )
    );
  };

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
          <div className="mb-6">
            <h2
              id="rules-title"
              className="text-lg font-semibold"
            >
              Listado de reglas
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Activa o desactiva las reglas disponibles.
            </p>
          </div>

          <table className="w-full text-left text-sm">
            <thead className="hidden bg-slate-50 text-slate-600 md:table-header-group">
              <tr>
                <th scope="col" className="rounded-l-lg px-4 py-3 font-medium">
                  Nombre
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Disparador
                </th>
                <th scope="col" className="rounded-r-lg px-4 py-3 font-medium">
                  Estado
                </th>
              </tr>
            </thead>

            <tbody className="block space-y-3 md:table-row-group md:space-y-0">
              {rules.map((rule) => (
                <tr
                  key={rule.id}
                  className="block rounded-lg border border-slate-200 p-4 md:table-row md:rounded-none md:border-0 md:p-0"
                >
                  <td className="block font-medium md:table-cell md:border-b md:border-slate-100 md:px-4 md:py-4">
                    {rule.name}
                  </td>

                  <td className="mt-1 block text-slate-500 md:mt-0 md:table-cell md:border-b md:border-slate-100 md:px-4 md:py-4">
                    {triggerOptions[rule.trigger].label}
                  </td>

                  <td className="mt-3 block md:mt-0 md:table-cell md:border-b md:border-slate-100 md:px-4 md:py-4">
                    <label className="inline-flex cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        checked={rule.isActive}
                        onChange={() => toggleRuleStatus(rule.id)}
                        className="h-4 w-4 cursor-pointer accent-blue-600 focus-visible:ring-2 focus-visible:ring-blue-500"
                      />
                      <span className={rule.isActive ? 'text-slate-700' : 'text-slate-400'}>
                        {rule.isActive ? 'Activa' : 'Inactiva'}
                      </span>
                      <span className="sr-only">
                        : {rule.name}
                      </span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}
