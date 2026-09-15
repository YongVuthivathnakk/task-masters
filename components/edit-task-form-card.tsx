"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { useIsMobile } from "@/app/hook/use-mobile";
import { SetStateAction, useState } from "react";
import { TaskFormFields } from "./task-form-field";
import { toast } from "./ui/toast";
import Image from "next/image";
import { ITaskStatus } from "@/constraints/definitions/status";
import { ITask } from "@/constraints/definitions/board";

type EditTaskFormProps = {
  selectedTask: ITask | null;
  setSelectedTask: (task: SetStateAction<ITask | null>) => void;
  onTaskUpdated: (task: ITask) => void;
  removeTask: () => void;
};

export default function EditTaskFormCard({
  selectedTask,
  removeTask,
  setSelectedTask,
  onTaskUpdated,
}: EditTaskFormProps) {
  const isMobile = useIsMobile();
  const [name, setName] = useState(selectedTask?.name || "");
  const [description, setDescription] = useState(
    selectedTask?.description || "",
  );

  const [openDelete, setOpenDelete] = useState(false);
  const [icon, setIcon] = useState(selectedTask?.icon || "");
  const [status, setStatus] = useState<ITaskStatus>(
    selectedTask?.status || "to_do",
  );

  const [loading, setLoading] = useState(false);

  function reset() {
    setName("");
    setDescription("");
    setIcon("");
    setStatus("to_do");
  }
  function isFormInvalid() {
    return !name || !icon;
  }

  const onDelete = async () => {
    if (!selectedTask) return;
    try {
      const response = await fetch(`/api/tasks/${selectedTask.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      setSelectedTask(null);
      toast.add({
        type: "success",
        description: "Task has been removed",
      });
      removeTask();
    } catch (error) {
      console.error(error);
      toast.add({
        type: "error",
        description: "Failed to edit task",
      });
    }
  };

  const onSubmit = async () => {
    if (!selectedTask) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/tasks/${selectedTask.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, icon, status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const updatedTask: ITask = await response.json();
      onTaskUpdated(updatedTask);
      setSelectedTask(null);
      toast.add({
        type: "success",
        description: "Task has been edited",
      });
      reset();
    } catch (error) {
      console.error(error);
      toast.add({
        type: "error",
        description: "Failed to edit task",
      });
    } finally {
      setLoading(false);
    }
  };
  return isMobile ? (
    <>
      <AlertDelete
        handleDelete={() => onDelete()}
        open={openDelete}
        setOpen={setOpenDelete}
      />

      <Dialog
        open={!!selectedTask}
        onOpenChange={(open) => !open && setSelectedTask(null)}
      >
        <DialogContent className="rounded-xl px-2 max-h-[85vh] overflow-y-auto">
          <DialogHeader className="px-3">
            <DialogTitle className={"text-xl"}>Task details</DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto py-1 px-3">
            <TaskFormFields
              formId={"edit-form"}
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
              onClick={() => setOpenDelete(true)}
              className={
                "rounded-full hover:bg-wontdo-accent active:bg-wontdo-accent px-6 flex items-center bg-text-muted justify-between"
              }
              type="button"
            >
              <span>Delete</span>
              <Image width={18} height={18} alt="done" src={"/Trash.svg"} />
            </Button>

            <Button
              disabled={isFormInvalid()}
              className={"rounded-full px-6 flex items-center justify-between"}
              type="submit"
              form="edit-form"
            >
              <span>{loading ? "Saving..." : "Save"}</span>
              <Image
                width={18}
                height={18}
                alt="done"
                src={"/Done_round.svg"}
              />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  ) : (
    <>
      <AlertDelete
        handleDelete={onDelete}
        open={openDelete}
        setOpen={setOpenDelete}
      />

      <Sheet
        open={!!selectedTask}
        onOpenChange={(open) => !open && setSelectedTask(null)}
      >
        <SheetContent
          className={
            "m-4 px-3 rounded-2xl data-[side=right]:w-[50vw] data-[side=right]:sm:max-w-[50vw] data-[side=right]:h-[calc(100%-2rem)]"
          }
        >
          <SheetHeader className="px-3">
            <SheetTitle className={"text-xl"}>Task details</SheetTitle>
          </SheetHeader>
          <div className="overflow-y-auto py-1 px-3">
            <TaskFormFields
              formId={"edit-form"}
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
              onClick={() => setOpenDelete(true)}
              className={
                "rounded-full px-6 flex items-center active:bg-wontdo-accent hover:bg-wontdo-accent bg-text-muted justify-between"
              }
              type="button"
            >
              <span>Delete</span>
              <Image width={18} height={18} alt="done" src={"/Trash.svg"} />
            </Button>

            <Button
              disabled={isFormInvalid()}
              className={"rounded-full px-6 flex items-center"}
              type="submit"
              form="edit-form"
            >
              {loading ? (
                <span>Saving...</span>
              ) : (
                <div className="flex items-center gap-2 justify-between">
                  <span>Save</span>
                  <Image
                    width={18}
                    height={18}
                    alt="done"
                    src={"/Done_round.svg"}
                  />
                </div>
              )}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}

function AlertDelete({
  open,
  setOpen,
  handleDelete,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleDelete: () => void;
}) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className={"z-100"}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              handleDelete();
              setOpen(false);
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
