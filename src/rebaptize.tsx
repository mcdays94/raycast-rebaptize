import {
  ActionPanel,
  Action,
  Form,
  List,
  Icon,
  showToast,
  Toast,
  useNavigation,
  confirmAlert,
  Alert,
  Color,
} from "@raycast/api";
import { useState } from "react";
import { readdir, rename, stat } from "fs/promises";
import { join, extname } from "path";
import { type RenameMode, type RenameOptions, type RenamePreview, generatePreviews } from "./rename";

const VIDEO_EXTENSIONS = new Set([
  ".mp4", ".mkv", ".avi", ".mov", ".wmv", ".flv", ".webm", ".m4v", ".mpg", ".mpeg", ".ts", ".vob",
]);

const IMAGE_EXTENSIONS = new Set([
  ".jpg", ".jpeg", ".png", ".gif", ".webp", ".tiff", ".tif", ".bmp", ".heic", ".heif", ".svg", ".raw", ".cr2", ".nef",
]);

function isMediaFile(fileName: string): boolean {
  const ext = extname(fileName).toLowerCase();
  return VIDEO_EXTENSIONS.has(ext) || IMAGE_EXTENSIONS.has(ext);
}

function isHidden(fileName: string): boolean {
  return fileName.startsWith(".");
}

async function getFiles(folderPath: string): Promise<string[]> {
  const entries = await readdir(folderPath);
  const files: string[] = [];
  for (const entry of entries) {
    if (isHidden(entry)) continue;
    const fullPath = join(folderPath, entry);
    const s = await stat(fullPath);
    if (s.isFile() && isMediaFile(entry)) {
      files.push(entry);
    }
  }
  // Sort naturally by name
  return files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
}

