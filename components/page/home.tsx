"use client";
import Image from "next/image";
import { ITaskStatus } from "@/app/type/status";
import { getTaskStyleConfig } from "@/app/utils/taskStyles";
import { ITask } from "@/app/type/task";
import EditTaskFormCard from "../edit-task-form-card";
import { useState } from "react";
import AddTaskFormCard from "../add-task-form-card";

export const tasks: ITask[] = [
  {
    id: "1",
    name: "Task in Progress",
    description: "",
    icon: "⏰",
    status: "in_progress",
  },
  {
    id: "2",
    name: "Task Completed",
    description: "",
    icon: "🏆",
    status: "completed",
  },
  {
    id: "3",
    name: "Task Won't Do",
    description: "",
    icon: "☕",
    status: "wont_do",
  },
  {
    id: "4",
    name: "Task To Do",
    description: "Work on a Challenge on devChallenges.io, learn TypeScript.",
    icon: "📚",
    status: "to_do",
  },
];

export default function HomePage() {
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [openAddTask, setOpenAddTask] = useState(false);

  return (
    <div className="container-x container-y flex flex-col">
      {/* HEADER */}
      <div className="flex flex-col gap-6 pb-8">
        <div className="flex gap-4">
          <Image
            className="self-start"
            width={42}
            height={42}
            src={"/Logo.svg"}
            alt={"logo-image"}
          />
          <div className="flex flex-col gap-2">
            <h1 className=" text-title"> My Task Board</h1>
            <h3 className="text-description">Tasks to keep organised</h3>
          </div>

          <Image
            className="self-start py-3"
            width={24}
            height={24}
            src={"/Edit_duotone.svg"}
            alt={"logo-image"}
          />
        </div>
      </div>
      {/* Card Seciton */}
      <section className="flex flex-col gap-5">
        {tasks.map((task, index) => (
          <TaskCard
            handleClick={() => setSelectedTask(task)}
            key={index}
            title={task.name}
            description={task.description}
            icon={task.icon}
            status={task.status}
          />
        ))}
        <button
          onClick={() => setOpenAddTask(true)}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 bg-highlight-bg flex items-center justify-between p-4 rounded-2xl gap-4 cursor-pointer transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className="flex items-center gap-3">
            <div className="self-start bg-highlight-accent w-10 h-10 shrink-0 text-xl rounded-xl flex items-center justify-center p-2">
              <Image
                width={20}
                height={20}
                src={"/Add_round_duotone.svg"}
                alt="add-button"
              />
            </div>
            <div className="flex flex-col justify-center gap-1">
              <p className="text-task-title">Add new task</p>
            </div>
          </div>
        </button>
      </section>
      <AddTaskFormCard open={openAddTask} setOpen={setOpenAddTask} />
      <EditTaskFormCard
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
      />
    </div>
  );
}

type TaskCardProps = {
  title: string;
  description?: string;
  icon: string;
  status: ITaskStatus;
  handleClick: () => void;
};

function TaskCard({
  title,
  description,
  icon,
  handleClick,
  status,
}: TaskCardProps) {
  const { bg, accent, badgeIcon } = getTaskStyleConfig(status);

  return (
    <button
      className="rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      type="button"
      onClick={handleClick}
    >
      <div
        className={`${bg} flex items-center justify-between p-4 rounded-2xl gap-4 cursor-pointer transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]`}
      >
        <div className="flex items-center gap-3">
          <div className="self-start bg-white w-10 h-10 shrink-0 text-xl rounded-xl flex items-center justify-center p-2">
            {icon}
          </div>
          <div className="flex flex-col justify-center gap-1">
            <p className="text-task-title text-start">{title}</p>
            {description && (
              <p className="text-description text-start font-extralight max-w-75">
                {description}
              </p>
            )}
          </div>
        </div>

        {badgeIcon != null && (
          <div
            className={`${accent} w-10 h-10 shrink-0 rounded-xl flex items-center justify-center p-2`}
          >
            <Image width={20} height={20} src={badgeIcon} alt="" />
          </div>
        )}
      </div>
    </button>
  );
}
