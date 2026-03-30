import { stat } from "fs/promises";
import { extname, basename, join } from "path";

export type RenameMode = "tv-show" | "sequential" | "date";

export interface RenameOptions {
  mode: RenameMode;
  // TV show mode
  showName?: string;
  season?: number;
  startEpisode?: number;
  // Sequential mode
  prefix?: string;
  startNumber?: number;
  zeroPad?: number;
  // Date mode
  dateFormat?: "YYYY-MM-DD" | "DD-MM-YYYY" | "MM-DD-YYYY";
  datePrefix?: string;
}

export interface RenamePreview {
  original: string;
  renamed: string;
}

function padNumber(n: number, width: number): string {
  return String(n).padStart(width, "0");
}

function formatDate(date: Date, format: string): string {
  const y = date.getFullYear().toString();
  const m = padNumber(date.getMonth() + 1, 2);
  const d = padNumber(date.getDate(), 2);
  const hh = padNumber(date.getHours(), 2);
  const mm = padNumber(date.getMinutes(), 2);
  const ss = padNumber(date.getSeconds(), 2);

  switch (format) {
    case "DD-MM-YYYY":
      return `${d}-${m}-${y}_${hh}-${mm}-${ss}`;
    case "MM-DD-YYYY":
      return `${m}-${d}-${y}_${hh}-${mm}-${ss}`;
    case "YYYY-MM-DD":
    default:
      return `${y}-${m}-${d}_${hh}-${mm}-${ss}`;
  }
}

export function generateTvShowName(
  fileName: string,
  showName: string,
  season: number,
  episode: number,
): string {
  const ext = extname(fileName);
  const sanitized = showName.replace(/\s+/g, ".");
  return `${sanitized}.S${padNumber(season, 2)}E${padNumber(episode, 2)}${ext}`;
}

export function generateSequentialName(
  fileName: string,
  prefix: string,
  number: number,
  zeroPad: number,
): string {
  const ext = extname(fileName);
  return `${prefix}-${padNumber(number, zeroPad)}${ext}`;
}

export async function generateDateName(
  filePath: string,
  fileName: string,
  dateFormat: string,
  prefix: string,
  index: number,
): Promise<string> {
  const ext = extname(fileName);
  try {
    const stats = await stat(filePath);
    const date = stats.birthtime.getTime() > 0 ? stats.birthtime : stats.mtime;
    const dateStr = formatDate(date, dateFormat);
    const prefixStr = prefix ? `${prefix}-` : "";
    return `${prefixStr}${dateStr}-${padNumber(index + 1, 3)}${ext}`;
  } catch {
    const prefixStr = prefix ? `${prefix}-` : "";
    return `${prefixStr}unknown-${padNumber(index + 1, 3)}${ext}`;
  }
}

export async function generatePreviews(
  folderPath: string,
  files: string[],
  options: RenameOptions,
): Promise<RenamePreview[]> {
  const previews: RenamePreview[] = [];

  for (let i = 0; i < files.length; i++) {
    const fileName = files[i];
    let renamed: string;

    switch (options.mode) {
      case "tv-show":
        renamed = generateTvShowName(
          fileName,
          options.showName || "Show",
          options.season ?? 1,
          (options.startEpisode ?? 1) + i,
        );
        break;
      case "sequential":
        renamed = generateSequentialName(
          fileName,
          options.prefix || "file",
          (options.startNumber ?? 1) + i,
          options.zeroPad ?? 3,
        );
        break;
      case "date":
        renamed = await generateDateName(
          join(folderPath, fileName),
          fileName,
          options.dateFormat ?? "YYYY-MM-DD",
          options.datePrefix ?? "",
          i,
        );
        break;
    }

    previews.push({ original: fileName, renamed });
  }

  return previews;
}
