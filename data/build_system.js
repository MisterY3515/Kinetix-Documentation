App.register('build_system', {
    title: 'Build System (.kicomp)',
    category: 'Manual/Compilation',
    description: `
        <p>To manage project complexity, Kinetix introduces <strong>.kicomp</strong> (Kinetix Compilation) configuration files. These files act as orchestrators similar to CMake, but with a simplified syntax integrated into the language.</p>
        
        <p><strong>Technical Detail</strong>: The <code>.kicomp</code> file is parsed by the compiler before every build. It supports intelligent artifact caching to avoid unnecessary recompilations (Incremental Build).</p>

        <h3>Example Project File</h3>
        <pre><code>// project.kicomp
project("KinetixApp") {
    version: "1.0.0"
    author: "Dev"

    // Build Target: native or kivm
    output_type: "kivm"

    // Main Entry Point
    entry: "src/main.kix"

    // External Dependencies (auto-downloaded)
    dependencies: {
        "network": "github.com/kinetix/net-lib@v2",
        "ui_kit": "local/path/to/ui"
    }

    // Security Permissions for .exki bundle
    sandbox: {
        allow_network: true,
        allow_fs_write: ["./logs", "./data"],
        allow_audio: true
    }

    // Optimizations
    optimize: "speed" // options: speed, size, debug
}</code></pre>

        <h3>Explanation</h3>
        <p>The <code>.kicomp</code> file allows you to define project metadata, included source files, external libraries, and <strong>security permissions</strong> in one place. If an app tries to access the network without authorization in the <code>.kicomp</code> file, the KiVM will block execution.</p>
    `
});
