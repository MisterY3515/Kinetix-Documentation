# Kinetix Documentation

## CLI Reference

The Kinetix CLI (`kivm`) allows you to compile and run Kinetix programs.

### Commands

- **`exec <file.kix>`**: Compiles and runs a source file immediately.
  - *Example*: `kivm exec main.kix`
- **`compile -i <input.kix> [-o <output.exki>] [--exe]`**: Compiles source code to a bytecode bundle or standalone executable.
  - *Example (Bytecode)*: `kivm compile -i main.kix -o game.exki`
  - *Example (Executable)*: `kivm compile -i main.kix --exe` (Creates `main.exe` / `main`)
- **`run <file.exki>`**: Executes a compiled bytecode bundle.
  - *Example*: `kivm run game.exki`
- **`version`**: Displays the current Kinetix version.
  - *Example*: `kivm version` (Output: `Kinetix CLI v0.0.1 build 2`)

## Versioning

Kinetix follows a specific versioning scheme: `vX.Y.Z build N`.
- **vX.Y.Z**: Semantic versioning (Major.Minor.Patch).
- **build N**: Incremental build number for tracking intermediate updates.

## Directives

### `#version <build>`
Declares the minimum build version required to run your script. A **warning** is emitted at compile time if the current version is older.

```kinetix
#version 2   // Requires build 2 or later
```

### `#include`
Imports external files or standard library modules.

```kinetix
#include "utils.nvr"
#include <math> as m
```

## Standard Library Availability

The documentation now indicates the version in which each function was introduced.
- **Since v0.0.1**: Available in the first public release.
- **Not Implemented**: Planned but not yet available.
