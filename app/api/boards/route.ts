import { DEFAULT_TASKS } from "@/app/utils/default-tasks";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST() {
  const { data: board, error: boardError } = await supabase
    .from("boards")
    .insert({})
    .select()
    .single();
  if (boardError) {
    return NextResponse.json({ error: boardError.message }, { status: 500 });
  }

  const { data: tasks, error: taskError } = await supabase
    .from("tasks")
    .insert(DEFAULT_TASKS.map((t) => ({ ...t, board_id: board.id })))
    .select();

  if (taskError) {
    return NextResponse.json({ error: taskError.message }, { status: 500 });
  }

  const response = NextResponse.json({ ...board, tasks }, { status: 201 });
  response.cookies.set("board_id", board.id, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 365,
  });

  return response;
}
