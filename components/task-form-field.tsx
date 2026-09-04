import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "./ui/field";
import { cn } from "cn";
import Image from "next/image";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { ITaskStatus } from "@/app/type/status";

const ICONS = ["👨‍💻", "💬", "☕", "🏆", "📚", "⏰"];

const STATUS_OPTIONS: {
  value: ITaskStatus;
  label: string;
  icon: string;
  accent: string;
}[] = [
  {
    value: "in_progress",
    label: "In Progress",
    icon: "/Time_atack_duotone.svg",
    accent: "bg-progress-accent",
  },
  {
    value: "completed",
    label: "Completed",
    icon: "/Done_round_duotone.svg",
    accent: "bg-completed-accent",
  },
  {
    value: "wont_do",
    label: "Won't do",
    icon: "/close_ring_duotone.svg",
    accent: "bg-wontdo-accent",
  },
];

type TaskFormFieldsProps = {
  formId: string;
  onSubmit: () => void;
  name: string;
  setName: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  icon: string;
  setIcon: (v: string) => void;
  status: ITaskStatus;
  setStatus: (v: ITaskStatus) => void;
};

export function AddTaskFormFields({
  formId,
  onSubmit,
  name,
  setName,
  description,
  setDescription,
  icon,
  setIcon,
  status,
  setStatus,
}: TaskFormFieldsProps) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <form id={formId} onSubmit={handleSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel
            htmlFor="task-name"
            className="text-input-label text-text-muted"
          >
            Task name
          </FieldLabel>
          <Input
            id="task-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter task name"
            required
            className="text-description focus-visible:ring-primary focus-visible:border-primary"
          />
        </Field>

        <Field>
          <FieldLabel
            htmlFor="task-description"
            className="text-input-label text-text-muted"
          >
            Description
          </FieldLabel>
          <Textarea
            id="task-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a short description"
            rows={5}
            className="text-description resize-none focus-visible:ring-primary focus-visible:border-primary"
          />
        </Field>

        <FieldSet>
          <FieldLegend className="text-input-label text-text-muted">
            <p className="text-sm">Icon</p>
          </FieldLegend>
          <div
            className="flex gap-2 flex-wrap"
            role="radiogroup"
            aria-label="Task icon"
          >
            {ICONS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                role="radio"
                aria-checked={icon === emoji}
                onClick={() => setIcon(emoji)}
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-colors",
                  icon === emoji ? "bg-progress-bg" : "bg-border",
                )}
              >
                {emoji}
              </button>
            ))}
          </div>
        </FieldSet>

        <FieldSet>
          <FieldLegend className="text-input-label text-text-muted">
            <p className="text-sm">Status</p>
          </FieldLegend>
          <div
            className="flex flex-wrap gap-2"
            role="radiogroup"
            aria-label="Task status"
          >
            {STATUS_OPTIONS.map((opt) => {
              const selected = status === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setStatus(opt.value)}
                  className={cn(
                    "flex items-center justify-between gap-3 border-2 rounded-xl pl-0.5 pr-2 py-0.5 transition-colors basis-[calc(50%-0.375rem)] ",
                    selected ? "border-primary" : "border-border",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        opt.accent,
                      )}
                    >
                      <Image
                        width={18}
                        height={18}
                        src={opt.icon}
                        alt={"button-icon"}
                        className="text-white"
                      />
                    </span>
                    <span className="text-task-description">{opt.label}</span>
                  </div>
                  {selected && (
                    <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <Image
                        height={16}
                        width={16}
                        src={"/Done_round.svg"}
                        className="text-white"
                        alt={"check-icon"}
                      />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </FieldSet>
      </FieldGroup>
    </form>
  );
}
