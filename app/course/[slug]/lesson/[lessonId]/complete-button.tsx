"use client";
import { useState } from "react";

export function CompleteButton({ lessonId }: { lessonId: string }) {
  const [loading, setLoading] = useState(false);

  return (
    <button
      className="rounded bg-green-600 px-3 py-2 text-white"
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        await fetch("/api/progress", { method: "POST", body: JSON.stringify({ lessonId, completed: true }) });
        setLoading(false);
      }}
    >
      {loading ? "Menyimpan..." : "Mark as complete"}
    </button>
  );
}
