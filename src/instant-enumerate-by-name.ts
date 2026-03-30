import { showToast, Toast, showHUD, confirmAlert, Alert } from "@raycast/api";
import { rename as fsRename } from "fs/promises";
import { join, extname } from "path";
import { getFinderFiles } from "./instant-runner";

export default async function () {
  try {
    const { folderPath, files } = await getFinderFiles();

    const results = files.map((f, i) => ({
      original: f,
      renamed: `${String(i + 1).padStart(3, "0")}${extname(f)}`,
    }));

    const changed = results.filter((r) => r.original !== r.renamed);
    if (changed.length === 0) {
      await showHUD("No files to rename");
      return;
    }

    const confirmed = await confirmAlert({
      title: `Enumerate ${changed.length} files by name`,
      message: `${changed.slice(0, 3).map((r) => `${r.original} → ${r.renamed}`).join("\n")}${changed.length > 3 ? `\n...and ${changed.length - 3} more` : ""}`,
      primaryAction: { title: "Rename", style: Alert.ActionStyle.Destructive },
    });
    if (!confirmed) return;

    for (const r of changed) {
      await fsRename(join(folderPath, r.original), join(folderPath, r.renamed));
    }
    await showHUD(`Enumerated ${changed.length} files`);
  } catch (error) {
    await showToast({ style: Toast.Style.Failure, title: "Enumerate", message: error instanceof Error ? error.message : String(error) });
  }
}
