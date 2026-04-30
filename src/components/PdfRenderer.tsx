"use client";

import {
  ChevronDown,
  ChevronUp,
  Loader2,
  RotateCw,
  Search,
} from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import { useToast } from "./ui/use-toast";
import { useResizeDetector } from "react-resize-detector";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState, useCallback, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import SimpleBar from "simplebar-react";
import PdfFullscreen from "./PdfFullscreen";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

type PdfRenderProps = {
  url: string;
};
// Memoized zoom options to prevent recreation
const ZOOM_OPTIONS = [
  { label: "100%", value: 1 },
  { label: "150%", value: 1.5 },
  { label: "200%", value: 2 },
  { label: "250%", value: 2.5 },
] as const;

const PdfRenderer = ({ url }: PdfRenderProps) => {
  const [numPages, setNumPages] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [renderedScale, setRenderedScale] = useState<number>();

  const isLoading = renderedScale !== scale;

  const { toast } = useToast();
  const { width, ref } = useResizeDetector();

  // Custom page validator - memoized
  const CustomPageValidator = useMemo(
    () =>
      z.object({
        page: z.string().refine((num) => {
          const pageNum = Number(num);
          return numPages ? pageNum > 0 && pageNum <= numPages : false;
        }),
      }),
    [numPages],
  );

  type TCustomPage = z.infer<typeof CustomPageValidator>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TCustomPage>({
    defaultValues: { page: "1" },
    resolver: zodResolver(CustomPageValidator),
  });

  useEffect(() => {
    setCurrentPage(1);
    setValue("page", "1");
    setRenderedScale(undefined);
  }, [url, setValue]);
  const handlePageSubmit = useCallback(
    ({ page }: TCustomPage) => {
      const pageNum = Number(page);
      setCurrentPage(pageNum);
      setValue("page", page);
    },
    [setValue],
  );

  const handlePrevPage = useCallback(() => {
    const newPage = Math.max(currentPage - 1, 1);
    setCurrentPage(newPage);
    setValue("page", String(newPage));
  }, [currentPage, setValue]);

  const handleNextPage = useCallback(() => {
    if (!numPages) return;
    const newPage = Math.min(currentPage + 1, numPages);
    setCurrentPage(newPage);
    setValue("page", String(newPage));
  }, [currentPage, numPages, setValue]);

  const handleScaleChange = useCallback((newScale: number) => {
    setScale(newScale);
    setRenderedScale(undefined);
  }, []);

  const handleRotation = useCallback(() => {
    setRotation((prev) => (prev + 90) % 360);
  }, []);

  return (
    <div className="w-full bg-white rounded-md shadow flex flex-col items-center">
      <div className="h-14 w-full border-b border-zinc-200 flex items-center justify-between px-2">
        <div className="flex items-center gap-1.5">
          <Button
            disabled={currentPage <= 1}
            onClick={handlePrevPage}
            variant="ghost"
            aria-label="previous page"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-1.5">
            <Input
              {...register("page")}
              className={cn(
                "w-12 h-8",
                errors.page && "focus-visible:ring-red-500",
              )}
              onKeyDown={(e) =>
                e.key === "Enter" && handleSubmit(handlePageSubmit)()
              }
            />
            <p className="text-zinc-700 text-sm space-x-1">
              <span>/</span>
              <span>{numPages ?? "x"}</span>
            </p>
          </div>

          <Button
            disabled={numPages === undefined || currentPage === numPages}
            onClick={handleNextPage}
            variant="ghost"
            aria-label="next page"
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="gap-1.5"
                variant="ghost"
                aria-label="zoom"
              >
                <Search className="h-4 w-4" />
                {scale * 100}%<ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {ZOOM_OPTIONS.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onSelect={() => handleScaleChange(option.value)}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            aria-label="rotate"
            onClick={handleRotation}
            variant="ghost"
          >
            <RotateCw className="h-4 w-4" />
          </Button>
          <PdfFullscreen fileUrl={url} />
        </div>
      </div>
      <div className="flex-1 w-full max-h-screen">
        <SimpleBar
          autoHide={false}
          className="max-h-[calc(100vh-10rem)]"
        >
          <div ref={ref}>
            <Document
              loading={
                <div className="flex justify-center">
                  <Loader2 className="animate-spin my-24 h-6 w-6" />
                </div>
              }
              onLoadError={() => {
                toast({
                  title: "Error loading PDF",
                  description: "Please try again",
                  variant: "destructive",
                });
              }}
              onLoadSuccess={({ numPages }) => {
                setNumPages(numPages);
              }}
              file={url}
              className="max-h-full"
            >
              {isLoading && renderedScale ? (
                <Page
                  key={`@${renderedScale}`}
                  width={width || 1}
                  pageNumber={currentPage}
                  scale={scale}
                  rotate={rotation}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              ) : null}

              <Page
                key={`@${scale}`}
                className={cn(
                  "transition-all duration-300",
                  isLoading && "opacity-0",
                )}
                width={width || 1}
                pageNumber={currentPage}
                scale={scale}
                rotate={rotation}
                loading={
                  <div className="flex justify-center">
                    <Loader2 className="animate-spin my-24 h-6 w-6" />
                  </div>
                }
                onRenderSuccess={() => {
                  setRenderedScale(scale);
                }}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>
          </div>
        </SimpleBar>
      </div>
    </div>
  );
};

export default PdfRenderer;
