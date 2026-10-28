import type {
  Rule,
  RuleSummary,
} from '../types/rule';

export type RuleInput = Pick<
  Rule,
  | 'name'
  | 'trigger'
  | 'conditionLogic'
  | 'conditions'
  | 'actions'
>;

type ApiErrorResponse = {
  error?: {
    code?: string;
    message?: string;
    details?: string[];
  };
};

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH';

const apiBaseUrl = (
  import.meta.env.VITE_API_BASE_URL ??
  'http://localhost:3001/api'
).replace(/\/+$/, '');

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details: string[];

  constructor(
    status: number,
    code: string,
    message: string,
    details: string[] = []
  ) {
    super(message);

    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

async function requestApi<T>(
  path: string,
  method: HttpMethod = 'GET',
  body?: unknown
): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    method,
    headers:
      body === undefined
        ? undefined
        : {
            'Content-Type': 'application/json',
          },
    body:
      body === undefined
        ? undefined
        : JSON.stringify(body),
  });

  if (!response.ok) {
    const errorResponse = (
      await response.json().catch(() => null)
    ) as ApiErrorResponse | null;

    throw new ApiError(
      response.status,
      errorResponse?.error?.code ?? 'HTTP_ERROR',
      errorResponse?.error?.message ??
        'No fue posible completar la solicitud.',
      errorResponse?.error?.details ?? []
    );
  }

  return (await response.json()) as T;
}

export function listRules(): Promise<RuleSummary[]> {
  return requestApi<RuleSummary[]>('/rules');
}

export function getRuleById(
  ruleId: string
): Promise<Rule> {
  return requestApi<Rule>(
    `/rules/${encodeURIComponent(ruleId)}`
  );
}

export function createRule(
  input: RuleInput
): Promise<Rule> {
  return requestApi<Rule>('/rules', 'POST', input);
}

export function updateRule(
  ruleId: string,
  input: RuleInput
): Promise<Rule> {
  return requestApi<Rule>(
    `/rules/${encodeURIComponent(ruleId)}`,
    'PUT',
    input
  );
}

export function updateRuleStatus(
  ruleId: string,
  isActive: boolean
): Promise<Rule> {
  return requestApi<Rule>(
    `/rules/${encodeURIComponent(ruleId)}/status`,
    'PATCH',
    { isActive }
  );
}
