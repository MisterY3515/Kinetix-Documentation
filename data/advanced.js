App.register('adv_errors', {
    title: 'Error Handling',
    category: 'Manual/Advanced',
    description: `
        <p>Kinetix avoids exceptions in favor of a <code>Result&lt;T, E&gt;</code> type system, similar to Rust, but with syntactic sugar.</p>

        <h3>The ? Operator</h3>
        <p>Propagates errors automatically.</p>
        <pre><code class="language-rust">fn read_config() -> Result<Config, Error> {
    let file = fs.open("config.json")?
    let data = file.read_all()?
    return parse_json(data)
}</code></pre>

        <h3>Try / Catch</h3>
        <p>Used to handle errors gracefully.</p>
        <pre><code class="language-rust">let res = try {
    risky_operation()?
} catch (e) {
    log(e)
    default_value
}</code></pre>
    `
});

App.register('adv_testing', {
    title: 'Unit Testing',
    category: 'Manual/Advanced',
    description: `
        <p>Tests are built-in. Use the <code>test</code> keyword.</p>
        <pre><code class="language-rust">test "Vector Addition" {
    let a = vec2(1, 1)
    let b = vec2(2, 2)
    assert(a + b == vec2(3, 3), "Math failed")
}</code></pre>
        <p>Run tests via CLI: <code>nvhr test</code>.</p>
    `
});

App.register('adv_ffi', {
    title: 'FFI (C / C++)',
    category: 'Manual/Advanced',
    description: `
        <h3>C Interop</h3>
        <p>Call C functions directly using the <code>extern "C"</code> block.</p>
        <pre><code class="language-rust">extern "C" {
    fn puts(s: *char) -> int
}</code></pre>

        <h3>C++ Interop</h3>
        <p>Kinetix supports zero-overhead C++ binding via the <code>extern "C++"</code> block. You can map classes, inheritance, and templates.</p>
        <pre><code class="language-rust">extern "C++" {
    include "game/player.hpp"

    class Player {
        // Bind Constructor
        fn new(name: String) -> Player
        
        // Bind Methods
        fn set_health(self, hp: int)
        fn get_health(self) -> int
    }
}

let p = Player::new("Hero")
p.set_health(100)</code></pre>
    `
});

App.register('adv_memory', {
    title: 'Memory Model',
    category: 'Manual/Advanced',
    description: `
        <p>Kinetix uses a <strong>Linear Type System</strong> (simplified Ownership) to ensure memory safety without a Garbage Collector.</p>
        <ul>
            <li><strong>Single Owner</strong>: Each resource has one owner.</li>
            <li><strong>Move Semantics</strong>: Assignment transfers ownership.</li>
            <li><strong>Borrowing</strong>: Reference with <code>&</code> (immutable) or <code>mut &</code> (mutable).</li>
        </ul>
    `
});
