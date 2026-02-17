// CHANGELOG DATA
App.changelog = [
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
