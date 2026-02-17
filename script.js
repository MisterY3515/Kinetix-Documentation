// Documentation Content - Godot Style
// Structure:
// {
//    id: string,
//    title: string,
//    category: string,
//    inherit: string (optional),
//    description: html string,
//    properties: [ { type, name, default, desc } ],
//    methods: [ { return_type, name, params, desc } ],
//    signals: [ { name, params, desc } ],
//    constants: [ { name, value, desc } ]
// }

const docsDB = {
    // --- General / Manual ---
    "intro": {
        title: "Introduction to Kinetix",
        category: "Manual",
        description: `
            <p><strong>Kinetix</strong> is a next-generation programming language designed to bridge the gap between Python's readability and C++'s performance.</p>
            <h3>Vision & Scope</h3>
            <p>Kinetix aims to support simple automation scripts while scaling up to professional system software.</p>
            <ul>
                <li><strong>Automation Framework</strong>: Reduces boilerplate for CI/CD and server orchestration. <br><em>Technical: Parser < 50k lines/s with Loop-ahead 1.</em></li>
                <li><strong>Core Engine</strong>: Direct hardware access and simplified ownership memory model. <br><em>Technical: Linear Type System (no GC).</em></li>
                <li><strong>Rapid Tooling</strong>: Single executable (.exn) distribution. <br><em>Technical: Static linking with minimal NVM loader.</em></li>
            </ul>
        `
    },
    "architecture": {
        title: "Architecture & Workflow",
        category: "Manual",
        description: `
            <h3>Compilation Pipeline</h3>
            <ol>
                <li><strong>Lexer/Parser</strong>: Rust-based frontend producing AST.</li>
                <li><strong>Optimized Logic</strong>: Linear Type System checks.</li>
                <li><strong>Modularity</strong>: <code>#include &lt;lib&gt; as l</code> system with Dependency Graph resolution.</li>
            </ol>
            <h3>Execution Modes</h3>
            <ul>
                <li><strong>Native</strong> (Performance): LLVM backend compiles to x64/ARM machine code. SIMD/Vectorization active.</li>
                <li><strong>NVM</strong> (Portable): Register-based Virtual Machine with JIT.</li>
            </ul>
        `
    },
    "build_system": {
        title: "Build System (.ncomp)",
        category: "Manual",
        description: `
            <p><strong>.ncomp</strong> files act as project orchestrators, similar to CMake/Cargo but integrated.</p>
            <pre><code>project("KinetixApp") {
    version: "1.0.0"
    output_type: "nvm"
    entry: "src/main.nvr"
    sandbox: {
        allow_network: true
    }
}</code></pre>
            <p>Features incremental caching and security permission declaration.</p>
        `
    },

    // --- API Reference: Core ---
    "system": {
        title: "System",
        category: "Core API",
        description: "Provides access to hardware resources, OS information, and process management. Interacts directly with OS Syscalls (WinAPI/POSIX).",
        methods: [
            { return_type: "float", name: "cpu_usage", params: "()", desc: "Returns current CPU load (0.0 - 100.0)." },
            { return_type: "int", name: "memory_free", params: "()", desc: "Returns available RAM in megabytes." },
            { return_type: "Dictionary", name: "get_hardware_info", params: "()", desc: "Returns a dictionary with hardware specs." },
            { return_type: "String", name: "shell", params: "(cmd: String)", desc: "Executes a shell command and returns output." },
            { return_type: "void", name: "log", params: "(msg: String)", desc: "Prints to system console/log." }
        ]
    },
    "math": {
        title: "Math",
        category: "Core API",
        description: "Math library with AVX/NEON SIMD acceleration.",
        constants: [
            { name: "PI", value: "3.14159...", desc: "Circle constant." },
            { name: "TAU", value: "6.28318...", desc: "2 * PI." }
        ],
        methods: [
            { return_type: "float", name: "sin", params: "(rad: float)", desc: "Sine function." },
            { return_type: "float", name: "sqrt", params: "(val: float)", desc: "Square root." },
            { return_type: "float", name: "distance", params: "(a: Vector3, b: Vector3)", desc: "Euclidean distance." }
        ]
    },
    "thread": {
        title: "Thread",
        category: "Core API",
        description: "Manages concurrency using a <strong>Work Stealing Thread Pool</strong> model.",
        methods: [
            { return_type: "Task", name: "run", params: "(callback: fn)", desc: "Spawns a task on a worker thread." },
            { return_type: "void", name: "sleep", params: "(ms: int)", desc: "Yields execution." }
        ]
    },

    // --- API Reference: Multimedia ---
    "graph": {
        title: "Graph",
        category: "Multimedia API",
        description: "UI and 2D Graphics module. Uses 'Dirty Region' rendering logic and hardware acceleration (Vulkan/DX).",
        methods: [
            { return_type: "Window", name: "window", params: "(title: String, width: int)", desc: "Creates a new window." },
            { return_type: "Label", name: "label", params: "(text: String)", desc: "Creates a text label." },
            { return_type: "Button", name: "button", params: "(text: String, callback: fn)", desc: "Creates a clickable button." }
        ]
    },
    "game": {
        title: "Game",
        category: "Multimedia API",
        description: "High-performance Game Engine with Godot GDExtension bridge.",
        methods: [
            { return_type: "void", name: "init", params: "(title: String)", desc: "Initializes engine context." },
            { return_type: "void", name: "loop", params: "(callback: fn)", desc: "Starts main loop." },
            { return_type: "Sprite", name: "sprite_load", params: "(path: String)", desc: "Loads asset." },
            { return_type: "void", name: "physics_enable", params: "(gravity: float)", desc: "Enables physics engine." },
            { return_type: "void", name: "gdscript_export", params: "(name: String, func: fn)", desc: "Exports a Kinetix function to Godot." }
        ],
        signals: [
            { name: "on_collision", params: "(body: Node)", desc: "Emitted when physics bodies collide." },
            { name: "on_ready", params: "()", desc: "Emitted when scene is ready." }
        ]
    },

    // --- API Reference: Data ---
    "data": {
        title: "Data",
        category: "Data API",
        description: "File IO using memory mapping (mmap) for speed.",
        methods: [
            { return_type: "Buffer", name: "alloc", params: "(size: int)", desc: "Allocates raw memory buffer." },
            { return_type: "String", name: "read", params: "(path: String)", desc: "Reads file content." }
        ]
    },
    "db": {
        title: "DB",
        category: "Data API",
        description: "Database connectivity (SQLite/Postgres).",
        methods: [
            { return_type: "Connection", name: "connect", params: "(uri: String)", desc: "Connects to database." },
            { return_type: "Result", name: "query", params: "(sql: String)", desc: "Executes SQL query." }
        ]
    },

    // --- API Reference: Net ---
    "net": {
        title: "Net",
        category: "Network API",
        description: "Asynchronous Networking based on epoll/iocp.",
        methods: [
            { return_type: "Response", name: "get", params: "(url: String)", desc: "HTTP GET." },
            { return_type: "Socket", name: "websocket_connect", params: "(url: String)", desc: "Opens WebSocket." }
        ]
    }
};

