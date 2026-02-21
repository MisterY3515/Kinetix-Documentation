// DATA
App.register('data', {
    title: 'Data',
    category: 'Libraries/Data & IO',
    description: '<p>The <strong>Data</strong> module handles file system I/O, structured data formats, and database access. It provides everything needed to read/write files, parse JSON and CSV, and query SQLite databases — all without external dependencies.</p><p>File operations use Kinetix\'s ownership model: file handles are automatically closed when the owning variable goes out of scope.</p>',
    methods: [
        // File IO
        { name: 'read_text', ret: 'String', params: '(path: String)', desc: 'Reads text file.', details: 'Reads the entire file into a UTF-8 string on the heap. Uses memory-mapped files under the hood for files > 10MB.', example: 'let text = data.read_text("config.ini")', status: 'Not Implemented' },
        { name: 'write_text', ret: 'void', params: '(path: String, content: String)', desc: 'Writes text file.', details: 'Truncates the existing file. Atomic write semantics via temp-file rotation.', example: 'data.write_text("log.txt", "Error 404")', status: 'Not Implemented' },
        { name: 'read_bytes', ret: 'Buffer', params: '(path: String)', desc: 'Reads binary file.', details: 'Returns an ownership-tracked Buffer. No assumed charset encoding.', example: 'let bytes = data.read_bytes("image.png")', status: 'Not Implemented' },
        { name: 'exists', ret: 'bool', params: '(path: String)', desc: 'Checks file existence.', details: 'Only checks existence, not permissions. Vulnerable to TOCTOU if used for security checks.', example: 'if data.exists("save.dat") { load() }', status: 'Not Implemented' },
        { name: 'list_dir', ret: 'List<String>', params: '(path: String)', desc: 'Lists directory contents.', details: 'Returns an iterator over directory entries. Does not recurse automatically.', example: 'for f in data.list_dir(".") { println(f) }', status: 'Not Implemented' },

        // Buffer Ops
        { name: 'alloc', ret: 'Buffer', params: '(size: int)', desc: 'Allocates memory.', details: 'Allocates `size` bytes on the heap. Memory is zero-initialized for safety.', example: 'let buf = data.alloc(1024)', status: 'Not Implemented' },
        { name: 'copy', ret: 'void', params: '(src: Buffer, dest: Buffer)', desc: 'Memcpy.', details: 'Raw memory copy (SIMD accelerated). Bounds checking enforced by the runtime layer.', example: 'data.copy(src_buf, dest_buf)', status: 'Not Implemented' }
    ]
});

// JSON
App.register('json', {
    title: 'JSON',
    category: 'Libraries/Data & IO',
    description: 'Fast JSON serialization/deserialization.',
    methods: [
        { name: 'parse', ret: 'Variant', params: '(text: String)', desc: 'Parses JSON string.', details: 'Zero-copy parsing where possible. Uses rapidjson-like parser internally.', example: 'let obj = json.parse(\'{"a": 1}\')', status: 'Not Implemented' },
        { name: 'stringify', ret: 'String', params: '(val: Variant, pretty: bool = false)', desc: 'Serializes to JSON.', details: 'Handles recursive structures. Cycles throw a serialization error.', example: 'let str = json.stringify(data, true)', status: 'Not Implemented' }
    ]
});

// CSV
App.register('csv', {
    title: 'CSV',
    category: 'Libraries/Data & IO',
    description: 'CSV file handling.',
    methods: [
        { name: 'parse', ret: 'List<List<String>>', params: '(text: String, delimiter: String = ",")', desc: 'Parses CSV text.', details: 'Respects RFC 4180 quotation rules.', example: 'let rows = csv.parse("a,b,c\\n1,2,3")', status: 'Not Implemented' },
        { name: 'write', ret: 'String', params: '(rows: List<List<String>>)', desc: 'Generates CSV text.', details: 'Auto-quotes fields containing delimiters or newlines.', example: 'csv.write([["Name", "Age"], ["Alice", "30"]])', status: 'Not Implemented' }
    ]
});

// DATABASE
App.register('db', {
    title: 'Database',
    category: 'Libraries/Data & IO',
    description: 'SQL Database Interface (SQLite, Postgres, MySQL).',
    example: `let conn = db.connect("sqlite://data.db")
let users = conn.query("SELECT * FROM users WHERE age > ?", [18])`,
    methods: [
        { name: 'connect', ret: 'Connection', params: '(uri: String)', desc: 'Opens a database connection.', details: 'Pools connection automatically. Supports `sqlite://`, `postgres://`, `mysql://`.', example: 'let db = db.connect("postgres://user:pass@localhost/db")', status: 'Not Implemented' },
        { name: 'query', ret: 'Result', params: '(sql: String, args: List)', desc: 'Executes a query with parameters.', details: 'Prepared statement cache automatically prevents SQL injection.', example: 'let res = conn.query("SELECT * FROM items")', status: 'Not Implemented' },
        { name: 'execute', ret: 'int', params: '(sql: String)', desc: 'Executes a statement and returns rows affected.', details: 'Recommended for INSERT, UPDATE, DELETE over `query`.', example: 'conn.execute("DELETE FROM logs")', status: 'Not Implemented' },
        { name: 'prepare', ret: 'Statement', params: '(sql: String)', desc: 'Prepares a statement.', details: 'Returns a pre-compiled execution plan object for high-performance loops.', example: 'let stmt = conn.prepare("INSERT INTO users VALUES (?)")', status: 'Not Implemented' }
    ]
});
