App.register('audio', {
    title: 'Audio',
    category: 'Libraries/Multimedia',
    description: 'Low-latency audio engine for playing sounds, music, and synthesized speech.',
    methods: [
        { name: 'play_oneshot', ret: 'void', params: '(path: String)', desc: 'Plays a short sound effect.', example: 'audio.play_oneshot("assets/sfx.wav")', since: 'v0.0.1 (3)' },
        { name: 'play_stream', ret: 'void', params: '(path: String)', desc: 'Streams a music file.', example: 'audio.play_stream("assets/music.mp3")', since: 'v0.0.1 (3)' },
        { name: 'speak', ret: 'void', params: '(text: String)', desc: 'Uses Text-To-Speech engine to speak the text.', example: 'audio.speak("System ready.")', status: 'Not Implemented' },
        { name: 'set_volume', ret: 'void', params: '(vol: float)', desc: 'Sets global volume (0.0 - 1.0).', example: 'audio.set_volume(0.8)', status: 'Not Implemented' },
        { name: 'stop_all', ret: 'void', params: '()', desc: 'Stops all currently playing sounds.', example: 'audio.stop_all()', status: 'Not Implemented' }
    ]
});
