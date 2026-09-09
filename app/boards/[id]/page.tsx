import Board from "@/components/page/board";

export default async function BoardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await fetch(`${process.env.BASE_URL}/api/boards/${id}`);
  if (!res.ok) {
    return <div>ERROR</div>;
  }
  const board = await res.json();

  if (!board) {
    return <div>Loading...</div>;
  }

  return <Board board={board} />;
}
