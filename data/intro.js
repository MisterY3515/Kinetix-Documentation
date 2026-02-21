App.register('intro', {
    title: 'Introduction',
    category: 'Manual',
    order: 1,
    description: `
<p>Welcome to <strong>The Kinetix Programming Language</strong>, an introductory guide to Kinetix. This documentation will teach you how to write Kinetix programs, understand the compiler, and use the standard library effectively.</p>

<h2>What is Kinetix?</h2>

<p>Kinetix is a high-performance, safety-oriented programming language designed for <strong>systems programming and automation</strong>. It combines the speed of compiled languages with the convenience of interpreted ones.</p>

<p>Here's what makes Kinetix unique:</p>
<ul>
    <li><strong>Dual Compilation</strong> — Write once, run as interpreted bytecode (<code>.exki</code>) for rapid iteration, or compile to native machine code via LLVM for maximum performance.</li>
    <li><strong>Linear Type System</strong> — Memory is managed through ownership and borrowing rules, checked at compile time. No garbage collector, no manual memory management.</li>
    <li><strong>Batteries Included</strong> — A rich standard library covers file I/O, networking, databases, UI, audio, cryptography, and even local AI inference — all built in.</li>
    <li><strong>Clean Syntax</strong> — C-style syntax with modern ergonomics: type inference, pattern matching, and first-class functions.</li>
</ul>

<div class="note-box">
    <span class="callout-title">Development Status</span>
    Kinetix is under active development (currently v0.0.5, Build 10). Some features documented here may be partially implemented or planned for future releases. Check the <a href="#changelog">Changelog</a> for the latest updates.
</div>

<h2>Installation</h2>

<p>Kinetix provides a graphical installer for all platforms. Download it from the <a href="https://github.com/MisterY3515/Kinetix/releases" target="_blank">GitHub Releases</a> page.</p>

<h3>Windows</h3>
<ol>
    <li>Download <code>installer.exe</code> from the latest release.</li>
    <li>Run the installer — it will guide you through component selection.</li>
    <li>The installer adds <code>kivm</code> and <code>kicomp</code> to your system PATH.</li>
    <li>Open a terminal and verify: <code>kivm version</code></li>
</ol>

<h3>Linux / macOS</h3>
<ol>
    <li>Download the appropriate installer binary.</li>
    <li>Make it executable: <code>chmod +x installer</code></li>
    <li>Run: <code>./installer</code></li>
    <li>Verify: <code>kivm version</code></li>
</ol>

<h3>Building From Source</h3>
<p>If you prefer to build from source, you need the <a href="https://rustup.rs/" target="_blank">Rust toolchain</a>:</p>
<pre><code>git clone https://github.com/MisterY3515/Kinetix.git
cd Kinetix
cargo build --release --workspace
# Binary at: target/release/kivm</code></pre>

<div class="tip-box">
    <span class="callout-title">LLVM Backend</span>
    To enable native compilation (<code>kivm compile --native</code>), install LLVM 21 and build with <code>cargo build --release --features llvm</code>.
</div>

<h2>Hello, World!</h2>

<p>Let's write your first Kinetix program. Create a file called <code>hello.kix</code>:</p>

<pre><code>println("Hello, world!")</code></pre>

<p>Run it directly:</p>
<pre><code>kivm exec hello.kix</code></pre>

<p>You should see:</p>
<pre><code>Hello, world!</code></pre>

<p>Congratulations! You've just run your first Kinetix program. Let's break down what happened:</p>
<ol>
    <li><code>kivm exec</code> invokes the Kinetix Virtual Machine in <strong>interpreter mode</strong>. It parses, compiles, and executes your script in one step.</li>
    <li><code>println</code> is a built-in function that prints a value followed by a newline.</li>
    <li>Kinetix doesn't require a <code>main()</code> function — top-level statements are executed automatically.</li>
</ol>

<h2>How Kinetix Works</h2>

<p>Understanding the compilation pipeline helps you write better code and debug issues. Here's the high-level architecture:</p>

<div class="diagram-box">Source Code (.kix)
    │
    ▼
┌────────────┐
│   Lexer    │  Converts text → tokens
└────────────┘
    │
    ▼
┌────────────┐
│   Parser   │  Tokens → Abstract Syntax Tree (AST)
└────────────┘
    │          ┌─────────────────────────────┐
    ├─────────►│ Symbol Resolution + HIR     │  Named references + typed tree
    │          └─────────────────────────────┘
    │          ┌─────────────────────────────┐
    ├─────────►│ Type Inference (HM)         │  Hindley-Milner unification
    │          └─────────────────────────────┘
    │          ┌─────────────────────────────┐
    ├─────────►│ MIR (Move/Copy/Borrow)      │  Ownership semantics decided
    │          └─────────────────────────────┘
    │          ┌─────────────────────────────┐
    ├─────────►│ Borrow Checker              │  Validates ownership rules
    │          └─────────────────────────────┘
    │
    ▼
┌────────────────────┐    ┌───────────────────┐
│ KiVM Bytecode      │ OR │ LLVM Native Code  │
│ (.exki format)     │    │ (.o object file)  │
└────────────────────┘    └───────────────────┘</div>

<h2>What's Next?</h2>

<p>Now that you have Kinetix installed and understand the basics, here's a suggested reading path:</p>

<ol>
    <li><a href="#syntax">Syntax Basics</a> — Variables, types, control flow, functions, classes</li>
    <li><a href="#ownership">Ownership & Borrowing</a> — The core memory safety model</li>
    <li><a href="#error_handling">Error Handling</a> — Reading compiler errors</li>
    <li><a href="#compilation">Compilation Pipeline</a> — Bytecode vs native compilation</li>
    <li><a href="#cli">CLI Reference</a> — All <code>kivm</code> commands</li>
</ol>

<h3>Standard Library Modules</h3>
<table class="api-table">
    <tr><th>Module</th><th>Purpose</th><th>Key Functions</th></tr>
    <tr><td><a href="#system">System</a></td><td>OS interaction, hardware info</td><td><code>cpu_usage</code>, <code>shell</code>, <code>clipboard</code></td></tr>
    <tr><td><a href="#math">Math</a></td><td>Math operations, vectors, matrices</td><td><code>sin</code>, <code>pow</code>, <code>vector3</code>, <code>random</code></td></tr>
    <tr><td><a href="#data">Data</a></td><td>File I/O, JSON, CSV, databases</td><td><code>read_text</code>, <code>json.parse</code>, <code>db.query</code></td></tr>
    <tr><td><a href="#net">Net</a></td><td>HTTP, WebSocket, networking</td><td><code>get</code>, <code>post</code>, <code>download</code></td></tr>
    <tr><td><a href="#graph">Graph</a></td><td>Native UI, drawing, plotting</td><td><code>window</code>, <code>button</code>, <code>plot_lines</code></td></tr>
    <tr><td><a href="#game">Game</a></td><td>Game development, input, physics</td><td><code>create_window</code>, <code>get_key</code></td></tr>
    <tr><td><a href="#audio">Audio</a></td><td>Sound playback</td><td><code>play_oneshot</code>, <code>play_stream</code></td></tr>
</table>
    `
});

