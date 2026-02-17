App.register('compilation', {
    title: 'Compilation Pipeline',
    category: 'Manual/Compilation',
    description: `
        <p>Kinetix supports a dual-target compilation system, allowing developers to choose between rapid iteration and maximum performance.</p>

        <h3>Targets</h3>
        <div class="detail-box">
            <h4>Native (AOT)</h4>
            <p>Compiles Kinetix code via LLVM directly to machine code (x64, ARM64).</p>
            <ul>
                <li><strong>Pros</strong>: Maximum performance, no runtime dependency.</li>
                <li><strong>Cons</strong>: Slower build times.</li>
                <li><strong>Use Case</strong>: Release builds, System tools, High-performance Games.</li>
            </ul>
        </div>

        <div class="detail-box">
            <h4>Virtual Machine (NVM)</h4>
            <p>Compiles to bytecode for the Kinetix Virtual Machine (KiVM).</p>
            <ul>
                <li><strong>Pros</strong>: Instant build times, smaller binaries, cross-platform <code>.exki</code> bundles.</li>
                <li><strong>Cons</strong>: Slight runtime overhead ( mitigated by JIT).</li>
                <li><strong>Use Case</strong>: Scripting, Development iteration, Modding support.</li>
            </ul>
        </div>
    `
});

App.register('bundles', {
    title: '.exki Bundles',
    category: 'Manual/Compilation',
    description: `
        <p>The <strong>Executable Kinetix</strong> (<code>.exki</code>) format is a self-contained distribution format.</p>
        <p>You can also create a <strong>Standalone Executable</strong> (e.g. <code>.exe</code>) that bundles the VM and bytecode together using the <code>--exe</code> flag.</p>
        <pre><code class="language-bash">kivm compile -i game.kix --exe</code></pre>
        
        <h3>Structure</h3>
        <table class="api-table">
            <tr><th>Section</th><th>Description</th></tr>
            <tr><td><strong>Header</strong></td><td>Magic Number (KNTX), Manifest (JSON).</td></tr>
            <tr><td><strong>Assets</strong></td><td>Embedded resources (Textures, Audio) compressed with LZ4.</td></tr>
            <tr><td><strong>Bytecode</strong></td><td>Compiled instructions for the KiVM.</td></tr>
            <tr><td><strong>Symbols</strong></td><td>Debug information and reflection data.</td></tr>
        </table>
    `
});

App.register('optimization', {
    title: 'Optimization Levels',
    category: 'Manual/Compilation',
    description: `
        <h3>Flags</h3>
        <ul>
            <li><code>-O0</code>: No optimization. Fast build, full debug info.</li>
            <li><code>-O1</code>: Basic optimizations (Constant folding, dead code elimination).</li>
            <li><code>-O2</code>: Standard optimizations (Inlining, Loop unrolling).</li>
            <li><code>-O3</code>: Aggressive optimizations (Vectorization, Inter-procedural analysis).</li>
        </ul>
        
        <h3>Linear Type System</h3>
        <p>The compiler enforces linear types to manage memory without a Garbage Collector. This allows for:</p>
        <ul>
            <li>Deterministical destruction.</li>
            <li>Zero-overhead abstractions.</li>
            <li>Safe concurrency (no data races).</li>
        </ul>
    `
});


App.register('nvm_architecture', {
    title: 'KiVM Architecture',
    category: 'Manual/Compilation',
    description: `
        <h3>Core Design</h3>
        <p>The <strong>Kinetix Virtual Machine (KiVM)</strong> is a high-performance, register-based virtual machine designed to execute Kinetix bytecode efficiently across different platforms.</p>
        
        <h4>Register-Based vs Stack-Based</h4>
        <p>Unlike the JVM or CLR which are stack-based, KiVM uses a <strong>register-based architecture</strong>. This design choice:</p>
        <ul>
            <li><strong>Reduces Instruction Count</strong>: Operations don't need to constantly push/pop from a stack.</li>
            <li><strong>Optimizes Memory Access</strong>: Matches modern CPU architecture more closely, allowing better mapping to physical registers.</li>
            <li><strong>Improves JIT Performance</strong>: Simplified data flow analysis for the Just-In-Time compiler.</li>
        </ul>

        <h3>Execution Pipeline</h3>
        <div class="detail-box">
            <ol>
                <li><strong>Loader</strong>: Validates the <code>.exki</code> bundle header and checks the digital signature.</li>
                <li><strong>Verifier</strong>: Performs a linear scan of the bytecode to ensure type safety and memory integrity (Linear Type verification).</li>
                <li><strong>Interpreter</strong>: Starts executing the bytecode immediately using a computed-goto dispatch loop.</li>
                <li><strong>JIT Profiler</strong>: Monitors execution frequencies. When a "hot" function is detected, it is sent to the background JIT compiler.</li>
                <li><strong>Native Switch</strong>: Once JIT compilation is complete, the KiVM patches the function entry point to jump directly to the generated machine code.</li>
            </ol>
        </div>

        <h3>Memory Management</h3>
        <p>The KiVM does <strong>not</strong> use a traditional Tracing Garbage Collector. Instead, it relies on the static analysis performed by the compiler's Linear Type System.</p>
        <ul>
            <li><strong>Deterministic Deallocation</strong>: Memory is freed immediately when the owning variable goes out of scope.</li>
            <li><strong>Region Based</strong>: Temporary objects are often allocated in reusable memory arenas (regions) which are cleared in bulk.</li>
            <li><strong>Reference Counting (Fallback)</strong>: For complex shared structures (e.g. cyclical graphs), a non-atomic RefCount strategy is available as a fallback, but is rarely needed.</li>
        </ul>
`
});

App.register('directives', {
    title: 'Directives',
    category: 'Manual/Compilation',
    description: `
        <p>Directives are special preprocessor instructions that start with <code>#</code>.</p>

        <h3>#include</h3>
        <p>Imports an external file or standard library module.</p>
        <pre><code class="language-rust">#include "utils.nvr"           // Local file
#include &lt;math&gt; as m           // Standard library module with alias</code></pre>

        <h3>#version</h3>
        <p>Declares the minimum build version required to run the script. If the current VM/compiler build is older, a <strong>warning</strong> is emitted at compile time.</p>
        <pre><code class="language-rust">#version 2   // Requires build 2 or later</code></pre>
        <p>This is useful to ensure scripts using newer standard library functions are not accidentally run on older versions.</p>
        <p><strong>Note:</strong> This is a soft check — the script will still compile and run, but a warning is printed to stderr.</p>
`
});
