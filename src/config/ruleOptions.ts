import type { Trigger, ConditionOperator } from '../types/rule';

export type FieldType = 'text' | 'number';

type FieldOption = {
  value: string;
  label: string;
  type: FieldType;
};

type TriggerOption = {
  label: string;
  fields: FieldOption[];
};

type OperatorOption = {
  value: ConditionOperator;
  label: string;
};

export const triggerOptions: Record<Trigger, TriggerOption> = {
  customer_created: {
    label: 'Cliente creado',
    fields: [
      { value: 'pais', label: 'País', type: 'text' },
      { value: 'plan', label: 'Plan', type: 'text' },
    ],
  },

  payment_received: {
    label: 'Pago recibido',
    fields: [
      { value: 'monto', label: 'Monto', type: 'number' },
      { value: 'moneda', label: 'Moneda', type: 'text' },
    ],
  },

  ticket_unanswered: {
    label: 'Ticket sin respuesta',
    fields: [
      {
        value: 'horas_sin_respuesta',
        label: 'Horas sin respuesta',
        type: 'number',
      },
      { value: 'prioridad', label: 'Prioridad', type: 'text' },
    ],
  },
};

export const operatorOptions: Record<FieldType, OperatorOption[]> = {
  text: [
    { value: 'equals', label: 'Es igual a' },
    { value: 'contains', label: 'Contiene' },
  ],

  number: [
    { value: 'equals', label: 'Es igual a' },
    { value: 'greater_than', label: 'Mayor que' },
    { value: 'less_than', label: 'Menor que' },
  ],
};
