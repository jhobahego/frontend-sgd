import { useNotification } from "@kyvg/vue3-notification";

type NotificationType = "success" | "error" | "warning" | "info"

export const notificationUtilities = {
  toast(text: string, type: NotificationType) {
    const { notify } = useNotification()
    return notify({
      text,
      type,
      duration: 2000,
    })
  },

  success(text: string) {
    this.toast(text, "success")
  },

  error(text: string) {
    this.toast(text, "error")
  }
}