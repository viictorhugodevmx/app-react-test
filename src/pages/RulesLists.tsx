import { useState } from 'react';

type Rule = {
  id: number;
  name: string;
  trigger: string;
  isActive: boolean;
};

const initialRules: Rule[] = [
  {
    id: 1,
    name: 'Bienvenida',
    trigger: 'Cliente creado',
    isActive: true,
  },
  {
    id: 2,
    name: 'Confirmar pago',
    trigger: 'Pago recibido',
    isActive: true,
  },
  {
    id: 3,
    name: 'Ticket pendiente',
    trigger: 'Ticket sin respuesta',
    isActive: false,
  },
];

export function RulesLists() {
  const [rules, setRules] = useState<Rule[]>(initialRules);

  const toggleRuleStatus = (ruleId: number) => {
    setRules((currentRules) =>
      currentRules.map((rule) =>
        rule.id === ruleId
          ? { ...rule, isActive: !rule.isActive }
          : rule
      )
    );
  };

  return (
    <main className="contenedor">
      <header>
        <h1>Administrador de reglas</h1>
        <p>Consulta y administra las reglas de notificación.</p>
      </header>

      <section aria-labelledby="rules-title">
        <h2 id="rules-title">Listado de reglas</h2>

        <table className="tabla-reglas">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Disparador</th>
              <th scope="col">Estado</th>
            </tr>
          </thead>

          <tbody>
            {rules.map((rule) => (
              <tr key={rule.id}>
                <td>{rule.name}</td>
                <td>{rule.trigger}</td>
                <td>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={rule.isActive}
                      onChange={() => toggleRuleStatus(rule.id)}
                    />
                    {rule.isActive ? 'Activa' : 'Inactiva'}
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
