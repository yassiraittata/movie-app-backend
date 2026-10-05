export type ApiEnvelope<T> = {
  success: boolean;
  data: T | null;
  meta?: Record<string, unknown>;
  errors?: Array<{ message: string; code?: string }>;
};

export class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
  ) {
    super(message);
  }
}

export function ok<T>(
  data: T,
  meta: Record<string, unknown> = {},
): ApiEnvelope<T> {
  return {
    success: true,
    data,
    meta,
  };
}

export function fail(message: string, code?: string): ApiEnvelope<null> {
  return {
    success: false,
    data: null,
    errors: [{ message, code }],
  };
}
