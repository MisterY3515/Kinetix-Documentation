// Chapter: Reactive System
// Phase 3 GUI Reactivity Core

App.register('reactive', {
    title: 'Reactive System',
    category: 'Manual',
    order: 4,
    description: `
<p>Kinetix introduces a native, zero-overhead Reactive System designed to power modern UI frameworks and state-driven applications directly from the language core. Unlike external libraries (like React or Vue in JS), Kinetix's reactivity is analyzed statically at compile-time.</p>

<h2>Core Concepts</h2>
<p>There are three pillars of the Kinetix Reactive System:</p>
<ol>
    <li><code>state</code>: The Source of Truth</li>
    <li><code>computed</code>: Derived Declarative State</li>
    <li><code>effect</code>: Side-Effects and DOM Syncing</li>
</ol>

<div class="note-box">
    <span class="callout-title">Architecture Guarantee</span>
    Reactive nodes (State, Computed, Effect) are isolated from the canonical SSA graph. They operate as a strictly declarative layer, meaning they do not pollute the imperative core logic, ensuring pure predictability.
</div>

<h3>1. State (<code>state</code>)</h3>
<p>A <code>state</code> declaration creates a reactive variable. When a state variable is mutated via assignment, it notifies the system that any dependent nodes must be updated.</p>

<pre><code>state counter = 0
state username = "Guest"

// Mutating state triggers the reactivity graph
counter = counter + 1
</code></pre>

<h3>2. Computed (<code>computed</code>)</h3>
<p>A <code>computed</code> declaration defines a read-only variable whose value is derived from one or more <code>state</code> variables. The Kinetix compiler statically analyzes the expression to build an exact dependency graph during the <strong>Reactive Graph Extraction</strong> pass.</p>

<pre><code>state price = 100
state tax_rate = 0.2

// 'total' automatically depends on 'price' and 'tax_rate'
computed total = price + (price * tax_rate)
</code></pre>

<div class="tip-box">
    <span class="callout-title">O(N) Optimization</span>
    Computed nodes are evaluated in optimal topological order (Kahn's algorithm) built at compile time. Only computed nodes affected by the specific mutated state will be updated. Cycles are rejected by the compiler.
</div>

<h3>3. Effect (<code>effect</code>)</h3>
<p>An <code>effect</code> is a block of imperative code that runs automatically whenever its dependencies change. This is the bridge between the declarative reactive graph and the imperative world (like updating a UI or saving to a database).</p>

<pre><code>state is_dark_mode = true

effect {
    if is_dark_mode {
        set_theme("dark")
    } else {
        set_theme("light")
    }
}
</code></pre>

<p>The compiler automatically extracts the dependencies from the effect body. In the example above, the effect binds to <code>is_dark_mode</code> implicitly.</p>

<h2>Integration with Classes</h2>
<p>In Phase 3, Kinetix components and classes can leverage reactivity for their properties. Methods mapped to UI events mutate state, which in turn cascades into UI updates gracefully.</p>

<table class="api-table">
    <tr><th>Feature</th><th>Native Implementation</th><th>JS Equivalent (Rough)</th></tr>
    <tr><td><code>state</code></td><td>Zero-cost AST tracking + VM hook</td><td><code>useState()</code> / <code>ref()</code></td></tr>
    <tr><td><code>computed</code></td><td>Compile-time Kahn's topological sort</td><td><code>useMemo()</code> / <code>computed()</code></td></tr>
    <tr><td><code>effect</code></td><td>Implicit dependency resolution block</td><td><code>useEffect()</code> / <code>watchEffect()</code></td></tr>
</table>
    `
});
