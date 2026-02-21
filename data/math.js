App.register('math', {
    title: 'Math',
    category: 'Libraries/Core',
    description: '<p>The <strong>Math</strong> module provides mathematical functions, constants, and SIMD-accelerated linear algebra. It includes scalar operations (trigonometry, rounding, clamping), random number generation, and first-class support for vectors, matrices, and quaternions.</p><p>When compiled with the LLVM backend, functions like <code>math.sin</code>, <code>math.cos</code>, <code>math.sqrt</code>, and <code>math.pow</code> compile directly to native <code>libm</code> calls for maximum performance.</p>',
    example: `let v1 = math.vector3(1, 0, 0)
let v2 = math.vector3(0, 1, 0)
let cross = math.cross(v1, v2) // (0, 0, 1)`,
    methods: [
        // Scalar
        { name: 'abs', ret: 'number', params: '(x: number)', desc: 'Absolute value.', details: 'Runtime delegates to native CPU instructions (e.g. FABS on x86).', example: 'math.abs(-5) // 5', implemented: 'v0.0.1 (1)' },
        { name: 'ceil', ret: 'float', params: '(x: float)', desc: 'Rounds up to nearest integer.', details: 'Mapped to IEEE 754 round-to-positive-infinity.', example: 'math.ceil(4.2) // 5.0', implemented: 'v0.0.1 (1)' },
        { name: 'floor', ret: 'float', params: '(x: float)', desc: 'Rounds down to nearest integer.', details: 'Mapped to IEEE 754 round-to-negative-infinity.', example: 'math.floor(4.8) // 4.0', implemented: 'v0.0.1 (1)' },
        { name: 'round', ret: 'float', params: '(x: float)', desc: 'Rounds to nearest integer.', details: 'Uses round-half-away-from-zero rounding mode.', example: 'math.round(4.5) // 5.0', implemented: 'v0.0.1 (1)' },
        { name: 'sin', ret: 'float', params: '(rad: float)', desc: 'Sine of angle in radians.', details: 'Compiles to `llvm.sin.f64` intrinsic in LLVM mode.', example: 'math.sin(math.PI / 2) // 1.0', implemented: 'v0.0.1 (1)' },
        { name: 'cos', ret: 'float', params: '(rad: float)', desc: 'Cosine of angle in radians.', details: 'Compiles to `llvm.cos.f64` intrinsic in LLVM mode.', example: 'math.cos(math.PI) // -1.0', implemented: 'v0.0.1 (1)' },
        { name: 'tan', ret: 'float', params: '(rad: float)', desc: 'Tangent of angle in radians.', details: 'Resolves to `libm` tangent function. Asymptotes handled per IEEE spec.', example: 'math.tan(0) // 0.0', implemented: 'v0.0.1 (1)' },
        { name: 'asin', ret: 'float', params: '(x: float)', desc: 'Arc sine.', details: 'Domain: [-1, 1]. Returns NaN for out-of-bounds inputs.', example: 'math.asin(1.0)', implemented: 'v0.0.1 (2)' },
        { name: 'acos', ret: 'float', params: '(x: float)', desc: 'Arc cosine.', details: 'Domain: [-1, 1]. Returns NaN for out-of-bounds inputs.', example: 'math.acos(0.0)', implemented: 'v0.0.1 (2)' },
        { name: 'atan2', ret: 'float', params: '(y: float, x: float)', desc: 'Arc tangent of y/x.', details: 'Handles appropriate quadrant resolution natively.', example: 'math.atan2(10, 10)', implemented: 'v0.0.1 (2)' },
        { name: 'deg', ret: 'float', params: '(rad: float)', desc: 'Converts radians to degrees.', example: 'math.deg(math.PI) // 180.0', implemented: 'v0.0.1 (2)' },
        { name: 'rad', ret: 'float', params: '(deg: float)', desc: 'Converts degrees to radians.', example: 'math.rad(180.0) // 3.14...', implemented: 'v0.0.1 (2)' },
        { name: 'sqrt', ret: 'float', params: '(x: float)', desc: 'Square root.', details: 'Compiles to hardware `sqrtsd` or equivalent. Returns NaN for x < 0.', example: 'math.sqrt(16) // 4.0', implemented: 'v0.0.1 (1)' },
        { name: 'cbrt', ret: 'float', params: '(x: float)', desc: 'Cube root.', details: 'Handled via libm `cbrt`.', example: 'math.cbrt(27) // 3.0', implemented: 'v0.0.1 (2)' },
        { name: 'pow', ret: 'number', params: '(base: number, exp: number)', desc: 'Power function.', details: 'Type checker automatically promotes int to float if necessary. Uses native `powv`.', example: 'math.pow(2, 3) // 8', implemented: 'v0.0.1 (1)' },
        { name: 'exp', ret: 'float', params: '(x: float)', desc: 'Exponential (e^x).', example: 'math.exp(1) // 2.718...', implemented: 'v0.0.1 (2)' },
        { name: 'log', ret: 'float', params: '(x: float)', desc: 'Natural logarithm (ln).', example: 'math.log(math.E) // 1.0', implemented: 'v0.0.1 (2)' },
        { name: 'log10', ret: 'float', params: '(x: float)', desc: 'Base-10 logarithm.', example: 'math.log10(100) // 2.0', implemented: 'v0.0.1 (2)' },
        { name: 'clamp', ret: 'number', params: '(val: number, min: number, max: number)', desc: 'Clamps value between min and max.', details: 'Implemented natively as `max(min, min(val, max))` to minimize branch prediction misses.', example: 'math.clamp(15, 0, 10) // 10', implemented: 'v0.0.1 (2)' },
        { name: 'lerp', ret: 'float', params: '(a: float, b: float, t: float)', desc: 'Linear interpolation.', details: 'Exact equation: `a + (b - a) * t`. Precise for t=1.', example: 'math.lerp(0.0, 10.0, 0.5) // 5.0', implemented: 'v0.0.1 (2)' },

        { name: 'random', ret: 'float', params: '()', desc: 'Returns a random float between 0.0 and 1.0.', details: 'Uses a thread-local modern PRNG (Xoshiro256++) seeded from OS entropy.', example: 'math.random() // 0.42...', implemented: 'v0.0.1 (1)' },
        { name: 'random_range', ret: 'float', params: '(min: float, max: float)', desc: 'Returns a random float between min and max.', details: 'Uniform distribution. Avoids modulo bias.', example: 'math.random_range(5.0, 10.0)', implemented: 'v0.0.1 (1)' },


        // Vector
        { name: 'vector2', ret: 'Vector2', params: '(x: float, y: float)', desc: 'Creates a 2D vector.', details: 'Allocates a Vector2 struct. Pass-by-value semantics.', example: 'let v = math.vector2(10, 20)', implemented: 'v0.0.1 (2)' },
        { name: 'vector3', ret: 'Vector3', params: '(x: float, y: float, z: float)', desc: 'Creates a 3D vector.', details: 'Memory footprint: 24 bytes (f64 x 3) or 16 bytes (f32 x 3, padded) depending on precision mode.', example: 'let v = math.vector3(1, 0, 0)', implemented: 'v0.0.1 (2)' },
        { name: 'distance', ret: 'float', params: '(a: Vector3, b: Vector3)', desc: 'Euclidean distance.', details: 'Calculates `sqrt(dist_sq)`. Slower than distance_sq due to square root.', example: 'math.distance(v1, v2)', implemented: 'v0.0.1 (2)' },
        { name: 'distance_sq', ret: 'float', params: '(a: Vector3, b: Vector3)', desc: 'Squared distance (faster).', details: 'Avoids `sqrt` calculation. Ideal for comparisons.', example: 'math.distance_sq(v1, v2)', implemented: 'v0.0.1 (2)' },
        { name: 'dot', ret: 'float', params: '(a: Vector3, b: Vector3)', desc: 'Dot product.', details: 'SIMD accelerated if 128-bit registers are available.', example: 'let d = math.dot(up, forward)', implemented: 'v0.0.1 (2)' },
        { name: 'cross', ret: 'Vector3', params: '(a: Vector3, b: Vector3)', desc: 'Cross product.', details: 'Right-handed coordinate system semantics.', example: 'let right = math.cross(forward, up)', implemented: 'v0.0.1 (2)' },
        { name: 'normalize', ret: 'Vector3', params: '(v: Vector3)', desc: 'Returns normalized unit vector.', details: 'Returns generic Error if length is exactly 0.', example: 'let n = math.normalize(v)', implemented: 'v0.0.1 (2)' },
        { name: 'length', ret: 'float', params: '(v: Vector3)', desc: 'Returns vector magnitude.', example: 'math.length(v)', implemented: 'v0.0.1 (2)' },
        { name: 'length_sq', ret: 'float', params: '(v: Vector3)', desc: 'Returns squared magnitude.', example: 'math.length_sq(v)', implemented: 'v0.0.1 (2)' },
        { name: 'reflect', ret: 'Vector3', params: '(dir: Vector3, normal: Vector3)', desc: 'Reflects vector off a normal.', details: 'Equation: `dir - 2 * dot(dir, normal) * normal`. Note: `normal` must be normalized.', example: 'math.reflect(beam, wall_normal)', implemented: 'v0.0.1 (2)' },
        { name: 'refract', ret: 'Vector3', params: '(dir: Vector3, normal: Vector3, eta: float)', desc: 'Refracts vector through surface.', example: 'math.refract(beam, normal, 1.33)', implemented: 'v0.0.1 (2)' },

        // Matrix/Quat
        { name: 'look_at', ret: 'Matrix4', params: '(eye: Vector3, target: Vector3, up: Vector3)', desc: 'Creates a view matrix.', details: 'Generates a right-handed view matrix suitable for OpenGL/Vulkan projection pipelines.', example: 'let view = math.look_at(cam_pos, target, up)', implemented: 'v0.0.1 (2)' },
        { name: 'perspective', ret: 'Matrix4', params: '(fov: float, aspect: float, near: float, far: float)', desc: 'Creates a projection matrix.', details: 'Generates a right-handed perspective projection matrix. Depth range [0, 1].', example: 'let proj = math.perspective(45.0, 16.0/9.0, 0.1, 100.0)', implemented: 'v0.0.1 (2)' },
        { name: 'ortho', ret: 'Matrix4', params: '(l: float, r: float, b: float, t: float, n: float, f: float)', desc: 'Creates an orthographic matrix.', example: 'let ui_proj = math.ortho(0, 800, 600, 0, -1, 1)', implemented: 'v0.0.1 (2)' }
    ],
    properties: [
        { name: 'PI', type: 'float', default: '3.14159...', desc: 'Pi.' },
        { name: 'TAU', type: 'float', default: '6.28318...', desc: 'Tau (2*Pi).' },
        { name: 'INF', type: 'float', default: 'Infinity', desc: 'Positive Infinity.' },
        { name: 'NAN', type: 'float', default: 'NaN', desc: 'Not a Number.' }
    ]
});
