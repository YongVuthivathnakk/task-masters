import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const { data: board, error } = await supabase
    .from("boards")
    .select("*, tasks(*)")
    .eq("id", id)
    .single();

  if (error || !board) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(board);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const body = await request.json();

  const { name, description } = body;

  const { data: board, error } = await supabase
    .from("boards")
    .update({
      name,
      description,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json(board);
}
