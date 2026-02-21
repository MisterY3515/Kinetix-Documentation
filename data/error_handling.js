// Chapter: Error Handling
// Understanding Kinetix compiler errors and runtime errors

App.register('error_handling', {
    title: 'Error Handling',
    category: 'Manual',
    order: 4,
    description: `
<p>One of Kinetix's design goals is to produce <strong>clear, actionable error messages</strong>. Errors are caught as early as possible in the compilation pipeline to prevent bugs from reaching production.</p>

<div class="diagram-box">
Codice Sorgente (.kix)
   │
   ├─ Syntax Errors (Parser)
   │
   ├─ Resolution Errors (SymbolTable)  ← "Undeclared variable"
   │
   ├─ Type Errors (Type Checker)       ← "Type mismatch: bool vs int"
   │
   ├─ Borrow Errors (Borrow Checker)   ← "Use of moved variable"
   │
   ▼
Runtime Execution                      ← "Division by zero"
</div>

<h2>Compiler Errors</h2>

<h3>1. Syntax Errors</h3>
<p>Caught by the Pratt Parser when the code structure is invalid.</p>
<pre><code>fn greet(name: String) {
    println("Hello " + name)
// ERROR: Expected '}' to close function body</code></pre>

<h3>2. Symbol Resolution Errors</h3>
<p>Caught during the two-pass AST traversal. Occurs when using an identifier that hasn't been declared.</p>
<pre><code>let y = x + 1
// ERROR: Undeclared variable: 'x'
//   --> main.kix:1
//    |
// 1  | let y = x + 1
//    |         ^</code></pre>

<h3>3. Type Checker Errors</h3>
<p>Kinetix uses Hindley-Milner type inference (Robinson unification). Type errors occur when constraints cannot be satisfied.</p>
<pre><code>let condition = 42
if condition { // ERROR: Type mismatch: bool vs int (if block requires bool)
    println("yes")
}</code></pre>

<h3>4. Borrow Checker Errors (Memory Safety)</h3>
<p>The MIR pipeline enforces linear types. These prevent use-after-free and double-free vulnerabilities without a garbage collector.</p>

<h4>Use After Move</h4>
<p>Occurs when transferring ownership of a non-copyable type (like <code>str</code> or <code>Array</code>) and then trying to use the original variable.</p>
<pre><code>let name = "Alice"
let a = name        // 'name' is moved here
let b = name        // ERROR: Use of uninitialized or moved variable 'name'</code></pre>
<p><strong>Fix:</strong> Use a borrow (<code>&name</code>) or clone the value.</p>

<h4>Copy of Moved / Borrow of Moved</h4>
<pre><code>let arr = [1, 2, 3]
let moved = arr
let ref = &arr      // ERROR: Borrow of moved variable 'arr'</code></pre>

<h2>Runtime Errors</h2>

<p>Errors that can only be detected while the VM or native binary is executing. Kinetix captures the exact source line number for backtraces.</p>

<table class="api-table">
    <tr><th>Error</th><th>When it occurs</th></tr>
    <tr><td class="code">Division by zero</td><td>Dividing an integer or float by 0</td></tr>
    <tr><td class="code">Index out of bounds</td><td>Accessing an array or string beyond its length</td></tr>
    <tr><td class="code">Stack overflow</td><td>Infinite recursion maxing out CallFrames</td></tr>
    <tr><td class="code">Assertion failed</td><td><code>assert(condition)</code> evaluates to false</td></tr>
    <tr><td class="code">Null dereference</td><td>Attempting to access properties of a <code>null</code> value</td></tr>
</table>

<h2>Future: Result & Option Types</h2>

<div class="note-box">
    <span class="callout-title">Planned Feature (Phase 3)</span>
    Kinetix will introduce <code>Result&lt;T, E&gt;</code> and <code>Option&lt;T&gt;</code> types to replace exceptions with explicit, type-safe error propagation via the <code>?</code> operator.
</div>
    `
});
