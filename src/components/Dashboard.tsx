"use client";

import { trpc } from "@/app/_trpc/client";
import UploadButton from "./UploadButton";
import {
  Ghost,
  Loader2,
  MessageSquare,
  CalendarDays,
  Trash,
  FileText,
} from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { useState, useMemo, useCallback } from "react";

export default function Dashboard() {
  const [currentlyDeleting, setCurrentlyDeleting] = useState<string | null>(
    null,
  );

  const utils = trpc.useContext();
  const { data: files, isLoading } = trpc.getUserFiles.useQuery();

  const { mutate: deleteFile } = trpc.deleteFile.useMutation({
    onSuccess: () => utils.getUserFiles.invalidate(),
    onMutate: ({ id }) => setCurrentlyDeleting(id),
    onSettled: () => setCurrentlyDeleting(null),
  });

  const handleDelete = useCallback(
    (e: React.MouseEvent, id: string) => {
      e.preventDefault(); // prevent Link navigation on card click
      deleteFile({ id });
    },
    [deleteFile],
  );

  const sortedFiles = useMemo(() => {
    if (!files) return [];
    return [...files].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [files]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-10">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            My Files
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {sortedFiles.length > 0
              ? `${sortedFiles.length} document${sortedFiles.length !== 1 ? "s" : ""} uploaded`
              : "Upload a PDF to get started"}
          </p>
        </div>
        <UploadButton />
      </div>

      {/* ── File grid ──────────────────────────────────────────── */}
      {isLoading ? (
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-background p-5 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <Skeleton
                  circle
                  width={40}
                  height={40}
                />
                <Skeleton
                  width={140}
                  height={16}
                />
              </div>
              <Skeleton
                height={12}
                width="60%"
              />
            </div>
          ))}
        </div>
      ) : sortedFiles.length > 0 ? (
        <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sortedFiles.map((file) => (
            <li key={file.id}>
              <Link
                href={`/dashboard/${file.id}`}
                className="group flex flex-col rounded-xl border border-border bg-background shadow-sm transition-all duration-200 hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5 overflow-hidden"
              >
                {/* Card top — colored strip */}
                <div className="h-1.5 w-full bg-gradient-to-r from-primary/60 to-primary rounded-t-xl" />

                {/* Card body */}
                <div className="flex items-start gap-3 px-5 pt-5 pb-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      {file.name}
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground truncate">
                      PDF document
                    </p>
                  </div>
                </div>

                {/* Card footer */}
                <div className="mt-auto flex items-center justify-between border-t border-border px-5 py-3">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {format(new Date(file.createdAt), "dd MMM yyyy")}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MessageSquare className="h-3.5 w-3.5" />—
                    </span>
                  </div>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => handleDelete(e, file.id)}
                    className="h-8 w-10 p-0 text-destructive-foreground bg-destructive hover:text-destructive-foreground hover:bg-destructive/10 border border-destructive-foreground transition-colors"
                    aria-label={`Delete ${file.name}`}
                  >
                    {currentlyDeleting === file.id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Trash className="h-3.5 w-3.5" />
                    )}
                  </Button>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        /* ── Empty state ──────────────────────────────────────── */
        <div className="mt-20 flex flex-col items-center justify-center gap-3 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-muted/40">
            <Ghost className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Nothing here yet
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Upload your first PDF and start chatting with it.
            </p>
          </div>
          <UploadButton />
        </div>
      )}
    </main>
  );
}
