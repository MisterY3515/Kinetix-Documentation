App.register('syntax_vectors', {
    title: 'Vector Types',
    category: 'Manual/Syntax',
    description: `
        <p>Kinetix treats vectors as first-class citizens, optimized for SIMD operations. They are value types (stack allocated).</p>

        <h3>Declaration</h3>
        <pre><code class="language-rust">let pos = vec3(10.0, 5.0, 0.0)
let red = vec4(1.0, 0.0, 0.0, 1.0)
let uv  = vec2(0.5, 0.5)</code></pre>

        <h3>Swizzling</h3>
        <p>Access components in any order using xyzw or rgba notation.</p>
        <pre><code class="language-rust">let v = vec3(1, 2, 3)
let v2 = v.xy    // vec2(1, 2)
let v3 = v.zyx   // vec3(3, 2, 1)
let v4 = v.xxxx  // vec4(1, 1, 1, 1)</code></pre>

        <h3>Operators</h3>
        <p>Mathematical operators work component-wise.</p>
        <pre><code class="language-rust">let a = vec3(1, 1, 1)
let b = vec3(2, 2, 2)
let c = a + b      // vec3(3, 3, 3)
let d = a * 2.0    // vec3(2, 2, 2) (Scalar mult)</code></pre>
    `,
    methods: [
        { name: 'dot', ret: 'float', params: '(b: Vector)', desc: 'Dot product method.' },
        { name: 'cross', ret: 'Vector3', params: '(b: Vector3)', desc: 'Cross product method.' },
        { name: 'length', ret: 'float', params: '()', desc: 'Returns vector magnitude.' },
        { name: 'normalized', ret: 'Vector', params: '()', desc: 'Returns unit vector.' }
    ]
});
