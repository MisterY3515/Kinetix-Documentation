// Chapter: Ownership & Borrowing
// The Kinetix equivalent of Rust Book Chapter 4

App.register('ownership', {
    title: 'Ownership & Borrowing',
    category: 'Manual',
    order: 3,
    description: `
<p>Ownership is Kinetix's most distinctive feature and has deep implications for how the language works. It enables Kinetix to make memory safety guarantees <strong>without a garbage collector</strong>.</p>

<p>If you're coming from languages like Python, JavaScript, or Java, this concept will be new. If you know Rust, you'll feel right at home. Understanding ownership is essential to writing correct Kinetix programs.</p>

<h2>What is Ownership?</h2>

<p>All programs have to manage the memory they use while running. Some languages have garbage collection (Java, Go, Python); others require the programmer to explicitly allocate and free memory (C, C++). Kinetix uses a third approach: memory is managed through a system of <strong>ownership rules</strong> that the compiler checks at compile time.</p>

<div class="note-box">
    <span class="callout-title">Note</span>
    None of the ownership features slow down your program at runtime. The checks happen entirely at compile time.
</div>

<h3>Ownership Rules</h3>
<p>The rules are simple:</p>
<ol>
    <li>Each value in Kinetix has an <strong>owner</strong> (the variable that holds it).</li>
    <li>There can only be <strong>one owner at a time</strong>.</li>
    <li>When the owner goes out of scope, the value is <strong>dropped</strong> (memory is freed).</li>
</ol>

<h3>Stack vs Heap</h3>
<p>Kinetix distinguishes between two categories of types:</p>

<table class="api-table">
    <tr><th>Category</th><th>Types</th><th>Behavior</th></tr>
    <tr><td><strong>Copy Types</strong> (Stack)</td><td><code>int</code>, <code>float</code>, <code>bool</code></td><td>Values are <em>duplicated</em> on assignment. Both variables remain valid.</td></tr>
    <tr><td><strong>Move Types</strong> (Heap)</td><td><code>String</code>, <code>Array</code>, <code>Map</code></td><td>Ownership is <em>transferred</em> on assignment. The original variable becomes invalid.</td></tr>
</table>

<h2>Move Semantics</h2>

<p>When you assign a heap-allocated value to another variable, the ownership <strong>moves</strong>. The original variable can no longer be used.</p>

<pre><code>let a = "hello, world"
let b = a              // Ownership of the string moves from 'a' to 'b'
// let c = a           // ERROR: Use of moved variable 'a'</code></pre>

<div class="warning-box">
    <span class="callout-title">Compile-Time Error</span>
    If you try to use <code>a</code> after it has been moved, the Kinetix compiler will reject the program with:<br>
    <code>Borrow Checker errors: Line N: Use of uninitialized or moved variable</code>
</div>

<p>This is different from <strong>Copy types</strong>, which are simply duplicated:</p>

<pre><code>let x = 42
let y = x          // 'x' is copied (int is a Copy type)
let z = x          // OK: 'x' is still valid</code></pre>

<div class="tip-box">
    <span class="callout-title">Why?</span>
    Move semantics prevent <strong>double-free</strong> bugs. If two variables pointed to the same heap memory and both tried to free it when going out of scope, the program would corrupt memory. By enforcing single ownership, Kinetix eliminates this entire class of bugs.
</div>

<h2>Borrowing</h2>

<p>What if you want to use a value without taking ownership of it? Kinetix provides <strong>references</strong> (also called borrows) for this purpose.</p>

<h3>Immutable References (<code>&amp;</code>)</h3>
<p>An immutable reference lets you read a value without taking ownership:</p>

<pre><code>let data = "important data"
let ref = &data         // Borrow 'data' immutably
// 'data' is still valid here
println(data)           // OK: we still own it</code></pre>

<h3>Mutable References (<code>&amp;mut</code>)</h3>
<p>A mutable reference lets you modify a value without taking ownership:</p>

<pre><code>mut buffer = "hello"
let ref = &mut buffer   // Mutable borrow
// Modify through 'ref' (when supported)</code></pre>

<h3>Borrowing Rules</h3>
<p>The borrow checker enforces two critical rules to prevent data races at compile time:</p>

<table class="api-table">
    <tr><th>Rule</th><th>Allowed</th><th>Reason</th></tr>
    <tr><td>Multiple immutable borrows</td><td>✅ Yes</td><td>Reading from many places is safe</td></tr>
    <tr><td>One mutable borrow (exclusive)</td><td>✅ Yes</td><td>Only one writer at a time</td></tr>
    <tr><td>Mutable + immutable borrows</td><td>❌ No</td><td>Can't read while someone writes</td></tr>
</table>

<div class="important-box">
    <span class="callout-title">Key Insight</span>
    These rules are checked at compile time by the <strong>Borrow Checker</strong> (<code>borrowck.rs</code>). If your program compiles, the ownership rules are guaranteed to hold at runtime.
</div>

<h2>The Borrow Checker</h2>

<p>The Borrow Checker is a dedicated compiler pass that analyzes your code's <strong>MIR (Mid-level IR)</strong> to verify ownership and borrowing rules. Here's how it works:</p>

<div class="diagram-box">Source (.kix)
    │
    ▼
  Lexer → Parser → AST
    │
    ▼
  Symbol Resolution → HIR (Typed AST)
    │
    ▼
  Type Inference (Hindley-Milner)
    │
    ▼
  MIR Lowering  ← Move / Copy / Borrow decisions happen here
    │
    ▼
  Borrow Checker ← Validates ownership rules
    │
    ▼
  Codegen (Bytecode or LLVM)</div>

<p>For each variable, the borrow checker tracks one of three states:</p>
<table class="api-table">
    <tr><th>State</th><th>Meaning</th></tr>
    <tr><td><code>Uninitialized</code></td><td>Variable declared but not yet assigned a value.</td></tr>
    <tr><td><code>Initialized</code></td><td>Variable has a valid value and can be used.</td></tr>
    <tr><td><code>Moved</code></td><td>Value transferred to another variable. Using this variable is an error.</td></tr>
</table>

<h2>Drop: Automatic Cleanup</h2>

<p>When a variable goes out of scope, Kinetix automatically inserts a <strong>Drop</strong> instruction to free the associated memory. This happens deterministically — you always know exactly when memory is released.</p>

<pre><code>{
    let name = "temporary"
    // 'name' is valid here
}
// 'name' is dropped here — memory is freed</code></pre>

<div class="note-box">
    <span class="callout-title">Note</span>
    Drop is only inserted for <strong>Move types</strong> (String, Array, Map). Copy types (int, float, bool) live on the stack and are cleaned up automatically when the stack frame returns.
</div>

<h2>Summary</h2>
<table class="api-table">
    <tr><th>Concept</th><th>What it means</th></tr>
    <tr><td><strong>Ownership</strong></td><td>Each value has exactly one owner variable</td></tr>
    <tr><td><strong>Move</strong></td><td>Heap values transfer ownership on assignment</td></tr>
    <tr><td><strong>Copy</strong></td><td>Stack values are duplicated on assignment</td></tr>
    <tr><td><strong>Borrow (&amp;)</strong></td><td>Temporary read-only access without taking ownership</td></tr>
    <tr><td><strong>Mutable Borrow (&amp;mut)</strong></td><td>Temporary exclusive write access</td></tr>
    <tr><td><strong>Drop</strong></td><td>Automatic memory cleanup when owner goes out of scope</td></tr>
</table>
    `
});
