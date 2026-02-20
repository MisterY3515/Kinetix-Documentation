// DATA
App.register('data', {
    title: 'Data',
    category: 'Libraries/Data & IO',
    description: 'Raw data manipulation and file system IO.',
    methods: [
        // File IO
        { name: 'read_text', ret: 'String', params: '(path: String)', desc: 'Reads text file.', example: 'let text = data.read_text("config.ini")', status: 'Not Implemented' },
        { name: 'write_text', ret: 'void', params: '(path: String, content: String)', desc: 'Writes text file.', example: 'data.write_text("log.txt", "Error 404")', status: 'Not Implemented' },
        { name: 'read_bytes', ret: 'Buffer', params: '(path: String)', desc: 'Reads binary file.', example: 'let bytes = data.read_bytes("image.png")', status: 'Not Implemented' },
        { name: 'exists', ret: 'bool', params: '(path: String)', desc: 'Checks file existence.', example: 'if data.exists("save.dat") { load() }', status: 'Not Implemented' },
        { name: 'list_dir', ret: 'List<String>', params: '(path: String)', desc: 'Lists directory contents.', example: 'for f in data.list_dir(".") { println(f) }', status: 'Not Implemented' },

        // Buffer Ops
        { name: 'alloc', ret: 'Buffer', params: '(size: int)', desc: 'Allocates memory.', example: 'let buf = data.alloc(1024)', status: 'Not Implemented' },
        { name: 'copy', ret: 'void', params: '(src: Buffer, dest: Buffer)', desc: 'Memcpy.', example: 'data.copy(src_buf, dest_buf)', status: 'Not Implemented' }
    ]
});

// JSON
App.register('json', {
    title: 'JSON',
    category: 'Libraries/Data & IO',
    description: 'Fast JSON serialization/deserialization.',
    methods: [
        { name: 'parse', ret: 'Variant', params: '(text: String)', desc: 'Parses JSON string.', example: 'let obj = json.parse(\'{"a": 1}\')', status: 'Not Implemented' },
        { name: 'stringify', ret: 'String', params: '(val: Variant, pretty: bool = false)', desc: 'Serializes to JSON.', example: 'let str = json.stringify(data, true)', status: 'Not Implemented' }
    ]
});

// CSV
App.register('csv', {
    title: 'CSV',
    category: 'Libraries/Data & IO',
    description: 'CSV file handling.',
    methods: [
        { name: 'parse', ret: 'List<List<String>>', params: '(text: String, delimiter: String = ",")', desc: 'Parses CSV text.', example: 'let rows = csv.parse("a,b,c\\n1,2,3")', status: 'Not Implemented' },
        { name: 'write', ret: 'String', params: '(rows: List<List<String>>)', desc: 'Generates CSV text.', example: 'csv.write([["Name", "Age"], ["Alice", "30"]])', status: 'Not Implemented' }
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
        { name: 'connect', ret: 'Connection', params: '(uri: String)', desc: 'Opens a database connection.', example: 'let db = db.connect("postgres://user:pass@localhost/db")', status: 'Not Implemented' },
        { name: 'query', ret: 'Result', params: '(sql: String, args: List)', desc: 'Executes a query with parameters.', example: 'let res = conn.query("SELECT * FROM items")', status: 'Not Implemented' },
        { name: 'execute', ret: 'int', params: '(sql: String)', desc: 'Executes a statement and returns rows affected.', example: 'conn.execute("DELETE FROM logs")', status: 'Not Implemented' },
        { name: 'prepare', ret: 'Statement', params: '(sql: String)', desc: 'Prepares a statement.', example: 'let stmt = conn.prepare("INSERT INTO users VALUES (?)")', status: 'Not Implemented' }
    ]
});
