import CreateBoard from "@/components/page/create-board";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const existingBoardId = cookieStore.get("board_id")?.value;

  if (existingBoardId) {
    redirect(`/boards/${existingBoardId}`);
  }

  return (
    <main className="flex min-h-dvh items-center justify-center">
      <CreateBoard />
    </main>
  );
}
