import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import Image from "next/image";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";

import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { toast } from "./ui/toast";

type EditBoardFormCardProps = {
  id: string;
  name: string;
  setName: (input: string) => void;
  description: string;
  setDescription: (input: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
};
export function EditBoardFormCard({
  id,
  open,
  setOpen,
  name,
  setName,
  setDescription,
  description,
}: EditBoardFormCardProps) {
  const [loading, setLoading] = useState(false);

  const updateBoard = async ({
    id,
    name,
    description,
  }: {
    id: string;
    name: string;
    description: string;
  }) => {
    const response = await fetch(`/api/boards/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update board");
    }

    return response.json();
  };
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setLoading(true);

      await updateBoard({
        id,
        name,
        description,
      });

      toast.add({
        type: "success",
        description: "Board updated successfully",
      });

      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.add({
        type: "error",
        description: "Failed to update board",
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="rounded-xl px-2 max-h-[85vh] overflow-y-auto">
        <DialogHeader className="px-3">
          <DialogTitle className={"text-xl"}>Edit board</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto py-1 px-3">
          <form id="edit-board-form" onSubmit={handleSubmit}>
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
            </FieldGroup>
          </form>
        </div>
        <DialogFooter className="flex-row justify-end gap-2 px-3 pb-2">
          <Button
            className={
              "rounded-full px-6 flex items-center hover:bg-wontdo-accent active:bg-wontdo-accent bg-text-muted justify-between"
            }
            type="button"
            onClick={() => {
              setOpen(false);
            }}
          >
            <span>Cancel</span>
          </Button>

          <Button
            className={"rounded-full px-6 flex items-center justify-between"}
            type="submit"
            form="edit-board-form"
          >
            <span>{loading ? "Saving..." : "Save"}</span>
            {!loading && (
              <Image width={18} height={18} alt="done" src="/Done_round.svg" />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
