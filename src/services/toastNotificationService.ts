import { useNotification } from "@kyvg/vue3-notification";

type NotificationType = "success" | "error" | "warning" | "info"

// Export the notify function directly for consistent use across components
export const notify = (options: { 
  title?: string; 
  text: string; 
  type?: NotificationType;
  duration?: number;
}) => {
  const { notify } = useNotification();
  return notify({
    ...options,
    duration: options.duration || 2000,
  });
};

export const toastUtilities = {
  toast(text: string, type: NotificationType) {
    return notify({
      text,
      type,
      duration: 2000,
    });
  },

  success(text: string) {
    this.toast(text, "success");
  },

  error(text: string) {
    this.toast(text, "error");
  },

  warning(text: string) {
    this.toast(text, "warning");
  },

  info(text: string) {
    this.toast(text, "info");
  }
}
