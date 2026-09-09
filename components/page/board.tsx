"use client";
import Image from "next/image";
import { ITaskStatus } from "@/constraints/definitions/status";
import { getTaskStyleConfig } from "@/app/utils/task-styles";
import EditTaskFormCard from "../edit-task-form-card";
import { useState } from "react";
import AddTaskFormCard from "../add-task-form-card";
import { IBoard, ITask } from "@/constraints/definitions/board";
import { Button } from "../ui/button";
import { EditBoardFormCard } from "../edit-board-form-card";

type BoardProps = {
  board: IBoard;
};

export default function Board({ board }: BoardProps) {
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [openAddTask, setOpenAddTask] = useState(false);
  const [openEditBoard, setOpenEditBoard] = useState(false);

  const [name, setName] = useState(board.name);
  const [description, setDescription] = useState(board.description);

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
            <div className="flex gap-2 items-center">
              <h1 className=" text-title"> {name}</h1>

              <Button
                type="button"
                onClick={() => setOpenEditBoard(true)}
                className={""}
                variant={"ghost"}
              >
                <Image
                  width={24}
                  height={24}
                  src={"/Edit_duotone.svg"}
                  alt={"logo-image"}
                />
              </Button>
            </div>

            <h3 className="text-description">{description}</h3>
          </div>
        </div>
      </div>
      {/* Card Seciton */}
      <section className="flex flex-col gap-5">
        {board.tasks.map((task, index) => (
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
      <EditBoardFormCard
        name={name}
        description={description}
        open={openEditBoard}
        setOpen={setOpenEditBoard}
        setName={setName}
        setDescription={setDescription}
        id={board.id}
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
