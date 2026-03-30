import { showToast, Toast, showHUD, confirmAlert, Alert } from "@raycast/api";
import { readdir, stat, rename as fsRename } from "fs/promises";
import { join } from "path";
import { getFinderFolder } from "./finder";

function isHidden(name: string): boolean {
  return name.startsWith(".");
}

export interface RenameResult {
  original: string;
  renamed: string;
}

/**
 * Get all non-hidden files in the current Finder folder, sorted by name.
 */
export async function getFinderFiles(): Promise<{ folderPath: string; files: string[] }> {
  const folderPath = await getFinderFolder();
  if (!folderPath) {
    throw new Error("Open a Finder window first");
  }

  const entries = await readdir(folderPath);
  const files: string[] = [];
  for (const entry of entries) {
    if (isHidden(entry)) continue;
    const s = await stat(join(folderPath, entry));
    if (s.isFile()) files.push(entry);
  }

  files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));

  if (files.length === 0) {
    throw new Error("No files in folder");
  }

  return { folderPath, files };
}

/**
 * Run an instant rename: apply a transform function, confirm, execute.
 */
export async function runInstantRename(
  transform: (fileName: string) => string,
  actionName: string,
): Promise<void> {
  try {
    const { folderPath, files } = await getFinderFiles();

    const results: RenameResult[] = files.map((f) => ({
      original: f,
      renamed: transform(f),
    }));

    const changed = results.filter((r) => r.original !== r.renamed);

    if (changed.length === 0) {
      await showHUD("No files to rename");
      return;
    }

    const confirmed = await confirmAlert({
      title: `${actionName}: ${changed.length} files`,
      message: `${changed.slice(0, 3).map((r) => `${r.original} → ${r.renamed}`).join("\n")}${changed.length > 3 ? `\n...and ${changed.length - 3} more` : ""}`,
      primaryAction: { title: "Rename", style: Alert.ActionStyle.Destructive },
    });

    if (!confirmed) return;

    for (const r of changed) {
      await fsRename(join(folderPath, r.original), join(folderPath, r.renamed));
    }

    await showHUD(`Renamed ${changed.length} files`);
  } catch (error) {
    await showToast({
      style: Toast.Style.Failure,
      title: actionName,
      message: error instanceof Error ? error.message : String(error),
    });
  }
}
