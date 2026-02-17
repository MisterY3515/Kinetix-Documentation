App.register('intro', {
    title: 'Introduction',
    category: 'Manual',
    description: `
        <p>Welcome to the <strong>Kinetix Language Documentation</strong>.</p>
        <p>Kinetix is a high-performance, safety-oriented language designed for modern systems programming and automation.</p>
        
        <h3>Getting Started</h3>
        <ul>
            <li><a href="#syntax_basics">Syntax Basics</a></li>
            <li><a href="#compilation">Compilation Guide</a></li>
            <li><a href="#build_system">Build System (.kicomp)</a></li>
        </ul>
        
        <h3>Modules Overview</h3>
        <p>Kinetix's standard library is organized into specialized modules:</p>
        <ul>
            <li><strong>Core</strong>: <a href="#system">System</a>, <a href="#math">Math</a>, <a href="#thread">Thread</a></li>
            <li><strong>Multimedia</strong>: <a href="#graph">Graph (UI)</a>, <a href="#game">Game Logic</a></li>
            <li><strong>Networking</strong>: <a href="#net">Net</a>, <a href="#crypto">Crypto</a></li>
        </ul>
    `
});

App.register('syntax', {
    title: 'Syntax Basics',
    category: 'Manual',
    description: `
<p>Kinetix uses a clean, C-style syntax. This guide covers variable declaration, mutability, types, and control flow.</p>

<h2>Variables & Mutability</h2>
<p>In Kinetix, variables are <strong>immutable by default</strong>. This means once a value is assigned, it cannot be changed unless explicitly declared as mutable.</p>

<table class="api-table">
    <tr><th>Keyword</th><th>Usage</th><th>Description</th></tr>
    <tr><td><span class="token-keyword">let</span></td><td><code>let x = 10</code></td><td>Declares an <strong>immutable</strong> variable. You cannot reassign <code>x</code>.</td></tr>
    <tr><td><span class="token-keyword">mut</span></td><td><code>mut y = 20</code></td><td>Declares a <strong>mutable</strong> variable. You can change <code>y</code> later.</td></tr>
</table>

<pre><code>let pi = 3.14159    // Constant / Immutable
// pi = 3.14        // Error: Cannot assign to immutable variable

mut counter = 0     // Mutable
counter = counter + 1 // OK: 1</code></pre>

<h2>Control Flow</h2>
<p>Standard <code>if-else</code> and <code>switch</code> constructs.</p>
<pre><code>if score > 100 {
    print("High Score!")
} else if score > 50 {
    print("Good job")
} else {
    print("Try again")
}

// Switch (Pattern Matching)
switch state {
    case "IDLE": print("Waiting...")
    case "RUN":  print("Running")
    default:     print("Unknown")
}</code></pre>

<h2>Loops</h2>
<p>Kinetix provides <code>for</code>, <code>while</code>, and <code>loop</code>.</p>
<pre><code>// For Loop (Range)
for i in 0..10 {
    print(i)
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

<h2>Type System</h2>
<p>Kinetix is statically typed, but supports <strong>Type Inference</strong>.</p>

<pre><code>let a = 42              // Inferred as 'int'
let b: float = 10.5     // Explicit type annotation
let c: String = "Hello" // Explicit type</code></pre>

<h3>Primitive Types</h3>
<table class="api-table">
    <tr><th>Type</th><th>Size</th><th>Description</th></tr>
    <tr><td><span class="type">int</span></td><td>64-bit</td><td>Signed Integer. Default for integer literals.</td></tr>
    <tr><td><span class="type">float</span></td><td>64-bit</td><td>Double Precision Float. Default for float literals.</td></tr>
    <tr><td><span class="type">bool</span></td><td>1 byte</td><td>Boolean (<code>true</code>, <code>false</code>).</td></tr>
    <tr><td><span class="type">char</span></td><td>4 bytes</td><td>Unicode Character.</td></tr>
    <tr><td><span class="type">byte</span></td><td>1 byte</td><td>Unsigned 8-bit Integer.</td></tr>
</table>

<h2>Vectors</h2>
<p>Vectors are first-class types optimized for performance. Use <code>vec2</code>, <code>vec3</code>, <code>vec4</code>.</p>
<pre><code>let pos = vec3(0, 1, 0)
let v = pos.y           // Access component
let v2 = pos.xz         // Swizzling: creates vec2(0, 0) from x and z</code></pre>
`
});
