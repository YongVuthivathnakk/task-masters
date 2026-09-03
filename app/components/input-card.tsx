import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ITask } from "../type/task";

type DesktopInputCardProps = {
  selectedTask: ITask | null;
  setSelectedTask: (task: ITask | null) => void;
};

export function DesktopInputCard({selectedTask, setSelectedTask} : DesktopInputCardProps) {
  return (
    <Sheet open={!!selectedTask} onOpenChange={(open) => !open && setSelectedTask(null)}>
      <SheetContent
        className={
          "m-4 rounded-2xl   data-[side=right]:w-[50vw] data-[side=right]:sm:max-w-[50vw] data-[side=right]:h-[calc(100%-2rem)]"
        }
      >
        <SheetHeader>
          <SheetTitle className={"text-task-title font-extralight"}>
            Edit Task
          </SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

type MobileInputCardProps = {
  selectedTask: ITask | null;
  setSelectedTask: (task: ITask | null) => void;
};

export function MobileInputCard({selectedTask, setSelectedTask } : MobileInputCardProps) {
  return (
    <Dialog open={!!selectedTask} onOpenChange={(open) => !open && setSelectedTask(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
