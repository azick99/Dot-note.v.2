"use client";
import { useState, useCallback, useRef } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "./ui/dialog";
import Dropzone from "react-dropzone";
import { Cloud, FileText, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { useUploadThing } from "@/lib/uploadthing";
import { useToast } from "./ui/use-toast";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const MAX_FILE_SIZE = 4 * 1024 * 1024;

type UploadState = "idle" | "uploading" | "processing" | "success" | "error";
type UploadDropzoneProps = {
  onClose: () => void;
  onUploadComplete: () => void;
};

const UploadDropzone = ({ onClose, onUploadComplete }: UploadDropzoneProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const { startUpload } = useUploadThing("pdfUploader");
  const utils = trpc.useContext();

  const clearProgressInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startSimulatedProgress = () => {
    setUploadProgress(0);
    intervalRef.current = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearProgressInterval();
          return prev;
        }
        return prev + 10;
      });
    }, 200);
  };

  const { mutate: startPolling } = trpc.getFile.useMutation({
    onSuccess: (file) => {
      clearProgressInterval();
      setUploadProgress(100);
      setUploadState("success");
      utils.getUserFiles.invalidate();
      onUploadComplete();
      setTimeout(() => {
        onClose();
        router.push(`/dashboard/${file.id}`);
      }, 800);
    },
    retry: true,
    retryDelay: 300,
  });

  const resetState = () => {
    clearProgressInterval();
    setUploadState("idle");
    setUploadProgress(0);
    setFileName(null);
    setFileSize(null);
  };

  const handleDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      if (file.type !== "application/pdf") {
        toast({
          title: "PDFs only",
          description: "Please upload a PDF file.",
          variant: "destructive",
        });
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "File too large",
          description: "Max size is 4MB.",
          variant: "destructive",
        });
        return;
      }

      setFileName(file.name);
      setFileSize(file.size);
      setUploadState("uploading");
      startSimulatedProgress();

      try {
        const res = await startUpload([file]);
        if (!res) throw new Error("No response");
        const key = res[0]?.key;
        if (!key) throw new Error("No key");
        setUploadState("processing");
        startPolling({ key });
      } catch {
        clearProgressInterval();
        setUploadState("error");
        toast({
          title: "Upload failed",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    },
    [startUpload, startPolling, toast],
  );

  const isUploading =
    uploadState === "uploading" || uploadState === "processing";
  const formatSize = (bytes: number) =>
    `${(bytes / 1024 / 1024).toFixed(2)} MB`;

  return (
    <Dropzone
      disabled={isUploading || uploadState === "success"}
      multiple={false}
      accept={{ "application/pdf": [".pdf"] }}
      onDrop={handleDrop}
      onDropRejected={(rejected) => {
        const err = rejected[0]?.errors[0];
        if (err?.code === "file-invalid-type") {
          toast({
            title: "PDFs only",
            description: "Please upload a PDF file.",
            variant: "destructive",
          });
        } else if (err?.code === "file-too-large") {
          toast({
            title: "File too large",
            description: "Max size is 4MB.",
            variant: "destructive",
          });
        }
      }}
    >
      {({ getRootProps, getInputProps, isDragActive }) => (
        <div
          {...getRootProps()}
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "relative m-4 rounded-xl border-2 border-dashed transition-all duration-200 select-none",
            isUploading || uploadState === "success"
              ? "pointer-events-none border-border bg-muted/40 cursor-not-allowed"
              : uploadState === "error"
                ? "border-destructive-foreground/30 bg-destructive/50 cursor-pointer"
                : isDragActive
                  ? "border-primary bg-primary/5 scale-[1.01]"
                  : "border-border bg-background hover:border-primary/50 hover:bg-primary/5 cursor-pointer",
          )}
        >
          <label
            htmlFor="dropzone-file"
            className={cn(
              "flex flex-col items-center justify-center h-52 w-full px-6",
              isUploading || uploadState === "success"
                ? "cursor-not-allowed pointer-events-none"
                : "cursor-pointer",
            )}
          >
            {/* Icon */}
            <div className="mb-4">
              {uploadState === "success" ? (
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 ring-4 ring-green-50">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
              ) : uploadState === "error" ? (
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-destructive/20 ring-4 ring-destructive/10">
                  <XCircle className="w-6 h-6 text-destructive-foreground" />
                </div>
              ) : isUploading ? (
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 ring-4 ring-primary/5">
                  <Loader2 className="w-6 h-6 text-primary animate-spin" />
                </div>
              ) : (
                <div
                  className={cn(
                    "flex items-center justify-center w-12 h-12 rounded-full ring-4 transition-all duration-200",
                    isDragActive
                      ? "bg-primary/10 ring-primary/10"
                      : "bg-muted ring-muted",
                  )}
                >
                  <Cloud
                    className={cn(
                      "w-6 h-6 transition-colors duration-200",
                      isDragActive ? "text-primary" : "text-muted-foreground",
                    )}
                  />
                </div>
              )}
            </div>

            {/* Status text */}
            <div className="text-center space-y-1 mb-4">
              {uploadState === "success" ? (
                <>
                  <p className="text-sm font-semibold text-green-600">
                    Upload complete!
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Redirecting you now…
                  </p>
                </>
              ) : uploadState === "error" ? (
                <>
                  <p className="text-sm font-semibold text-destructive-foreground">
                    Upload failed
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Click or drop to try again
                  </p>
                </>
              ) : isUploading ? (
                <>
                  <p className="text-sm font-semibold text-foreground">
                    {uploadState === "processing"
                      ? "Processing PDF…"
                      : "Uploading…"}
                  </p>
                  {fileName && (
                    <p className="text-xs text-muted-foreground truncate max-w-[200px] mx-auto">
                      {fileName}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <p className="text-sm font-semibold text-foreground">
                    {isDragActive
                      ? "Drop your PDF here"
                      : "Click to upload or drag & drop"}
                  </p>
                  <p className="text-xs text-muted-foreground">PDF up to 4MB</p>
                </>
              )}
            </div>

            {/* File chip */}
            {fileName &&
              !isUploading &&
              uploadState !== "success" &&
              uploadState !== "error" && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-background border border-border rounded-lg shadow-sm">
                  <FileText className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span className="text-xs text-foreground truncate max-w-[160px]">
                    {fileName}
                  </span>
                  {fileSize && (
                    <span className="text-xs text-muted-foreground shrink-0">
                      {formatSize(fileSize)}
                    </span>
                  )}
                </div>
              )}

            {/* Progress bar */}
            {isUploading && (
              <div className="w-full max-w-[220px] mx-auto space-y-1.5">
                <div className="w-full h-1 rounded-full bg-muted overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-300 ease-out",
                      uploadProgress === 100 ? "bg-green-500" : "bg-primary",
                    )}
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-xs text-center text-muted-foreground">
                  {uploadProgress}%
                </p>
              </div>
            )}

            <input
              {...getInputProps()}
              id="dropzone-file"
              type="file"
              className="hidden"
              disabled={isUploading || uploadState === "success"}
            />
          </label>

          {/* Error reset */}
          {uploadState === "error" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                resetState();
              }}
              className="absolute bottom-3 right-3 text-xs text-destructive-foreground/70 hover:text-destructive-foreground underline underline-offset-2 transition-colors"
            >
              Reset
            </button>
          )}
        </div>
      )}
    </Dropzone>
  );
};

const UploadButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) setIsOpen(false);
      }}
    >
      <DialogTrigger
        asChild
        onClick={() => setIsOpen(true)}
      >
        <Button className="gap-2">
          <Cloud className="h-4 w-4" />
          Upload PDF
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[420px] p-0 overflow-hidden rounded-2xl border border-border bg-background shadow-xl">
        <DialogTitle className="sr-only">Upload PDF</DialogTitle>

        {/* Modal header */}
        <div className="flex items-center gap-3 px-6 pt-6 pb-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
            <FileText className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Upload a PDF
            </h2>
            <p className="text-xs text-muted-foreground">
              Ready to chat in seconds.
            </p>
          </div>
        </div>

        <UploadDropzone
          onClose={() => setIsOpen(false)}
          onUploadComplete={() => {}}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UploadButton;
