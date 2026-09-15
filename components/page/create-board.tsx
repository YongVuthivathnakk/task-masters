"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateBoard() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCreateBoard = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/boards", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to create board");
      }

      const board = await response.json();

      router.replace(`/boards/${board.id}`);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleCreateBoard}
      className={"text-lg hover:scale-110"}
      disabled={loading}
    >
      {loading && <Loader2 className="animate-spin" />}
      {loading ? "Creating..." : "Create Board"}
    </Button>
  );
}
