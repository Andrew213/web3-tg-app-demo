type TelegramWebApp = {
  ready?: () => void;
  expand?: () => void;
  setHeaderColor?: (color: string) => void;
  setBackgroundColor?: (color: string) => void;
};

declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp;
    };
  }
}

export type TelegramLaunchMode = "telegram" | "browser-demo";

export function initTelegramMiniApp(): TelegramLaunchMode {
  if (typeof window === "undefined") {
    return "browser-demo";
  }

  const webApp = window.Telegram?.WebApp;

  if (!webApp) {
    document.documentElement.dataset.telegramMode = "browser-demo";
    return "browser-demo";
  }

  webApp.ready?.();
  webApp.expand?.();
  webApp.setHeaderColor?.("#18181b");
  webApp.setBackgroundColor?.("#09090b");
  document.documentElement.dataset.telegramMode = "telegram";

  return "telegram";
}
