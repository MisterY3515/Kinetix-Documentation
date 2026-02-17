// THREAD
App.register('thread', {
    title: 'Thread',
    category: 'Libraries/Core',
    description: 'Parallel execution and concurrency tools. Uses a work-stealing thread pool.',
    methods: [
        { name: 'run', ret: 'Future<Variant>', params: '(task: Function)', desc: 'Runs a function in a background thread.', example: 'thread.run(fn() { process_data() })', status: 'Not Implemented' },
        { name: 'sleep', ret: 'void', params: '(ms: int)', desc: 'Pauses the current thread.', example: 'thread.sleep(1000)', status: 'Not Implemented' },
        { name: 'parallel_for', ret: 'void', params: '(range: Range, task: Function)', desc: 'Executes loop iterations in parallel.', example: 'thread.parallel_for(0..100, fn(i) { compute(i) })', status: 'Not Implemented' }
    ]
});

// ENV
App.register('env', {
    title: 'Env',
    category: 'Libraries/Core',
    description: 'Environment variables and runtime settings.',
    methods: [
        { name: 'get', ret: 'String', params: '(key: String)', desc: 'Gets an environment variable.', example: 'let path = env.get("PATH")', status: 'Not Implemented' },
        { name: 'set', ret: 'void', params: '(key: String, val: String)', desc: 'Sets an environment variable for the current process.', example: 'env.set("MY_VAR", "1")', status: 'Not Implemented' },
        { name: 'args', ret: 'List<String>', params: '()', desc: 'Returns command line arguments.', example: 'let file = env.args()[1]', status: 'Not Implemented' }
    ]
});

// TIME
App.register('time', {
    title: 'Time',
    category: 'Libraries/Core',
    description: 'High-precision timing and clock functions.',
    methods: [
        { name: 'now', ret: 'float', params: '()', desc: 'Returns current timestamp in seconds (high precision).', example: 'let start = time.now()', status: 'Not Implemented' },
        { name: 'sleep', ret: 'void', params: '(duration: float, unit: String = "s")', desc: 'Sleeps for the specified duration.', example: 'time.sleep(0.5, "s")', status: 'Not Implemented' },
        { name: 'ticks', ret: 'int', params: '()', desc: 'Returns CPU ticks or milliseconds since start.', example: 'let t = time.ticks()', status: 'Not Implemented' }
    ]
});
