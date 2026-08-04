import { defineStore } from "pinia";

export const useNotificationStore = defineStore("notification", {
  state: () => ({
    visible: false,
    title: "",
    message: "",
    type: "success" as "success" | "error" | "warning" | "info",
  }),

  actions: {
    show(
      title: string,
      message: string,
      type: "success" | "error" | "warning" | "info" = "success"
    ) {
      this.visible = true;
      this.title = title;
      this.message = message;
      this.type = type;
    },

    hide() {
      this.visible = false;
    },
  },
});