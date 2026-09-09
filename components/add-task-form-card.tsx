"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  Sheet,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/app/hook/use-mobile";
import { useState } from "react";
import { toast } from "./ui/toast";
import { AddTaskFormFields } from "./task-form-field";
import Image from "next/image";
import { ITaskStatus } from "@/constraints/definitions/status";
import { ITask } from "@/constraints/definitions/board";

type AddTaskFormProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function AddTaskFormCard({ open, setOpen }: AddTaskFormProps) {
  const isMobile = useIsMobile();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [status, setStatus] = useState<ITaskStatus>("to_do");

  function reset() {
    setName("");
    setDescription("");
    setIcon("");
    setStatus("to_do");
  }
  function isFormInvalid() {
    return !name || !icon;
  }

  function onSubmit() {
    const task: ITask = {
      id: Date.now().toLocaleString(),
      name: name,
      description: description,
      icon: icon,
      status: status,
      board_id: "",
      created_at: "",
    };

    console.log(task);
    setOpen(false);
    toast.add({
      type: "success",
      description: "New task have been created",
    });

    reset();
  }

  return isMobile ? (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="rounded-xl px-2 max-h-[85vh] overflow-y-auto">
        <DialogHeader className="px-3">
          <DialogTitle className={"text-xl"}>Add task</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto py-1 px-3">
          <AddTaskFormFields
            formId={"add-form"}
            onSubmit={onSubmit}
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            icon={icon}
            setIcon={setIcon}
            status={status}
            setStatus={setStatus}
          />
        </div>
        <DialogFooter className="flex-row justify-end gap-2 px-3 pb-2">
          <Button
            className={
              "rounded-full px-6 flex items-center hover:bg-wontdo-accent active:bg-wontdo-accent bg-text-muted justify-between"
            }
            type="button"
            onClick={() => {
              setOpen(false);
              reset();
            }}
          >
            <span>Cancel</span>
          </Button>

          <Button
            disabled={isFormInvalid()}
            className={"rounded-full px-6 flex items-center justify-between"}
            type="submit"
            form="add-form"
          >
            <span> Add</span>
            <Image width={18} height={18} alt="done" src={"/Done_round.svg"} />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ) : (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        className={
          "m-4 px-3 rounded-xl data-[side=right]:w-[50vw] data-[side=right]:sm:max-w-[50vw] data-[side=right]:h-[calc(100%-2rem)]"
        }
      >
        <SheetHeader className="px-3">
          <SheetTitle className={"text-xl"}>Add Task</SheetTitle>
        </SheetHeader>
        <div className="overflow-y-auto py-1 px-3">
          <AddTaskFormFields
            formId={"add-form"}
            onSubmit={onSubmit}
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            icon={icon}
            setIcon={setIcon}
            status={status}
            setStatus={setStatus}
          />
        </div>
        <SheetFooter className="flex-row justify-end gap-2 px-3">
          <Button
            className={
              "rounded-full px-6 flex items-center hover:bg-wontdo-accent active:bg-wontdo-accent bg-text-muted justify-between"
            }
            type="button"
            onClick={() => {
              setOpen(false);
              reset();
            }}
          >
            <span>Cancel</span>
          </Button>

          <Button
            disabled={isFormInvalid()}
            className={"rounded-full px-6 flex items-center justify-between"}
            type="submit"
            form="add-form"
          >
            <span> Add</span>
            <Image width={18} height={18} alt="done" src={"/Done_round.svg"} />
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
