// UTILS: Thread, Time, Env, Audio, LLM

App.register('thread', {
    title: 'Thread',
    category: 'Libraries/Core',
    description: 'Concurrency primitives.',
    methods: [
        { name: 'spawn', ret: 'Task', params: '(fn: Function)', desc: 'Spawns a new thread.', example: 'thread.spawn(fn() { println("Async") })', status: 'Not Implemented' },
        { name: 'sleep', ret: 'void', params: '(ms: int)', desc: 'Sleeps the current thread.', example: 'thread.sleep(1000) // 1 second', status: 'Not Implemented' },
        { name: 'lock', ret: 'Mutex', params: '()', desc: 'Creates a mutex.', example: 'let m = thread.lock()', status: 'Not Implemented' },
        { name: 'channel', ret: 'Channel', params: '(capacity: int)', desc: 'Creates a CSP channel.', example: 'let c = thread.channel(10)', status: 'Not Implemented', implemented: 'v0.0.1 (1)' }
    ]
});

App.register('time', {
    title: 'Time',
    category: 'Libraries/Core',
    description: 'Timekeeping.',
    methods: [
        { name: 'now', ret: 'int', params: '()', desc: 'Unix timestamp (seconds).', example: 'let ts = time.now()', status: 'Not Implemented' },
        { name: 'millis', ret: 'int', params: '()', desc: 'Unix timestamp (ms).', example: 'let ms = time.millis()', status: 'Not Implemented' },
        { name: 'micros', ret: 'int', params: '()', desc: 'High-res timer (µs).', example: 'let us = time.micros()', status: 'Not Implemented' },
        { name: 'ticks', ret: 'int', params: '()', desc: 'CPU ticks (RDTSC).', example: 'let t = time.ticks()', status: 'Not Implemented' },
        { name: 'format', ret: 'String', params: '(ts: int, fmt: String)', desc: 'Formats timestamp.', example: 'time.format(time.now(), "%Y-%m-%d")', status: 'Not Implemented' },
        { name: 'parse', ret: 'int', params: '(str: String, fmt: String)', desc: 'Parses timestamp string.', example: 'let ts = time.parse("2023-01-01", "%Y-%m-%d")', status: 'Not Implemented', implemented: 'v0.0.1 (1)' }
    ]
});

App.register('env', {
    title: 'Env',
    category: 'Libraries/Core',
    description: 'Process Environment.',
    methods: [
        { name: 'get', ret: 'String', params: '(key: String)', desc: 'Get env var.', example: 'let path = env.get("PATH")', implemented: 'v0.0.1 (2)' },
        { name: 'set', ret: 'void', params: '(key: String, val: String)', desc: 'Set env var.', example: 'env.set("MY_VAR", "1")', implemented: 'v0.0.1 (2)' },
        { name: 'vars', ret: 'Map<String, String>', params: '()', desc: 'Returns all env vars.', example: 'for (k,v) in env.vars() { ... }', implemented: 'v0.0.1 (2)' },
        { name: 'args', ret: 'List<String>', params: '()', desc: 'Command line arguments.', example: 'let args = env.args()', implemented: 'v0.0.1 (2)' },
        { name: 'cwd', ret: 'String', params: '()', desc: 'Current working directory.', example: 'let dir = env.cwd()', implemented: 'v0.0.1 (3)' },
        { name: 'set_cwd', ret: 'void', params: '(path: String)', desc: 'Change working directory.', example: 'env.set_cwd("/tmp")', implemented: 'v0.0.1 (3)' }
    ]
});

App.register('audio', {
    title: 'Audio',
    category: 'Libraries/Multimedia',
    description: 'Audio engine.',
    methods: [
        { name: 'play_stream', ret: 'Stream', params: '(path: String)', desc: 'Plays music.', example: 'audio.play_stream("music.mp3")', implemented: 'v0.0.1 (3)' },
        { name: 'play_oneshot', ret: 'void', params: '(path: String)', desc: 'Plays sound effect.', example: 'audio.play_oneshot("click.wav")', implemented: 'v0.0.1 (3)' },
        { name: 'set_volume', ret: 'void', params: '(vol: float)', desc: 'Master volume (0.0 - 1.0).', example: 'audio.set_volume(0.8)', status: 'Not Implemented', implemented: 'v0.0.1 (1)' }
    ]
});

App.register('llm', {
    title: 'LLM',
    category: 'Libraries/Integration',
    description: 'Deep Integration with Local/Remote LLMs (Llama, GPT, Claude).',
    example: `let bot = llm.load("llama-3-8b.gguf", gpu_layers: 32)
let stream = bot.generate_stream("Why is the sky blue?")
for token in stream {
    println(token)
}`,
    methods: [
        { name: 'load', ret: 'LLMModel', params: '(path: String, opts: Dictionary)', desc: 'Loads a local model (GGUF).', example: 'llm.load("model.gguf", {})', status: 'Not Implemented' },
        { name: 'connect', ret: 'LLMClient', params: '(provider: String, key: String)', desc: 'Connects to remote API.', example: 'llm.connect("openai", "sk-...")', status: 'Not Implemented' },
        { name: 'generate', ret: 'String', params: '(prompt: String)', desc: 'Blocking text generation.', example: 'let text = model.generate("Hello")', status: 'Not Implemented' },
        { name: 'generate_stream', ret: 'Iterator', params: '(prompt: String)', desc: 'Streaming text generation.', example: 'for t in model.generate_stream("Hi") { ... }', status: 'Not Implemented' },
        { name: 'embed', ret: 'List<float>', params: '(text: String)', desc: 'Get vector embeddings.', example: 'let vec = model.embed("text")', status: 'Not Implemented' }
    ]
});
