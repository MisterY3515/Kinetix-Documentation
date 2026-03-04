// NETWORK
App.register('net', {
    title: 'Net',
    category: 'Libraries/Network',
    description: '<p>The <strong>Net</strong> module provides asynchronous networking capabilities for HTTP/1.1, HTTP/2, and WebSocket protocols. Use it to make API requests, download files, and build client-server applications.</p><p>All network operations return <code>Future</code> values and should be used with <code>await</code>. Server features (TCP listeners, WebSocket servers) are planned for a future release.</p>',
    methods: [
        { name: 'http.get', ret: 'Result<Map>', params: '(url: String)', desc: 'Async GET request returning body and status code.', example: 'let res = net.http.get("https://api.site.com/data")', implemented: 'v0.0.1 (3)' },
        { name: 'http.post', ret: 'Result<Map>', params: '(url: String, body: String)', desc: 'Async POST request.', example: 'let res = net.http.post("https://api.site.com/submit", "payload")', implemented: 'v0.0.1 (3)' },
        { name: 'http.download', ret: 'Result<void>', params: '(url: String, dest: String)', desc: 'Downloads a file to disk.', example: 'net.http.download("https://site.com/file.zip", "local.zip")', implemented: 'v0.0.1 (3)' },

        { name: 'tcp.connect', ret: 'Result<Map>', params: '(addr: String, port: int)', desc: 'Connects to a TCP server. Returns Connection ID.', example: 'let c = net.tcp.connect("127.0.0.1", 9000)', implemented: 'v0.0.9 (28)' },
        { name: 'tcp.listen', ret: 'Result<Map>', params: '(port: int)', desc: 'Binds a TCP Listener to a port. Returns Listener ID.', example: 'let l = net.tcp.listen(8080)', implemented: 'v0.0.9 (28)' },
        { name: 'tcp.accept', ret: 'Result<Map>', params: '(listener_id: int)', desc: 'Accepts an incoming TCP connection.', example: 'let conn = net.tcp.accept(l)', implemented: 'v0.0.9 (28)' },
        { name: 'tcp.send', ret: 'Result<void>', params: '(conn_id: int, data: String)', desc: 'Sends data to a TCP connection.', example: 'net.tcp.send(conn, "Hello!")', implemented: 'v0.0.9 (28)' },
        { name: 'tcp.recv', ret: 'Result<Map>', params: '(conn_id: int, max_bytes: int = 4096)', desc: 'Receives data from a TCP connection.', example: 'let msg = net.tcp.recv(conn, 1024)', implemented: 'v0.0.9 (28)' },
        { name: 'tcp.recvLine', ret: 'Result<Map>', params: '(conn_id: int)', desc: 'Receives a line of string delimited by a newline.', example: 'let line = net.tcp.recvLine(conn)', implemented: 'v0.0.9 (28)' },
        { name: 'tcp.close', ret: 'Result<void>', params: '(conn_id: int)', desc: 'Closes a TCP connection.', example: 'net.tcp.close(conn)', implemented: 'v0.0.9 (28)' },

        { name: 'udp.bind', ret: 'Result<Map>', params: '(port: int)', desc: 'Binds a UDP socket.', example: 'let udp = net.udp.bind(5000)', implemented: 'v0.0.9 (28)' },
        { name: 'udp.send', ret: 'Result<Map>', params: '(sock_id: int, addr: String, port: int, data: String)', desc: 'Sends a UDP packet.', example: 'net.udp.send(udp, "192.168.1.5", 5000, "ping")', implemented: 'v0.0.9 (28)' },
        { name: 'udp.recv', ret: 'Result<Map>', params: '(sock_id: int, max_bytes: int = 4096)', desc: 'Receives a UDP packet.', example: 'let pkt = net.udp.recv(udp)', implemented: 'v0.0.9 (28)' },
        { name: 'udp.close', ret: 'Result<void>', params: '(sock_id: int)', desc: 'Closes a UDP socket.', example: 'net.udp.close(udp)', implemented: 'v0.0.9 (28)' },

        { name: 'resolve', ret: 'Result<Map>', params: '(host: String)', desc: 'Resolves hostname to an IP address.', example: 'let ip = net.resolve("google.com")', implemented: 'v0.0.9 (28)' }
    ]
});

// CRYPTO
App.register('crypto', {
    title: 'Crypto',
    category: 'Libraries/Network',
    description: 'Cryptographic primitives (Hashing, Encryption, Random).',
    methods: [
        { name: 'hash', ret: 'String', params: '(data: String, algo: String = "sha256")', desc: 'Computes hash.', example: 'let h = crypto.hash("password123")', implemented: 'v0.0.1 (1)' },
        { name: 'hmac', ret: 'String', params: '(key: String, data: String)', desc: 'Computes HMAC.', example: 'let sig = crypto.hmac("secret", "payload")', implemented: 'v0.0.1 (1)' },
        { name: 'aes_encrypt', ret: 'Buffer', params: '(data: Buffer, key: Buffer, iv: Buffer)', desc: 'AES Encryption.', example: 'let enc = crypto.aes_encrypt(plain, key, iv)', status: 'Not Implemented' },
        { name: 'aes_decrypt', ret: 'Buffer', params: '(data: Buffer, key: Buffer, iv: Buffer)', desc: 'AES Decryption.', example: 'let dec = crypto.aes_decrypt(enc, key, iv)', status: 'Not Implemented' },
        { name: 'random_bytes', ret: 'Buffer', params: '(size: int)', desc: 'Cryptographically secure random number.', example: 'let rnd = crypto.random_bytes(32)', implemented: 'v0.0.1 (1)' },
        { name: 'uuid', ret: 'String', params: '()', desc: 'Generates a UUID v4.', example: 'let id = crypto.uuid()', implemented: 'v0.0.1 (1)' }
    ]
});

// SECURITY
App.register('security', {
    title: 'Security',
    category: 'Libraries/Network',
    description: 'Permissions and sandboxing control. Manages what the script is allowed to do.',
    methods: [
        { name: 'check_permission', ret: 'bool', params: '(perm: String)', desc: 'Checks if a permission is granted.', example: 'if !security.check_permission("net") { return }', status: 'Not Implemented' },
        { name: 'request_permission', ret: 'bool', params: '(perm: String)', desc: 'Requests a permission from the user/OS.', example: 'security.request_permission("fs_read")', status: 'Not Implemented' },
        { name: 'jail', ret: 'void', params: '()', desc: 'Irreversibly drops all privileges for the current process.', example: 'security.jail()', status: 'Not Implemented' }
    ],
    properties: [
        { name: 'is_sandboxed', type: 'bool', default: 'true', desc: 'Assuming true by default in Web/NVM.' }
    ]
});
