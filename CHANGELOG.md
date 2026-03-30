# Rebaptize Changelog

## [Custom Rename Scripts] - 2026-03-30

- Add Create Rename Script command to build reusable rename pipelines with file filters and chained steps
- Add Run Rename Script command to list and execute saved scripts
- Add Edit Script support from Run Rename Script (Cmd+E)

## [Instant Commands and Undo] - 2026-03-30

- Add 13 instant no-view commands for one-shot renames: case conversion, delimiter swaps, spacing, and enumeration
- Add Undo Last Rename command that reverts the last instant action within 5 minutes
- All instant commands run with no UI, directly against the current Finder folder

## [Presets as Standalone Commands] - 2026-03-30

- Add 9 preset shortcut commands: Rename as TV Show, Rename as Anime, Rename as Movie, Rename Sequentially, Rename by Date, Change Filename Case, Swap Filename Delimiter, Auto Enumerate Files, Change File Extension
- Each preset can be assigned its own alias or hotkey in Raycast

## [New Presets and Smart Features] - 2026-03-30

- Add Change Case preset with UPPERCASE, lowercase, Title Case, and Sentence case
- Add Swap Delimiter preset to replace any delimiter with another
- Add Auto Enumerate preset with sorting by name, date created, date modified, file size, or name length
- Add Change Extension preset for bulk file extension conversion
- Add custom word separator and suffix options for TV Show and Movie presets
- Add Smart Find & Replace command with up to 3 chained regex rules and file filters

## [Smart Detection and Finder Integration] - 2026-03-30

- All commands auto-detect the current Finder folder using getSelectedFinderItems and AppleScript fallback
- Smart file analysis auto-fills show names, season numbers, and suggests the best rename preset
- Proper title casing for auto-detected show names
- Show detected folder path as info text on all folder pickers

## [Smart Organize Episodes and Sort Commands] - 2026-03-30

- Add Smart Organize Episodes command with auto-detection of episode numbers from 9 filename patterns
- Add Sort Files by Date command to organize files into date-named folders (day, month, year)
- Add Sort Photos by Location command using EXIF GPS data and OpenStreetMap reverse geocoding
- Add TheTVDB integration for automatic season and episode metadata lookup

## [Initial Release] - 2026-03-30

- Rebaptize Files command with presets for TV shows, anime, movies, sequential numbering, date-based, and find & replace
- Works with any file type
- Live preview before committing renames