// --- Rendering Logic ---

document.addEventListener("DOMContentLoaded", () => {
    buildSidebar();
    loadPage("intro");

    document.getElementById("search-input").addEventListener("input", (e) => filterSidebar(e.target.value));
});

function buildSidebar() {
    const tree = document.getElementById("nav-tree");
    const categories = {};

    // Group by category
    for (const [key, data] of Object.entries(docsDB)) {
        if (!categories[data.category]) categories[data.category] = [];
        categories[data.category].push({ key, title: data.title });
    }

    // Render
    for (const [cat, items] of Object.entries(categories)) {
        const header = document.createElement("div");
        header.className = "nav-header";
        header.innerText = cat;
        tree.appendChild(header);

        items.forEach(item => {
            const link = document.createElement("div");
            link.className = "nav-item";
            link.innerText = item.title;
            link.dataset.key = item.key;
            link.onclick = () => {
                document.querySelectorAll(".nav-item").forEach(i => i.classList.remove("active"));
                link.classList.add("active");
                loadPage(item.key);
            };
            tree.appendChild(link);
        });
    }
}

function loadPage(key) {
    const data = docsDB[key];
    const content = document.getElementById("content");
    content.innerHTML = "";

    // Title & Desc
    const h1 = document.createElement("h1");
    h1.innerText = data.title;
    content.appendChild(h1);

    // Inheritance (if any)
    if (data.inherit) {
        const inh = document.createElement("div");
        inh.className = "inheritance-tree";
        inh.innerText = "Inherits: " + data.inherit;
        content.appendChild(inh);
    }

    const desc = document.createElement("div");
    desc.innerHTML = data.description;
    content.appendChild(desc);

    // --- Constants ---
    if (data.constants && data.constants.length > 0) {
        content.appendChild(createSectionHeader("Constants"));
        content.appendChild(createTable(data.constants, [
            { name: "Name", field: "name", class: "prop-name" },
            { name: "Value", field: "value", class: "code" },
            { name: "Description", field: "desc" }
        ]));
    }

    // --- Properties ---
    if (data.properties && data.properties.length > 0) {
        content.appendChild(createSectionHeader("Properties"));
        content.appendChild(createTable(data.properties, [
            { name: "Type", field: "type", class: "return-type" },
            { name: "Name", field: "name", class: "prop-name" },
            { name: "Default", field: "default" },
            { name: "Description", field: "desc" }
        ]));
    }

    // --- Methods ---
    if (data.methods && data.methods.length > 0) {
        content.appendChild(createSectionHeader("Methods"));
        content.appendChild(createTable(data.methods, [
            { name: "Return", field: "return_type", class: "return-type" },
            { name: "Name", field: "name", class: "func-name" },
            { name: "Parameters", field: "params", class: "code" },
            { name: "Description", field: "desc" }
        ]));
    }

    // --- Signals ---
    if (data.signals && data.signals.length > 0) {
        content.appendChild(createSectionHeader("Signals"));
        content.appendChild(createTable(data.signals, [
            { name: "Name", field: "name", class: "func-name" },
            { name: "Parameters", field: "params", class: "code" },
            { name: "Description", field: "desc" }
        ]));
    }

    // --- Detailed Descriptions ---
    // (Optional: Generate expanded details if needed, for now table is enough)
}

function createSectionHeader(text) {
    const h2 = document.createElement("h2");
    h2.innerText = text;
    return h2;
}

function createTable(data, columns) {
    const table = document.createElement("table");
    table.className = "api-table";

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    columns.forEach(col => {
        const th = document.createElement("th");
        th.innerText = col.name;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    data.forEach(item => {
        const row = document.createElement("tr");
        columns.forEach(col => {
            const td = document.createElement("td");
            if (col.class) {
                if (col.class.includes("code")) td.innerHTML = `<code>${item[col.field]}</code>`;
                else td.innerHTML = `<span class="${col.class}">${item[col.field]}</span>`;
            } else {
                td.innerText = item[col.field];
            }
            row.appendChild(td);
        });
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    return table;
}

function filterSidebar(query) {
    const items = document.querySelectorAll(".nav-item");
    query = query.toLowerCase();
    items.forEach(item => {
        if (item.innerText.toLowerCase().includes(query)) item.style.display = "block";
        else item.style.display = "none";
    });
}
