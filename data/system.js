App.register('system', {
    title: 'System',
    category: 'Libraries/Core',
    description: '<p>The <strong>System</strong> module provides direct access to operating system facilities, hardware information, and process control. It bridges the high-level Kinetix runtime with low-level OS syscalls.</p><p>Use this module to query CPU and memory status, execute shell commands, interact with the clipboard, and obtain platform-specific system information. All functions are available under the <code>system.*</code> namespace.</p>',
    example: `// Get system info
let os = system.os_name()
let cores = system.get_hardware_info().cpu_cores

// Execute specific command based on OS
if os == "Windows" {
    system.shell("cls")
} else {
    system.shell("clear")
}`,
    methods: [
        { name: 'time', ret: 'float', params: '()', desc: 'Returns current timestamp (seconds).', details: 'Uses high-precision monotic clock backing (e.g., QueryPerformanceCounter on Windows). Cannot go backwards.', example: 'let t = system.time()', implemented: 'v0.0.1 (1)' },
        { name: 'sleep', ret: 'void', params: '(ms: int)', desc: 'Sleeps the current thread.', details: 'Blocks the hardware thread. Context switches to OS scheduler.', example: 'system.sleep(1000)', implemented: 'v0.0.1 (1)' },
        { name: 'exit', ret: 'void', params: '(code: int)', desc: 'Terminates the program with the specified exit code.', details: 'By default, exits are graceful (flushing buffers). Force-close if panic.', example: 'system.exit(0)', implemented: 'v0.0.1 (1)' },
        { name: 'cpu_usage', ret: 'float', params: '()', desc: 'Returns current CPU usage percentage (0.0-100.0).', details: 'Samples the CPU load over a 100ms interval. Blocking on first call.', example: 'let usage = system.cpu_usage()', implemented: 'v0.0.1 (3)' },
        { name: 'memory_free', ret: 'int', params: '()', desc: 'Returns available RAM in Megabytes.', details: 'Retrieves physical RAM directly from OS telemetry (sysinfo crate).', example: 'if system.memory_free() < 100 { log("Low RAM") }', implemented: 'v0.0.1 (3)' },
        { name: 'memory_total', ret: 'int', params: '()', desc: 'Returns total installed RAM in Megabytes.', example: 'let total_ram = system.memory_total()', implemented: 'v0.0.1 (3)' },
        { name: 'get_hardware_info', ret: 'Dictionary', params: '()', desc: 'Returns a dictionary containing cpu_model, cpu_cores, gpu_name, etc.', details: 'Dictionary keys: cpu_model, cpu_cores, vendor, ram_total, os_kernel.', example: 'let info = system.get_hardware_info()\nprint(info["cpu_model"])', implemented: 'v0.0.1 (1)' },
        { name: 'os_name', ret: 'String', params: '()', desc: 'Returns the OS name (e.g., "Windows", "Linux", "MacOS").', details: 'Resolved at compile-time if targeting AOT, otherwise resolved via environment probes in VM.', example: 'if system.os_name() == "Windows" { ... }', implemented: 'v0.0.1 (3)' },
        { name: 'os_version', ret: 'String', params: '()', desc: 'Returns the OS version string.', example: 'println(system.os_version()) // "10.0.19045"', implemented: 'v0.0.1 (3)' },
        { name: 'hostname', ret: 'String', params: '()', desc: 'Returns the network hostname of the machine.', example: 'println(system.hostname())', implemented: 'v0.0.1 (3)' },
        { name: 'user_name', ret: 'String', params: '()', desc: 'Returns the current logged-in user name.', details: 'Queries $USER or %USERNAME% depending on environment.', example: 'println("Hello " + system.user_name())', implemented: 'v0.0.1 (3)' },
        { name: 'uptime', ret: 'int', params: '()', desc: 'Returns system uptime in seconds.', example: 'let sec = system.uptime()', implemented: 'v0.0.1 (3)' },
        { name: 'clipboard_set', ret: 'void', params: '(text: String)', desc: 'Sets the system clipboard content.', details: 'Requires OS GUI context. CLI-only environments may throw an error.', example: 'system.clipboard_set("Copied text")', implemented: 'v0.0.1 (1)' },
        { name: 'clipboard_get', ret: 'String', params: '()', desc: 'Gets text from the system clipboard.', details: 'Pulls UTF-8 text from native clipboard buffer.', example: 'let pasted = system.clipboard_get()', implemented: 'v0.0.1 (1)' },
        { name: 'shell', ret: 'String', params: '(cmd: String)', desc: 'Executes a shell command and returns stdout.', details: 'Requires "allow_shell" permission in .ncomp. Internally spawns `cmd.exe` or `sh -c`.', example: 'let files = system.shell("dir")', implemented: 'v0.0.1 (3)' },
        { name: 'gc', ret: 'void', params: '()', desc: 'Forces a garbage collection cycle.', details: 'Only applicable if running in NVM mode with GC enabled. AOT binaries use Borrow Checker determinism and ignore this call.', example: 'system.gc()', implemented: 'v0.0.1 (1)' }
    ],
    properties: [
        { name: 'version', type: 'String', default: '"0.1.0"', desc: 'Kinetix Runtime Version.' },
        { name: 'arch', type: 'String', default: '"x64"', desc: 'Processor architecture.' },
        { name: 'pid', type: 'int', default: '[Process ID]', desc: 'Current Process ID.' }
    ]
});
