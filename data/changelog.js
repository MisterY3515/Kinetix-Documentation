// CHANGELOG DATA
App.changelog = [
    {
        version: "v0.0.5 (10)",
        date: "2026-02-21",
        changes: [
            "<b>MIR Layer (Ownership Resolved IR):</b> New Mid-level IR (<code>mir.rs</code>) that explicitly represents <code>Move</code>, <code>Copy</code>, and <code>Borrow</code> semantics based on type copyability. Primitives are duplicated; heap-allocated types (<code>str</code>, <code>Array</code>, <code>Map</code>) use strict ownership moves.",
            "<b>Borrow Graph (<code>&</code> / <code>&mut</code>):</b> Added <code>&</code> (immutable borrow) and <code>&mut</code> (mutable borrow) operators to the lexer, parser, HIR, and type system. These generate <code>Operand::Borrow</code> edges in MIR instead of ownership transfers.",
            "<b>Automatic Drop Injection:</b> <code>MirBuilder</code> now tracks lexical scopes and automatically injects <code>Drop(Place)</code> instructions for non-trivially-copyable variables when leaving a scope block.",
            "<b>Borrow Checker Engine (<code>borrowck.rs</code>):</b> New graph-based borrow checker pass that traverses the MIR Control Flow Graph. Tracks variable states (<code>Uninitialized</code>, <code>Initialized</code>, <code>Moved</code>) and rejects Use-After-Move violations at compile time.",
            "<b>Unified Compiler Pipeline:</b> The full 5-step pipeline (<code>AST → Symbol Resolution → Type Constraints → MIR → Borrow Checker → Codegen</code>) is now integrated into <code>kivm exec</code> and <code>kivm compile</code>. Ownership violations produce clean compiler errors.",
            "<b>Legacy Cleanup:</b> Removed duplicate ownership checks from the old <code>compiler.rs</code> backend. The Borrow Checker (<code>borrowck.rs</code>) is now the sole authority on ownership semantics.",
            "<b>Function MIR Lowering:</b> <code>HirStmtKind::Function</code> definitions are now properly lowered into separate <code>MirFunction</code> entries and analyzed by the borrow checker.",
            "<b>Type System:</b> Added <code>Type::Ref(Box&lt;Type&gt;)</code> and <code>Type::MutRef(Box&lt;Type&gt;)</code> variants. Updated unification and constraint collection for reference types.",
            "<b>Build Version:</b> Updated build identifier to Build 10. Documentation and version strings updated."
        ]
    },
    {
        version: "v0.0.4 (9)",
        date: "2026-02-21",
        changes: [
            "<b>LLVM Function Definitions:</b> User-defined functions now compile to native LLVM IR. Parameters, return values, and cross-function calls are fully supported.",
            "<b>LLVM Native Data Types:</b> Strings and Arrays are now compiled as native LLVM <code>StructType</code> (<code>{ i64 length, i8* data }</code> and <code>{ i64 len, i64 cap, i64* data }</code>).",
            "LLVM codegen now declares <code>malloc</code>, <code>memcpy</code>, <code>strcmp</code> from libc for dynamic memory allocation.",
            "<b>Math Bindings:</b> <code>math.sin</code>, <code>math.cos</code>, <code>math.sqrt</code>, <code>math.pow</code> compile directly to native <code>libm</code> calls via LLVM.",
            "<b>Array Literals:</b> <code>[1, 2, 3]</code> in native mode allocates heap memory via <code>malloc</code> and stores elements via <code>GetElementPtr</code>.",
            "<b>Tail Call Optimization:</b> The compiler detects <code>return f(x)</code> patterns and emits <code>TailCall</code> opcode instead of <code>Call + Return</code>, reusing the stack frame for constant-space recursion.",
            "<b>Runtime Error Line Numbers:</b> Errors now display source line numbers and function names (e.g., <code>[line 5] in &lt;main&gt;: Invalid types for Add</code>).",
            "<b>Type System Foundation:</b> Four new compiler modules — <code>types.rs</code> (Type enum with HM variables), <code>symbol.rs</code> (scoped symbol table), <code>hir.rs</code> (typed AST), <code>typeck.rs</code> (constraint collection + Robinson unification with occurs check).",
            "<b>Language Specification:</b> Formalized EBNF syntax, Hindley-Milner Type Inference rules, and Linear Type System documentation.",
            "<b>Language Reference Draft:</b> Created formal Kinetix Language Reference document covering types, ownership, control flow, and memory model.",
            "<b>VM Fix:</b> Implemented <code>Opcode::And</code> and <code>Opcode::Or</code> handlers for logical <code>&&</code> and <code>||</code> operators.",
            "<b>Backward Compatibility:</b> <code>.exki</code> files compiled before this build now load correctly (<code>line_map</code> defaults to empty).",
            "<b>Documentation:</b> Renamed <code>since</code> badge to <code>Implemented</code> across all API docs."
        ]
    },
    {
        version: "v0.0.3 (8)",
        date: "2026-02-19",
        changes: [
            "<b>LLVM Backend (Build 8):</b> Initial implementation of native code generation via LLVM 21.",
            "New CLI flag: <code>kivm compile --native</code> compiles Kinetix source to native object files (<code>.o</code>).",
            "Added <code>llvm</code> feature flag to <code>kicomp</code> and <code>cli</code> crates.",
            "<b>CI Fix:</b> Resolved type mismatch in <code>builtins.rs</code> tests by using <code>VM::new(CompiledProgram::new())</code>.",
            "Architecture: Introduced <code>LLVMCodegen</code> for AST-to-LLVM-IR translation using <code>inkwell</code> crate.",
            "<b>Graph Module:</b> Added <code>draw_line</code> and <code>draw_circle</code> for primitive geometric rendering.",
            "<b>Documentation:</b> Systematized API statuses across all JS modules and standardized output bindings to <code>print</code>."
        ]
    },
    {
        version: "v0.0.3 (7)",
        date: "2026-02-19",
        changes: [
            "<b>Arena Allocation:</b> AST nodes are now allocated in a contiguous memory arena (<code>bumpalo</code>). Zero heap fragmentation and faster parsing.",
            "Replaced all <code>Box&lt;T&gt;</code> with arena references <code>&amp;'a T</code> in the AST, Parser, and Compiler.",
            "Parser now accepts a <code>&amp;Bump</code> arena and allocates nodes via <code>arena.alloc()</code>.",
            "<b>Installer Fix:</b> Build script corrected to produce installer with up-to-date binaries.",
            "Installer: added PATH conflict detection to diagnose version shadowing.",
            "Build script: added <code>cargo clean</code> step and version injection (<code>KINETIX_BUILD</code>).",
            "All 32 parser tests passing with arena-allocated AST."
        ]
    },
    {
        version: "v0.0.3 (6)",
        date: "2026-02-19",
        changes: [
            "<b>Fixed:</b> Version display in documentation and CLI now correctly shows v0.0.3 Build 6.",
            "<b>Fixed:</b> Installer now correctly updates the CLI version.",
            "Removed installation log from installer UI.",
            "<b>Core Architecture Upgrade:</b> Switched to <b>16-bit bytecode</b> (u16 operands). The VM now supports up to <b>65,535 registers and constants</b> per stack frame (previously 255).",
            "<b>Linear Type System:</b> Implemented <b>Ownership & Borrowing</b> checks. Variables now have move semantics; using a moved value triggers a compile-time error. This ensures memory safety without a GC.",
            "Compiler Optimization: <code>println()</code> is now an intrinsic that emits a direct <code>Opcode::Print</code> instruction.",
            "Internal: Refactored <code>Compiler</code> and <code>VM</code> to support larger stack frames and dynamic register allocation."
        ]
    },
    {
        version: "v0.0.2 (5)",
        date: "2026-02-17",
        changes: [
            "<b>Kinetix Shell:</b> <code>kivm shell</code> — interactive terminal with bash-like commands (ls, cd, cat, mkdir, rm, cp, mv, echo, pwd, touch, which, whoami, grep, head, tail, wc) + Kinetix expression evaluation + system command fallback.",
            "Terminal Module (<code>term.*</code>): ANSI control functions — <code>clear</code>, <code>set_color</code>, <code>reset_color</code>, <code>bold</code>, <code>italic</code>, <code>underline</code>, <code>strikethrough</code>, <code>color_print</code>, <code>move_cursor</code>, <code>hide_cursor</code>, <code>show_cursor</code>, <code>size</code>.",
            "Terminal Module: Bash-like commands — <code>ls</code>, <code>cd</code>, <code>pwd</code>, <code>cat</code>, <code>mkdir</code>, <code>rm</code>, <code>cp</code>, <code>mv</code>, <code>echo</code>, <code>touch</code>, <code>which</code>, <code>whoami</code>, <code>env</code>, <code>head</code>, <code>tail</code>, <code>wc</code>, <code>grep</code>.",
            "Documentation: <code>kivm docs</code> opens offline documentation in the default browser.",
            "Installer: no console window on Windows (<code>#![windows_subsystem = \"windows\"]</code>).",
            "Installer: step-by-step progress bar during installation.",
            "Installer: option to install offline documentation.",
            "Installer: KiFile.png icon embedded for file associations on all platforms.",
            "Linux: <code>.desktop</code> entries for Kinetix and Kinetix Shell."
        ]
    },
    {
        version: "v0.0.2 (4)",
        date: "2026-02-17",
        changes: [
            "Data Module: File IO (<code>read_text</code>, <code>write_text</code>, <code>read_bytes</code>, <code>exists</code>, <code>list_dir</code>, <code>alloc</code>, <code>copy</code>).",
            "IO Formats: <code>json.parse</code>/<code>stringify</code> and <code>csv.parse</code>/<code>write</code>.",
            "Database Module: SQLite integration via <code>db.connect</code>, <code>query</code>, <code>execute</code>.",
            "Graph Module: Native UI Widgets (<code>window</code>, <code>button</code>, <code>label</code>, <code>input_text</code>) and Plotting (<code>plot_lines</code>).",
            "LLM Module: Local inference via Ollama (<code>llm.chat</code>, <code>llm.generate</code>).",
            "Cross-platform installer: supports Windows, Linux, and macOS.",
            "CLI: <code>compile --exe</code> produces correct binary names on all platforms.",
            "README updated with language features and standard library overview."
        ]
    },
    {
        version: "v0.0.1 (3)",
        date: "2026-02-16",
        changes: [
            "Native Executable Bundling: <code>kivm compile --exe</code> creates single-file standalone executables.",
            "System Module: added <code>cpu_usage</code>, <code>memory_free</code>, <code>uptime</code>, <code>os_name</code>, <code>os_version</code>, <code>hostname</code>, <code>user_name</code>.",
            "System Module: implemented <code>shell</code>, <code>get_hardware_info</code>, <code>clipboard_set</code>, <code>clipboard_get</code>, <code>gc</code>.",
            "Net Module: added <code>get</code>, <code>post</code>, <code>download</code>.",
            "Graph Module: added <code>plot_lines</code>, <code>plot_histogram</code>, <code>tree_node</code>, <code>table</code> widgets.",
            "Crypto Module: added <code>hash</code>, <code>hmac</code>, <code>uuid</code>, <code>random_bytes</code>.",
            "Audio Module: added <code>play_oneshot</code> and <code>play_stream</code>.",
            "Env Module: added <code>cwd</code>, <code>set_cwd</code>.",
            "Documentation: fixed status contradictions (Not Implemented + Since shown together).",
            "Fixed missing tags for Vector/Matrix functions in Math module.",
            "Fixed <code>sysinfo</code> dependencies for cross-platform support."
        ]
    },
    {
        version: "v0.0.1 (2)",
        date: "2026-02-15",
        changes: [
            "Expanded Standard Library with ~40 new functions across String, List, Math, Vector, System/Env/Time modules.",
            "New global string functions: <code>to_upper</code>, <code>to_lower</code>, <code>trim</code>, <code>split</code>, <code>replace</code>, <code>contains</code>, <code>starts_with</code>, <code>ends_with</code>, <code>pad_left</code>, <code>pad_right</code>, <code>join</code>.",
            "New global list functions: <code>push</code>, <code>pop</code>, <code>remove_at</code>, <code>insert</code>, <code>reverse</code>, <code>sort</code>, <code>min</code>, <code>max</code>, <code>any</code>, <code>all</code>.",
            "New iteration helpers: <code>range</code>, <code>enumerate</code>, <code>zip</code>.",
            "New Math extras: <code>asin</code>, <code>acos</code>, <code>atan2</code>, <code>deg</code>, <code>rad</code>, <code>cbrt</code>, <code>exp</code>, <code>log</code>, <code>log10</code>, <code>clamp</code>, <code>lerp</code>.",
            "New Vector math: <code>math.vector2</code>, <code>math.vector3</code>, <code>math.dot</code>, <code>math.cross</code>, <code>math.length</code>, <code>math.normalize</code>, <code>math.distance</code>.",
            "New System/Env/Time: <code>time.now</code>, <code>time.sleep</code>, <code>time.ticks</code>, <code>env.get</code>, <code>env.set</code>, <code>env.args</code>, <code>byte</code>, <code>char</code>.",
            "Added <code>#version</code> directive for build-version checking.",
            "Dot-notation access for modules: <code>Math</code>, <code>System</code>, <code>time</code>, <code>env</code>, etc.",
            "Added versioning badges (Since, Not Implemented, Deprecated) in API docs.",
            "Added CLI Reference and Directives documentation.",
            "Fixed compiler crash in long code blocks.",
            "Fixed <code>Math.min</code> and <code>Math.max</code> to preserve integer types."
        ]
    },
    {
        version: "v0.0.1 (1)",
        date: "2026-02-14",
        changes: [
            "Initial release of the Kinetix language.",
            "Lexer with 21 keywords, comments, range/float literals, and 20+ operators.",
            "Parser with <code>let</code>/<code>mut</code>, <code>fn</code>, <code>while</code>, <code>for..in</code>, <code>class</code>, <code>struct</code>, <code>#include</code>, <code>if</code>/<code>else</code>, arrays, member access, pattern matching.",
            "KiComp compiler: 30+ register-based opcodes, <code>.exki</code> bundle format.",
            "KiVM: register-based virtual machine with 256 registers.",
            "10 built-in functions: <code>print</code>, <code>println</code>, <code>input</code>, <code>len</code>, <code>typeof</code>, <code>assert</code>, <code>str</code>, <code>int</code>, <code>float</code>, <code>bool</code>.",
            "CLI commands: <code>kivm exec</code>, <code>kivm run</code>, <code>kivm compile</code>, <code>kivm version</code>.",
            "Graphical installer with component selection, PATH integration, and file associations.",
            "Documentation website with API browser, sidebar navigation, search, and syntax highlighting."
        ]
    }
];
