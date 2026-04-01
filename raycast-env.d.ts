/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** TMDB API Key (Free) - Optional. Get a free API key at themoviedb.org to enable automatic season/episode lookup for Smart Organize Episodes. */
  "tmdbApiKey"?: string,
  /** TheTVDB API Key ($12/year) - Optional. Requires a $12/year subscription at thetvdb.com. Alternative to TMDB for season/episode metadata. */
  "tvdbApiKey"?: string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `rebaptize` command */
  export type Rebaptize = ExtensionPreferences & {}
  /** Preferences accessible in the `smart-organize` command */
  export type SmartOrganize = ExtensionPreferences & {}
  /** Preferences accessible in the `sort-by-date` command */
  export type SortByDate = ExtensionPreferences & {}
  /** Preferences accessible in the `sort-by-location` command */
  export type SortByLocation = ExtensionPreferences & {}
  /** Preferences accessible in the `smart-find-replace` command */
  export type SmartFindReplace = ExtensionPreferences & {}
  /** Preferences accessible in the `create-script` command */
  export type CreateScript = ExtensionPreferences & {}
  /** Preferences accessible in the `run-script` command */
  export type RunScript = ExtensionPreferences & {}
  /** Preferences accessible in the `preset-tv-show` command */
  export type PresetTvShow = ExtensionPreferences & {}
  /** Preferences accessible in the `preset-anime` command */
  export type PresetAnime = ExtensionPreferences & {}
  /** Preferences accessible in the `preset-movie` command */
  export type PresetMovie = ExtensionPreferences & {}
  /** Preferences accessible in the `preset-date-based` command */
  export type PresetDateBased = ExtensionPreferences & {}
  /** Preferences accessible in the `preset-change-case` command */
  export type PresetChangeCase = ExtensionPreferences & {}
  /** Preferences accessible in the `preset-swap-delimiter` command */
  export type PresetSwapDelimiter = ExtensionPreferences & {}
  /** Preferences accessible in the `preset-auto-enumerate` command */
  export type PresetAutoEnumerate = ExtensionPreferences & {}
  /** Preferences accessible in the `preset-change-extension` command */
  export type PresetChangeExtension = ExtensionPreferences & {}
  /** Preferences accessible in the `instant-uppercase` command */
  export type InstantUppercase = ExtensionPreferences & {}
  /** Preferences accessible in the `instant-lowercase` command */
  export type InstantLowercase = ExtensionPreferences & {}
  /** Preferences accessible in the `instant-titlecase` command */
  export type InstantTitlecase = ExtensionPreferences & {}
  /** Preferences accessible in the `instant-sentencecase` command */
  export type InstantSentencecase = ExtensionPreferences & {}
  /** Preferences accessible in the `instant-dots-to-spaces` command */
  export type InstantDotsToSpaces = ExtensionPreferences & {}
  /** Preferences accessible in the `instant-spaces-to-dots` command */
  export type InstantSpacesToDots = ExtensionPreferences & {}
  /** Preferences accessible in the `instant-underscores-to-spaces` command */
  export type InstantUnderscoresToSpaces = ExtensionPreferences & {}
  /** Preferences accessible in the `instant-spaces-to-underscores` command */
  export type InstantSpacesToUnderscores = ExtensionPreferences & {}
  /** Preferences accessible in the `instant-dashes-to-spaces` command */
  export type InstantDashesToSpaces = ExtensionPreferences & {}
  /** Preferences accessible in the `instant-spaces-to-dashes` command */
  export type InstantSpacesToDashes = ExtensionPreferences & {}
  /** Preferences accessible in the `instant-collapse-spaces` command */
  export type InstantCollapseSpaces = ExtensionPreferences & {}
  /** Preferences accessible in the `instant-enumerate-by-name` command */
  export type InstantEnumerateByName = ExtensionPreferences & {}
  /** Preferences accessible in the `instant-enumerate-by-date` command */
  export type InstantEnumerateByDate = ExtensionPreferences & {}
  /** Preferences accessible in the `instant-undo` command */
  export type InstantUndo = ExtensionPreferences & {}
  /** Preferences accessible in the `instant-remove-accents` command */
  export type InstantRemoveAccents = ExtensionPreferences & {}
  /** Preferences accessible in the `instant-strip-digits` command */
  export type InstantStripDigits = ExtensionPreferences & {}
  /** Preferences accessible in the `instant-strip-special` command */
  export type InstantStripSpecial = ExtensionPreferences & {}
  /** Preferences accessible in the `instant-trim` command */
  export type InstantTrim = ExtensionPreferences & {}
  /** Preferences accessible in the `instant-pad-numbers` command */
  export type InstantPadNumbers = ExtensionPreferences & {}
  /** Preferences accessible in the `instant-unpad-numbers` command */
  export type InstantUnpadNumbers = ExtensionPreferences & {}
  /** Preferences accessible in the `instant-parent-folder` command */
  export type InstantParentFolder = ExtensionPreferences & {}
  /** Preferences accessible in the `instant-swap-parts` command */
  export type InstantSwapParts = ExtensionPreferences & {}
  /** Preferences accessible in the `instant-transliterate` command */
  export type InstantTransliterate = ExtensionPreferences & {}
  /** Preferences accessible in the `exif-rename` command */
  export type ExifRename = ExtensionPreferences & {}
  /** Preferences accessible in the `rename-from-csv` command */
  export type RenameFromCsv = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `rebaptize` command */
  export type Rebaptize = {}
  /** Arguments passed to the `smart-organize` command */
  export type SmartOrganize = {}
  /** Arguments passed to the `sort-by-date` command */
  export type SortByDate = {}
  /** Arguments passed to the `sort-by-location` command */
  export type SortByLocation = {}
  /** Arguments passed to the `smart-find-replace` command */
  export type SmartFindReplace = {}
  /** Arguments passed to the `create-script` command */
  export type CreateScript = {}
  /** Arguments passed to the `run-script` command */
  export type RunScript = {}
  /** Arguments passed to the `preset-tv-show` command */
  export type PresetTvShow = {}
  /** Arguments passed to the `preset-anime` command */
  export type PresetAnime = {}
  /** Arguments passed to the `preset-movie` command */
  export type PresetMovie = {}
  /** Arguments passed to the `preset-date-based` command */
  export type PresetDateBased = {}
  /** Arguments passed to the `preset-change-case` command */
  export type PresetChangeCase = {}
  /** Arguments passed to the `preset-swap-delimiter` command */
  export type PresetSwapDelimiter = {}
  /** Arguments passed to the `preset-auto-enumerate` command */
  export type PresetAutoEnumerate = {}
  /** Arguments passed to the `preset-change-extension` command */
  export type PresetChangeExtension = {}
  /** Arguments passed to the `instant-uppercase` command */
  export type InstantUppercase = {}
  /** Arguments passed to the `instant-lowercase` command */
  export type InstantLowercase = {}
  /** Arguments passed to the `instant-titlecase` command */
  export type InstantTitlecase = {}
  /** Arguments passed to the `instant-sentencecase` command */
  export type InstantSentencecase = {}
  /** Arguments passed to the `instant-dots-to-spaces` command */
  export type InstantDotsToSpaces = {}
  /** Arguments passed to the `instant-spaces-to-dots` command */
  export type InstantSpacesToDots = {}
  /** Arguments passed to the `instant-underscores-to-spaces` command */
  export type InstantUnderscoresToSpaces = {}
  /** Arguments passed to the `instant-spaces-to-underscores` command */
  export type InstantSpacesToUnderscores = {}
  /** Arguments passed to the `instant-dashes-to-spaces` command */
  export type InstantDashesToSpaces = {}
  /** Arguments passed to the `instant-spaces-to-dashes` command */
  export type InstantSpacesToDashes = {}
  /** Arguments passed to the `instant-collapse-spaces` command */
  export type InstantCollapseSpaces = {}
  /** Arguments passed to the `instant-enumerate-by-name` command */
  export type InstantEnumerateByName = {}
  /** Arguments passed to the `instant-enumerate-by-date` command */
  export type InstantEnumerateByDate = {}
  /** Arguments passed to the `instant-undo` command */
  export type InstantUndo = {}
  /** Arguments passed to the `instant-remove-accents` command */
  export type InstantRemoveAccents = {}
  /** Arguments passed to the `instant-strip-digits` command */
  export type InstantStripDigits = {}
  /** Arguments passed to the `instant-strip-special` command */
  export type InstantStripSpecial = {}
  /** Arguments passed to the `instant-trim` command */
  export type InstantTrim = {}
  /** Arguments passed to the `instant-pad-numbers` command */
  export type InstantPadNumbers = {}
  /** Arguments passed to the `instant-unpad-numbers` command */
  export type InstantUnpadNumbers = {}
  /** Arguments passed to the `instant-parent-folder` command */
  export type InstantParentFolder = {}
  /** Arguments passed to the `instant-swap-parts` command */
  export type InstantSwapParts = {}
  /** Arguments passed to the `instant-transliterate` command */
  export type InstantTransliterate = {}
  /** Arguments passed to the `exif-rename` command */
  export type ExifRename = {}
  /** Arguments passed to the `rename-from-csv` command */
  export type RenameFromCsv = {}
}

