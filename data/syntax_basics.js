App.register('syntax_basics', {
    title: 'Variables & Types',
    category: 'Manual/Syntax',
    description: `
        <h3>Variable Declaration</h3>
        <p>Kinetix uses a strong, static type system with extensive type inference. Variables are immutable by default.</p>
        <p><strong>Note:</strong> Semicolons (<code>;</code>) are optional at the end of statements, unless separating multiple statements on a single line.</p>
        
        <pre><code class="language-rust">let x = 42             // inferred as int
let y: float = 3.14    // explicit type
mut z = 10             // mutable variable
z = 20                 // OK
// x = 43              // Error: x is immutable</code></pre>

        <h3>Primitive Types</h3>
        <table class="api-table">
            <tr><th>Type</th><th>Size</th><th>Description</th></tr>
            <tr><td><code>int</code></td><td>64-bit</td><td>Signed integer (default).</td></tr>
            <tr><td><code>float</code></td><td>64-bit</td><td>Double precision float (default).</td></tr>
            <tr><td><code>bool</code></td><td>1 byte</td><td>true / false.</td></tr>
            <tr><td><code>char</code></td><td>4 bytes</td><td>Unicode Scalar Value.</td></tr>
            <tr><td><code>byte</code></td><td>1 byte</td><td>Unsigned 8-bit integer.</td></tr>
        </table>

        <h3>String Literals</h3>
        <pre><code class="language-rust">let s = "Hello World"      // String (UTF-8)
let raw = r"Path\To\File"  // Raw String
let fmt = f"Value: {x}"    // Formatted String</code></pre>
    `
});

App.register('syntax_control', {
    title: 'Control Flow',
    category: 'Manual/Syntax',
    description: `
        <h3>If / Else</h3>
        <p>Parentheses are optional around conditions, but braces are mandatory.</p>
        <pre><code class="language-rust">if x > 5 {
    println("High")
} else if x < 2 {
    println("Low")
} else {
    println("Mid")
}</code></pre>

        <h3>Loops</h3>
        <pre><code class="language-rust">// Infinite Loop
loop {
    if condition { break }
}

// While Loop
while x > 0 {
    x -= 1
}

// For Loop (Iterators)
for i in 0..10 {
    println(i) // 0 to 9
}

for item in list {
    println(item)
}</code></pre>

        <h3>Pattern Matching</h3>
        <p>The <code>match</code> expression is robust and exhaustive.</p>
        <pre><code class="language-rust">match value {
    1 => println("One"),
    2 | 3 => println("Two or Three"),
    x if x > 10 => println("Big Number"),
    _ => println("Default")
}</code></pre>
    `
});
