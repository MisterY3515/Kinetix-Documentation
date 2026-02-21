// NETWORK
App.register('net', {
    title: 'Net',
    category: 'Libraries/Network',
    description: '<p>The <strong>Net</strong> module provides asynchronous networking capabilities for HTTP/1.1, HTTP/2, and WebSocket protocols. Use it to make API requests, download files, and build client-server applications.</p><p>All network operations return <code>Future</code> values and should be used with <code>await</code>. Server features (TCP listeners, WebSocket servers) are planned for a future release.</p>',
    methods: [
        { name: 'get', ret: 'Future<Response>', params: '(url: String)', desc: 'Async GET request.', example: 'let res = await net.get("https://api.site.comv/data")', implemented: 'v0.0.1 (3)' },
        { name: 'post', ret: 'Future<Response>', params: '(url: String, body: Variant)', desc: 'Async POST request.', example: 'let res = await net.post("https://api.site.com/submit", { "id": 1 })', implemented: 'v0.0.1 (3)' },
        { name: 'download', ret: 'Future<File>', params: '(url: String, dest: String)', desc: 'Downloads a file.', example: 'await net.download("https://site.com/file.zip", "local.zip")', implemented: 'v0.0.1 (3)' },
        { name: 'server_create', ret: 'Server', params: '(port: int)', desc: 'Creates a TCP/HTTP server.', example: 'let server = net.server_create(8080)', status: 'Not Implemented' },
        { name: 'socket_connect', ret: 'Socket', params: '(addr: String)', desc: 'Opens a raw TCP connection.', example: 'let sock = net.socket_connect("127.0.0.1:9000")', status: 'Not Implemented' },
        { name: 'socket_bind', ret: 'Socket', params: '(addr: String)', desc: 'Binds a raw TCP socket for listening.', example: 'let server = net.socket_bind("0.0.0.0:8080")', status: 'Not Implemented' },
        { name: 'udp_bind', ret: 'UdpSocket', params: '(addr: String)', desc: 'Binds a UDP socket.', example: 'let udp = net.udp_bind("0.0.0.0:5000")', status: 'Not Implemented' },
        { name: 'udp_send', ret: 'void', params: '(sock: UdpSocket, addr: String, data: Buffer)', desc: 'Sends UDP packet.', example: 'net.udp_send(sock, "192.168.1.5:5000", data)', status: 'Not Implemented' },
        { name: 'dns_lookup', ret: 'List<String>', params: '(host: String)', desc: 'Resolves hostname to IP addresses.', example: 'let ips = net.dns_lookup("google.com")', status: 'Not Implemented' }
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