function PreviewList({
  folderPath,
  previews,
  onConfirm,
}: {
  folderPath: string;
  previews: RenamePreview[];
  onConfirm: () => void;
}) {
  return (
    <List navigationTitle="Preview Renames">
      {previews.map((p, i) => (
        <List.Item
          key={i}
          icon={{ source: Icon.ArrowRight, tintColor: Color.Blue }}
          title={p.original}
          subtitle={`→ ${p.renamed}`}
          actions={
            <ActionPanel>
              <Action
                title="Confirm Rename All"
                icon={Icon.Checkmark}
                onAction={onConfirm}
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}

export default function Rebaptize() {
  const { push } = useNavigation();
  const [mode, setMode] = useState<RenameMode>("tv-show");

  // TV show fields
  const [showName, setShowName] = useState("");
  const [season, setSeason] = useState("1");
  const [startEpisode, setStartEpisode] = useState("1");

  // Sequential fields
  const [prefix, setPrefix] = useState("");
  const [startNumber, setStartNumber] = useState("1");
  const [zeroPad, setZeroPad] = useState("3");

  // Date fields
  const [dateFormat, setDateFormat] = useState<"YYYY-MM-DD" | "DD-MM-YYYY" | "MM-DD-YYYY">("YYYY-MM-DD");
  const [datePrefix, setDatePrefix] = useState("");

  async function handleSubmit(values: { folder: string[] }) {
    const folderPaths = values.folder;
    if (!folderPaths || folderPaths.length === 0) {
      await showToast({ style: Toast.Style.Failure, title: "No folder selected" });
      return;
    }
    const folderPath = folderPaths[0];

    try {
      const files = await getFiles(folderPath);
      if (files.length === 0) {
        await showToast({ style: Toast.Style.Failure, title: "No media files found", message: "The folder has no video or image files." });
        return;
      }

      const options: RenameOptions = { mode };

      switch (mode) {
        case "tv-show":
          if (!showName.trim()) {
            await showToast({ style: Toast.Style.Failure, title: "Show name is required" });
            return;
          }
          options.showName = showName.trim();
          options.season = parseInt(season) || 1;
          options.startEpisode = parseInt(startEpisode) || 1;
          break;
        case "sequential":
          if (!prefix.trim()) {
            await showToast({ style: Toast.Style.Failure, title: "Prefix is required" });
            return;
          }
          options.prefix = prefix.trim();
          options.startNumber = parseInt(startNumber) || 1;
          options.zeroPad = parseInt(zeroPad) || 3;
          break;
        case "date":
          options.dateFormat = dateFormat;
          options.datePrefix = datePrefix.trim();
          break;
      }

      const previews = await generatePreviews(folderPath, files, options);

      push(
        <PreviewList
          folderPath={folderPath}
          previews={previews}
          onConfirm={async () => {
            const confirmed = await confirmAlert({
              title: `Rename ${previews.length} files?`,
              message: "This cannot be undone.",
              primaryAction: { title: "Rename", style: Alert.ActionStyle.Destructive },
            });

            if (!confirmed) return;

            try {
              await showToast({ style: Toast.Style.Animated, title: "Renaming files..." });
              for (const p of previews) {
                await rename(join(folderPath, p.original), join(folderPath, p.renamed));
              }
              await showToast({
                style: Toast.Style.Success,
                title: "Done!",
                message: `Renamed ${previews.length} files`,
              });
            } catch (error) {
              await showToast({
                style: Toast.Style.Failure,
                title: "Rename failed",
                message: error instanceof Error ? error.message : String(error),
              });
            }
          }}
        />,
      );
    } catch (error) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Error reading folder",
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }

  return (
    <Form
      navigationTitle="Rebaptize"
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Preview Renames" icon={Icon.Eye} onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.FilePicker
        id="folder"
        title="Folder"
        allowMultipleSelection={false}
        canChooseDirectories
        canChooseFiles={false}
      />

      <Form.Dropdown id="mode" title="Rename Mode" value={mode} onChange={(v) => setMode(v as RenameMode)}>
        <Form.Dropdown.Item value="tv-show" title="TV Show (S01E01)" icon={Icon.Tv} />
        <Form.Dropdown.Item value="sequential" title="Sequential Numbering" icon={Icon.NumberList} />
        <Form.Dropdown.Item value="date" title="Date-Based" icon={Icon.Calendar} />
      </Form.Dropdown>

      <Form.Separator />

      {mode === "tv-show" && (
        <>
          <Form.TextField
            id="showName"
            title="Show Name"
            placeholder="Breaking Bad"
            value={showName}
            onChange={setShowName}
          />
          <Form.TextField
            id="season"
            title="Season"
            placeholder="1"
            value={season}
            onChange={setSeason}
          />
          <Form.TextField
            id="startEpisode"
            title="Start Episode"
            placeholder="1"
            value={startEpisode}
            onChange={setStartEpisode}
          />
          <Form.Description
            title="Preview"
            text={`${(showName.trim() || "Show.Name").replace(/\s+/g, ".")}.S${(season || "1").padStart(2, "0")}E${(startEpisode || "1").padStart(2, "0")}.ext`}
          />
        </>
      )}

      {mode === "sequential" && (
        <>
          <Form.TextField
            id="prefix"
            title="Prefix"
            placeholder="Vacation"
            value={prefix}
            onChange={setPrefix}
          />
          <Form.TextField
            id="startNumber"
            title="Start Number"
            placeholder="1"
            value={startNumber}
            onChange={setStartNumber}
          />
          <Form.TextField
            id="zeroPad"
            title="Zero Padding"
            placeholder="3"
            value={zeroPad}
            onChange={setZeroPad}
          />
          <Form.Description
            title="Preview"
            text={`${prefix.trim() || "file"}-${(startNumber || "1").padStart(parseInt(zeroPad) || 3, "0")}.ext`}
          />
        </>
      )}

      {mode === "date" && (
        <>
          <Form.Dropdown
            id="dateFormat"
            title="Date Format"
            value={dateFormat}
            onChange={(v) => setDateFormat(v as "YYYY-MM-DD" | "DD-MM-YYYY" | "MM-DD-YYYY")}
          >
            <Form.Dropdown.Item value="YYYY-MM-DD" title="YYYY-MM-DD" />
            <Form.Dropdown.Item value="DD-MM-YYYY" title="DD-MM-YYYY" />
            <Form.Dropdown.Item value="MM-DD-YYYY" title="MM-DD-YYYY" />
          </Form.Dropdown>
          <Form.TextField
            id="datePrefix"
            title="Prefix (Optional)"
            placeholder="Trip"
            value={datePrefix}
            onChange={setDatePrefix}
          />
          <Form.Description
            title="Preview"
            text={`${datePrefix.trim() ? datePrefix.trim() + "-" : ""}2026-03-30_14-30-00-001.ext`}
          />
        </>
      )}
    </Form>
  );
}