App.register('syntax', {
    title: 'Syntax Basics',
    category: 'Manual',
    order: 2,
    description: `
<p>Kinetix uses a clean, C-style syntax with modern ergonomics. This chapter covers the fundamental building blocks of the language: variables, types, expressions, and control flow.</p>

<h2>Variables & Mutability</h2>

<p>In Kinetix, variables are <strong>immutable by default</strong>. This is a deliberate design choice — immutability prevents accidental state changes and makes code easier to reason about.</p>

<table class="api-table">
    <tr><th>Keyword</th><th>Usage</th><th>Description</th></tr>
    <tr><td><span class="token-keyword">let</span></td><td><code>let x = 10</code></td><td>Declares an <strong>immutable</strong> variable. You cannot reassign <code>x</code>.</td></tr>
    <tr><td><span class="token-keyword">mut</span></td><td><code>mut y = 20</code></td><td>Declares a <strong>mutable</strong> variable. You can change <code>y</code> later.</td></tr>
</table>

<pre><code>let pi = 3.14159    // Constant / Immutable
// pi = 3.14        // ERROR: Cannot assign to immutable variable

mut counter = 0     // Mutable
counter = counter + 1 // OK: 1</code></pre>

<div class="tip-box">
    <span class="callout-title">Why Immutable by Default?</span>
    Immutable variables are easier to reason about, optimize, and parallelize. The compiler can make stronger guarantees about your code when it knows values won't change. Use <code>mut</code> only when you explicitly need to modify a value.
</div>

<h2>Type System</h2>

<p>Kinetix is statically typed, but supports <strong>Hindley-Milner Type Inference</strong> — you rarely need to write types explicitly. The compiler figures them out for you.</p>

<pre><code>let a = 42              // Inferred as 'int'
let b: float = 10.5     // Explicit type annotation
let c: String = "Hello" // Explicit type</code></pre>

<h3>Primitive Types</h3>
<table class="api-table">
    <tr><th>Type</th><th>Size</th><th>Description</th><th>Copy?</th></tr>
    <tr><td><span class="type">int</span></td><td>64-bit</td><td>Signed Integer. Default for integer literals.</td><td>✅ Yes</td></tr>
    <tr><td><span class="type">float</span></td><td>64-bit</td><td>Double Precision Float. Default for float literals.</td><td>✅ Yes</td></tr>
    <tr><td><span class="type">bool</span></td><td>1 byte</td><td>Boolean (<code>true</code>, <code>false</code>).</td><td>✅ Yes</td></tr>
    <tr><td><span class="type">char</span></td><td>4 bytes</td><td>Unicode Character.</td><td>✅ Yes</td></tr>
    <tr><td><span class="type">byte</span></td><td>1 byte</td><td>Unsigned 8-bit Integer.</td><td>✅ Yes</td></tr>
    <tr><td><span class="type">String</span></td><td>Heap</td><td>UTF-8 encoded text string.</td><td>❌ Move</td></tr>
    <tr><td><span class="type">Array</span></td><td>Heap</td><td>Dynamic array of elements.</td><td>❌ Move</td></tr>
    <tr><td><span class="type">Map</span></td><td>Heap</td><td>Key-value dictionary.</td><td>❌ Move</td></tr>
</table>

<div class="note-box">
    <span class="callout-title">Copy vs Move</span>
    The "Copy?" column indicates whether the type uses <strong>copy semantics</strong> (value is duplicated on assignment) or <strong>move semantics</strong> (ownership is transferred). See the <a href="#ownership">Ownership & Borrowing</a> chapter for details.
</div>

<h2>Control Flow</h2>
<p>Standard <code>if-else</code> and <code>switch</code> constructs.</p>
<pre><code>if score > 100 {
    println("High Score!")
} else if score > 50 {
    println("Good job")
} else {
    println("Try again")
}

// Switch (Pattern Matching)
switch state {
    case "IDLE": println("Waiting...")
    case "RUN":  println("Running")
    default:     println("Unknown")
}</code></pre>

<h2>Loops</h2>
<p>Kinetix provides <code>for</code>, <code>while</code>, and <code>loop</code>.</p>
<pre><code>// For Loop (Range)
for i in 0..10 {
    println(i)
}

// While Loop
mut running = true
while running {
    running = check_system()
}

// Infinite Loop (use break to exit)
loop {
    let frame = get_next_frame()
    if !frame { break }
}</code></pre>

<h2>Functions</h2>
<p>Functions are declared with <code>fn</code>. Parameters have explicit types; return types are inferred or annotated:</p>

<pre><code>fn greet(name: String) {
    println("Hello, " + name)
}

fn add(a: int, b: int) -> int {
    return a + b
}

fn factorial(n: int) -> int {
    if n <= 1 { return 1 }
    return n * factorial(n - 1)  // TCO applied automatically
}</code></pre>

<div class="tip-box">
    <span class="callout-title">Tail Call Optimization</span>
    The compiler detects <code>return f(x)</code> patterns and optimizes them into a loop, enabling constant-space recursion.
</div>

<h2>Classes & Structs</h2>
<p>Object-oriented programming using <code>class</code> and lightweight <code>struct</code>.</p>
<pre><code>class Player {
    pub name: String
    mut hp: int

    fn new(name: String) {
        this.name = name
        this.hp = 100
    }

    fn take_damage(amount: int) {
        this.hp = this.hp - amount
    }
}

let p = Player("Hero")
p.take_damage(10)</code></pre>

<h2>Vectors</h2>
<p>Vectors are first-class types optimized for performance. Use <code>vec2</code>, <code>vec3</code>, <code>vec4</code>.</p>
<pre><code>let pos = vec3(0, 1, 0)
let v = pos.y           // Access component
let v2 = pos.xz         // Swizzling: creates vec2(0, 0) from x and z</code></pre>
    `
});
