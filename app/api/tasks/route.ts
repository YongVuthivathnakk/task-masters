import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, description, icon, status, board_id } = body;

  const { data: task, error } = await supabase
    .from("tasks")
    .insert({
      name,
      description,
      icon,
      status,
      board_id,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json(task, { status: 201 });
}
