App.register('game', {
    title: 'Game',
    category: 'Libraries/Multimedia',
    description: 'High-performance Game Engine with Godot GDExtension integration. Supports 2D/3D physics, sprites, and scene management.',
    methods: [
        // Lifecycle
        { name: 'init', ret: 'void', params: '(config: Dictionary)', desc: 'Initializes the engine.', example: 'game.init({ title: "My Game", width: 1280, height: 720 })', status: 'Not Implemented' },
        { name: 'run', ret: 'void', params: '()', desc: 'Starts the game loop.', example: 'game.run()', status: 'Not Implemented' },
        { name: 'quit', ret: 'void', params: '()', desc: 'Stops the engine.', example: 'game.quit()', status: 'Not Implemented' },

        // Assets
        { name: 'load_texture', ret: 'Texture', params: '(path: String)', desc: 'Loads an image to VRAM.', example: 'let tex = game.load_texture("assets/player.png")', status: 'Not Implemented' },
        { name: 'load_sound', ret: 'Sound', params: '(path: String)', desc: 'Loads an audio clip.', example: 'let sfx = game.load_sound("assets/jump.wav")', status: 'Not Implemented' },
        { name: 'load_font', ret: 'Font', params: '(path: String, size: int)', desc: 'Loads a TTF/OTF font.', example: 'let font = game.load_font("assets/arial.ttf", 24)', status: 'Not Implemented' },

        // Entities
        { name: 'spawn', ret: 'Entity', params: '(prefab: String, pos: Vector3)', desc: 'Instantiates an object.', example: 'let enemy = game.spawn("Enemy", vec3(0, 10, 0))', status: 'Not Implemented' },
        { name: 'destroy', ret: 'void', params: '(entity: Entity)', desc: 'Removes an object.', example: 'game.destroy(enemy)', status: 'Not Implemented' },
        { name: 'find', ret: 'Entity', params: '(name: String)', desc: 'Finds an entity by name.', example: 'let player = game.find("Player")', status: 'Not Implemented' },
        { name: 'find_all', ret: 'List<Entity>', params: '(tag: String)', desc: 'Finds all entities with tag.', example: 'let enemies = game.find_all("Enemy")', status: 'Not Implemented' },

        // Input
        { name: 'key_down', ret: 'bool', params: '(key: KeyCode)', desc: 'True if key is held.', example: 'if game.key_down(Key.W) { move_forward() }', status: 'Not Implemented' },
        { name: 'key_pressed', ret: 'bool', params: '(key: KeyCode)', desc: 'True only on frame of press.', example: 'if game.key_pressed(Key.SPACE) { jump() }', status: 'Not Implemented' },
        { name: 'key_released', ret: 'bool', params: '(key: KeyCode)', desc: 'True only on frame of release.', example: 'if game.key_released(Key.Z) { ... }', status: 'Not Implemented' },
        { name: 'mouse_pos', ret: 'Vector2', params: '()', desc: 'Returns mouse coordinates.', example: 'let m = game.mouse_pos()', status: 'Not Implemented' },
        { name: 'mouse_btn', ret: 'bool', params: '(btn: int)', desc: 'True if mouse button is held (0=Left, 1=Right).', example: 'if game.mouse_btn(0) { fire() }', status: 'Not Implemented' },

        // Physics
        { name: 'raycast', ret: 'RayResult', params: '(origin: Vector3, dir: Vector3, max_dist: float)', desc: 'Casts a physics ray.', example: 'let hit = game.raycast(cam.pos, cam.forward, 100.0)', status: 'Not Implemented' },
        { name: 'sphere_cast', ret: 'RayResult', params: '(origin: Vector3, radius: float, dir: Vector3)', desc: 'Casts a sphere.', example: 'game.sphere_cast(pos, 0.5, dir)', status: 'Not Implemented' },
        { name: 'overlap_sphere', ret: 'List<Entity>', params: '(pos: Vector3, radius: float)', desc: 'Finds entities in radius.', example: 'let hits = game.overlap_sphere(bomb.pos, 5.0)', status: 'Not Implemented' },

        // Time / Utils
        { name: 'delta_time', ret: 'float', params: '()', desc: 'Time in seconds since last frame.', example: 'pos += vel * game.delta_time()', status: 'Not Implemented' },
        { name: 'time', ret: 'float', params: '()', desc: 'Time required since start.', example: 'let t = game.time()', status: 'Not Implemented' },
        { name: 'set_time_scale', ret: 'void', params: '(scale: float)', desc: 'Sets game speed (1.0 = normal).', example: 'game.set_time_scale(0.5) // Slow motion', status: 'Not Implemented' },

        // Godot Bridge
        { name: 'gd_call', ret: 'Variant', params: '(obj: Object, method: String, args: Array)', desc: 'Calls a function on a Godot Object.', example: 'game.gd_call(node, "set_visible", [true])', status: 'Not Implemented' },
        { name: 'gd_get_node', ret: 'Object', params: '(path: String)', desc: 'Gets a node from the Godot scene tree.', example: 'let player_node = game.gd_get_node("/root/Main/Player")', status: 'Not Implemented' }
    ],
    signals: [
        { name: 'ready', params: '()', desc: 'Called when the scene starts.' },
        { name: 'update', params: '(dt: float)', desc: 'Called every frame.' },
        { name: 'physics_update', params: '(dt: float)', desc: 'Called every physics tick.' }
    ]
});
