App.register('syntax_func', {
    title: 'Functions',
    category: 'Manual/Syntax',
    description: `
        <h3>Definition</h3>
        <p>Functions are declared with the <code>fn</code> keyword.</p>
        <pre><code class="language-rust">fn add(a: int, b: int) -> int {
    return a + b
}</code></pre>

        <h3>Lambdas & Closures</h3>
        <p>Anonymous functions can capture their environment.</p>
        <pre><code class="language-rust">let multiplier = 2
let double = fn(x) => x * multiplier

let list = [1, 2, 3]
let doubled = list.map(double) // [2, 4, 6]</code></pre>
    `
});

App.register('syntax_oop', {
    title: 'Classes & Structs',
    category: 'Manual/Syntax',
    description: `
        <h3>Structs</h3>
        <p>Data-only structures. Allocated on stack by default.</p>
        <pre><code class="language-rust">struct Vector2 {
    x: float,
    y: float
}

let v = Vector2 { x: 1.0, y: 2.0 }</code></pre>

        <h3>Classes</h3>
        <p>Reference types with methods, inheritance, and encapsulation.</p>
        <pre><code class="language-rust">class Entity {
    mut pos: Vector2;
    
    fn new(x: float, y: float) {
        this.pos = Vector2 { x, y }
    }
    
    fn move(dx: float, dy: float) {
        this.pos.x += dx
        this.pos.y += dy
    }
}

// Inheritance
class Player : Entity {
    fn jump() { ... }
}</code></pre>
    `
});
