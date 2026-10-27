import type { RuleSummary } from '../types/rule';

export const mockRules: RuleSummary[] = [
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
