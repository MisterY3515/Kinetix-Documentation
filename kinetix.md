# Kinetix Language Reference for AI Agents (RAG)

**Current Version**: v0.0.6 (Build 12)
**Paradigm**: Hybrid Interpretative/Compiled. Statically (optionally) typed. 
**Compiler Pipeline**: Source (`.kix`) -> AST (Arena-Allocated) -> 16-bit Bytecode (`.exki`) -> KiVM Execution OR LLVM Backend JIT/Native.

## 1. Syntax & Core Semantics

### Variables (Linear Types)
Memory is managed without a GC via Linear Types (Move semantics).
- `let name = ...` (Immutable)
- `mut name = ...` (Mutable)
- Explicit types (optional): `let age: int = 30`

### Types
- `int` (i64), `float` (f64), `bool`, `string`, `null`
- Arrays: `[1, 2, 3]`
- Maps: Not fully established natively in literal syntax, rely on standard library if present.
- Functions (Closure), Classes, Structs.

### Control Flow
- **If/Else**: `if cond { } else if cond2 { } else { }`
- **While**: `while cond { }`
- **For**: `for item in array { }`. For ranges: `for i in range(0, 5) { }`.

### Functions & Classes
- **Functions**: `fn name(arg1: int) -> int { return arg1 * 2; }`
- **Lambdas**: `let f = fn(x) { return x; }`
- **Classes**: `class Animal { fn speak(self) { println("hi") } }`
- **Structs**: `struct Point(x: float, y: float)`

## 2. Standard Library Builtins
Always available globally without imports.
- **IO**: `println(...)`, `println(...)`, `input("Prompt: ")`
- **Utils**: `len(arr_or_str)`, `typeof(val)`, `assert(cond, msg)`, `copy(val)`
- **Conversions**: `str(v)`, `int(v)`, `float(v)`, `bool(v)`, `byte(v)`, `char(v)`

## 3. Standard Library Modules
Global functions mapped to modules (use `module.func(...)` or global wrappers).

### Strings
- `to_upper(s)`, `to_lower(s)`, `trim(s)`, `split(s, sep)`, `replace(s, old, new)`, `contains(s, sub)`, `starts_with(s, p)`, `ends_with(s, sfx)`, `pad_left(s, len, ch)`, `pad_right(...)`, `join(arr, sep)`

### Arrays / Lists
- `push(arr, val)`, `pop(arr)`, `remove_at(arr, idx)`, `insert(arr, idx, val)`
- `reverse(arr)`, `sort(arr)` (naive sort)
- `min(arr)`, `max(arr)`, `any(arr, fn)`, `all(arr, fn)`

### Iterators
- `range(start, end, step=1)`
- `enumerate(arr)` -> returns `[[idx, val], ...]`
- `zip(arr1, arr2)` -> returns `[[v1, v2], ...]`

### Math
- `Math.sin(f)`, `Math.cos(f)`, `Math.sqrt(f)`, `Math.abs(n)`, `Math.floor(f)`, `Math.ceil(f)`, `Math.round(f)`, `Math.pow(b, e)`
- `Math.asin(f)`, `Math.acos(f)`, `Math.atan2(y, x)`, `Math.deg(f)`, `Math.rad(f)`, `Math.cbrt(f)`, `Math.exp(f)`, `Math.log(f)`, `Math.log10(f)`
- `Math.clamp(v, min, max)`, `Math.lerp(a, b, t)`, `Math.min(a, b)`, `Math.max(a, b)`
- `Math.random()`, `Math.random_range(min, max)`

### Math Vector
- `math.vector2(x, y)`, `math.vector3(x, y, z)`
- `math.dot(a, b)`, `math.cross(a, b)`, `math.length(v)`, `math.distance(a, b)`, `math.normalize(v)`

### System & Environment
- `System.time()` / `time.now()`, `time.ticks()`, `time.sleep(ms)`
- `env.cwd()`, `env.set_cwd(path)`, `env.user()`, `env.hostname()`, `env.get(key)`, `env.set(k, v)`, `env.args()`
- `System.shell(cmd)` - execute bash cmd
- `System.cpu_usage()`, `System.memory_free()`, `System.uptime()`, `System.os_name()`
- `System.clipboard_set(s)`, `System.clipboard_get()`, `System.gc()`

### Term (Terminal UI)
- `term.clear()`, `term.set_color(cl)`, `term.reset_color()`, `term.color_print(cl, txt)`
- Shell fallbacks: `term.ls()`, `term.cat()`, `term.grep()`

### Other Modules
- `db.*` (SQLite), `net.*` (HTTP/Download), `data.*` (File IO/JSON/CSV), `crypto.*` (Hash, UUID), `audio.*`, `graph.*` (Native Windows/Plots), `llm.*` (Ollama integration).

## 4. CLI Tools
- `kivm exec file.kix` : Run source. Uses LLVM JIT (if compiled with `--features llvm`), fallback to Bytecode VM.
- `kivm compile -i src.kix -o out.exki` : Compile to bytecode.
- `kivm compile -i src.kix --exe` : Compile to standalone bundle.
- `kivm compile -i src.kix --native` : Compile to native object file (`.o`) via LLVM O2 pass.
- `kivm shell` : Interactive REPL.

## 5. Directives
- `#include "file.kix"` : Import another Kinetix file.
- `#version 2` : Ensure codebase build version is >= 2.

## 6. Known Limitations (Build 9)
- LLVM native execution (`--native` and JIT) is experimental and only fully supports primitives (`int`, `float`, `bool`), conditionals (`if`/`while`), and basic `print`. Full stdlib (Strings, Arrays) is running primarily under the Bytecode VM until Build 9/10 completes the LLVM bindings.
