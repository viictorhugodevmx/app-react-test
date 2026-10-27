import { operatorOptions, triggerOptions } from '../config/ruleOptions';

import type {
  Condition,
  RuleAction,
  Trigger,
} from '../types/rule';

export type ConditionErrors = Record<string, string>;

type ActionField =
  | 'recipient'
  | 'subject'
  | 'body'
  | 'phoneNumber'
  | 'message'
  | 'url'
  | 'method';

export type ActionFieldErrors = Partial<
  Record<ActionField, string>
>;

export type ActionErrors = Record<string, ActionFieldErrors>;

export type ActionsValidationResult = {
  actionErrors: ActionErrors;
  actionsError: string | null;
};

export function validateRuleName(name: string): string | null {
  if (name.trim().length === 0) {
    return 'El nombre de la regla es obligatorio.';
  }

  return null;
}

export function validateConditions(
  conditions: Condition[],
  trigger: Trigger
): ConditionErrors {
  const errors: ConditionErrors = {};

  const availableFields = triggerOptions[trigger].fields;

  for (const condition of conditions) {
    const selectedField = availableFields.find(
      (field) => field.value === condition.field
    );

    if (!selectedField) {
      errors[condition.id] = 'Selecciona un campo válido.';
      continue;
    }

    const availableOperators = operatorOptions[selectedField.type];

    const isValidOperator = availableOperators.some(
      (operator) => operator.value === condition.operator
    );

    if (!isValidOperator) {
      errors[condition.id] = 'Selecciona un operador válido.';
      continue;
    }

    if (selectedField.type === 'number') {
      if (
        typeof condition.value !== 'number' ||
        !Number.isFinite(condition.value)
      ) {
        errors[condition.id] = 'Ingresa un número válido.';
      }

      continue;
    }

    if (
      typeof condition.value !== 'string' ||
      condition.value.trim().length === 0
    ) {
      errors[condition.id] = 'El valor de la condición es obligatorio.';
    }
  }

  return errors;
}

export function validateActions(
  actions: RuleAction[]
): ActionsValidationResult {
  const actionErrors: ActionErrors = {};

  if (actions.length === 0) {
    return {
      actionErrors,
      actionsError: 'Agrega al menos una acción de notificación.',
    };
  }

  for (const action of actions) {
    const errors: ActionFieldErrors = {};

    switch (action.type) {
      case 'email': {
        const recipient = action.recipient.trim();

        if (recipient.length === 0) {
          errors.recipient = 'El correo del destinatario es obligatorio.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient)) {
          errors.recipient = 'Ingresa un correo electrónico válido.';
        }

        if (action.subject.trim().length === 0) {
          errors.subject = 'El asunto es obligatorio.';
        }

        if (action.body.trim().length === 0) {
          errors.body = 'El cuerpo del mensaje es obligatorio.';
        }

        break;
      }

      case 'sms': {
        const phoneNumber = action.phoneNumber.trim();
        const phoneDigits = phoneNumber.replace(/\D/g, '');

        if (phoneNumber.length === 0) {
          errors.phoneNumber = 'El número telefónico es obligatorio.';
        } else if (
          !/^\+?[0-9()\s-]+$/.test(phoneNumber) ||
          phoneDigits.length < 8 ||
          phoneDigits.length > 15
        ) {
          errors.phoneNumber =
            'Ingresa un teléfono válido de 8 a 15 dígitos.';
        }

        if (action.message.trim().length === 0) {
          errors.message = 'El mensaje SMS es obligatorio.';
        } else if (action.message.length > 160) {
          errors.message =
            'El mensaje no puede superar 160 caracteres.';
        }

        break;
      }

      case 'webhook': {
        const url = action.url.trim();

        if (url.length === 0) {
          errors.url = 'La URL del Webhook es obligatoria.';
        } else {
          try {
            const parsedUrl = new URL(url);

            if (
              !['http:', 'https:'].includes(parsedUrl.protocol) ||
              !parsedUrl.hostname
            ) {
              errors.url = 'Utiliza una URL HTTP o HTTPS válida.';
            }
          } catch {
            errors.url = 'Ingresa una URL válida.';
          }
        }

        if (action.method !== 'POST' && action.method !== 'PUT') {
          errors.method = 'Selecciona un método HTTP válido.';
        }

        break;
      }
    }

    if (Object.keys(errors).length > 0) {
      actionErrors[action.id] = errors;
    }
  }

  return {
    actionErrors,
    actionsError: null,
  };
}
