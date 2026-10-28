type NotificationType = 'success' | 'error' | 'loading';

type NotificationToastProps = {
  type: NotificationType;
  message: string;
  onDismiss: () => void;
};

export function NotificationToast({
  type,
  message,
  onDismiss,
}: NotificationToastProps) {
  const isSuccess = type === 'success';
  const isError = type === 'error';
  const isLoading = type === 'loading';

  const borderColor = isSuccess
    ? 'border-l-emerald-500'
    : isError
      ? 'border-l-red-500'
      : 'border-l-blue-500';

  const iconBackground = isSuccess
    ? 'bg-emerald-50 text-emerald-700'
    : isError
      ? 'bg-red-50 text-red-700'
      : 'bg-blue-50 text-blue-700';

  const title = isSuccess
    ? 'Operación exitosa'
    : isError
      ? 'Ocurrió un problema'
      : 'Procesando solicitud';

  return (
    <div
      role={isError ? 'alert' : 'status'}
      aria-live={isError ? 'assertive' : 'polite'}
      aria-atomic="true"
      className="fixed top-5 right-4 left-4 z-50 sm:left-auto sm:w-full sm:max-w-sm"
    >
      <div
        className={`flex items-start gap-3 rounded-xl border border-l-4 border-slate-200 ${borderColor} bg-white p-4 shadow-xl`}
      >
        <span
          aria-hidden="true"
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${iconBackground}`}
        >
          {isLoading ? (
            <svg
              className="h-5 w-5 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeWidth="3"
                opacity="0.2"
              />

              <path
                d="M21 12a9 9 0 0 0-9-9"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <span className="text-lg font-bold">
              {isSuccess ? '✓' : '!'}
            </span>
          )}
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-900">
            {title}
          </p>

          <p className="mt-1 wrap-break-word text-sm leading-5 text-slate-600">
            {message}
          </p>
        </div>

        <button
          type="button"
          onClick={onDismiss}
          aria-label="Cerrar notificación"
          className="cursor-pointer rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-2 focus-visible:outline-blue-600"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="h-4 w-4"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
