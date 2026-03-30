import { showToast, Toast, showHUD } from "@raycast/api";
import { stat, rename as fsRename } from "fs/promises";
import { join, extname } from "path";
import { getFinderFiles } from "./instant-runner";

export default async function () {
  try {
    const { folderPath, files } = await getFinderFiles();

    // Sort by creation date
    const withDates = await Promise.all(
      files.map(async (f) => {
        const s = await stat(join(folderPath, f));
        const date = s.birthtime.getTime() > 0 ? s.birthtime : s.mtime;
        return { name: f, date };
      }),
    );
    withDates.sort((a, b) => a.date.getTime() - b.date.getTime());

    const results = withDates.map((f, i) => ({
      original: f.name,
      renamed: `${String(i + 1).padStart(3, "0")}${extname(f.name)}`,
    }));

    const changed = results.filter((r) => r.original !== r.renamed);
    if (changed.length === 0) {
      await showHUD("No changes needed");
      return;
    }

    for (const r of changed) {
      await fsRename(join(folderPath, r.original), join(folderPath, r.renamed));
    }

    await showToast({
      style: Toast.Style.Success,
      title: `Enumerated ${changed.length} files by date`,
      message: "Press ⌘Z to undo",
      primaryAction: {
        title: "Undo",
        shortcut: { modifiers: ["cmd"], key: "z" },
        onAction: async () => {
          try {
            for (const r of [...changed].reverse()) {
              await fsRename(join(folderPath, r.renamed), join(folderPath, r.original));
            }
            await showHUD(`Undid ${changed.length} renames`);
          } catch (error) {
            await showToast({ style: Toast.Style.Failure, title: "Undo failed", message: error instanceof Error ? error.message : String(error) });
          }
        },
      },
    });
  } catch (error) {
    await showToast({ style: Toast.Style.Failure, title: "Enumerate by Date", message: error instanceof Error ? error.message : String(error) });
  }
}
