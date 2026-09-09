import { ITaskStatus } from "@/constraints/definitions/status";

export function getTaskStyleConfig(status: ITaskStatus) {
  switch (status) {
    case "in_progress":
      return {
        bg: "bg-progress-bg",
        accent: "bg-progress-accent",
        badgeIcon: "/Time_atack_duotone.svg",
      };
    case "completed":
      return {
        bg: "bg-completed-bg",
        accent: "bg-completed-accent",
        badgeIcon: "/Done_round_duotone.svg",
      };
    case "wont_do":
      return {
        bg: "bg-wontdo-bg",
        accent: "bg-wontdo-accent",
        badgeIcon: "/close_ring_duotone.svg",
      };
    case "to_do":
    default:
      return {
        bg: "bg-border",
        accent: "bg-text-muted",
        badgeIcon: null,
      };
  }
}
