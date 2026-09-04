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
import { ITask } from "@/app/type/task";
import { useIsMobile } from "@/app/hook/use-mobile";
import { useState } from "react";
import { ITaskStatus } from "@/app/type/status";
import { AddTaskFormFields } from "./task-form-field";
import { toast } from "./ui/toast";
import Image from "next/image";

type EditTaskFormProps = {
  selectedTask: ITask | null;
  setSelectedTask: (task: ITask | null) => void;
};

export default function EditTaskFormCard({
  selectedTask,
  setSelectedTask,
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
      id: Date.now(),
      name: name,
      description: description,
      icon: icon,
      status: status,
    };

    console.log(task);
    setSelectedTask(null);
    toast.add({
      type: "success",
      description: "Task have been edited",
    });

    reset();
  }
  return isMobile ? (
    <>
      <AlertDelete open={openDelete} setOpen={setOpenDelete} />

      <Dialog
        open={!!selectedTask}
        onOpenChange={(open) => !open && setSelectedTask(null)}
      >
        <DialogContent className="rounded-xl px-2 max-h-[85vh] overflow-y-auto">
          <DialogHeader className="px-3">
            <DialogTitle className={"text-xl"}>Task details</DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto py-1 px-3">
            <AddTaskFormFields
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
          <DialogFooter className="flex-row justify-end gap-2 px-6 pb-2">
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
              <span>Save</span>
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
      <AlertDelete open={openDelete} setOpen={setOpenDelete} />

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
            <AddTaskFormFields
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
          <SheetFooter className="flex-row justify-end gap-2 px-6">
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
              className={"rounded-full px-6 flex items-center justify-between"}
              type="submit"
              form="edit-form"
            >
              <span>Save</span>
              <Image
                width={18}
                height={18}
                alt="done"
                src={"/Done_round.svg"}
              />
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
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
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
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
