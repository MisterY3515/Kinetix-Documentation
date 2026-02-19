App.register('cli', {
    title: 'CLI',
    category: 'Tooling',
    description: 'Command Line Interface for managing, compiling, and running Kinetix projects.',
    methods: [
        {
            name: 'exec',
            ret: 'void',
            params: '<file.kix>',
            desc: 'Compiles and runs a Kinetix source file immediately.',
            example: 'kivm exec main.kix',
            since: 'v0.0.1 (1)'
        },
        {
            name: 'run',
            ret: 'void',
            params: '<file.exki>',
            desc: 'Executes a compiled bytecode bundle.',
            example: 'kivm run main.exki',
            since: 'v0.0.1 (1)'
        },
        {
            name: 'compile',
            ret: 'void',
            params: '-i <input> [-o <output>] [--exe]',
            desc: 'Compiles source to bytecode (.exki) or standalone executable (.exe).',
            example: [
                `// Compile to default bytecode (main.exki)
kivm compile -i main.kix`,
                `// Compile to custom output path
kivm compile -i main.kix -o build/game.exki`,
                `// Compile to standalone executable
kivm compile -i main.kix --exe`,
                `// Compile to native object file (LLVM)
kivm compile -i main.kix --native`
            ],
            since: 'v0.0.1 (1)'
        },
        {
            name: 'version',
            ret: 'string',
            params: '',
            desc: 'Displays current version info.',
            example: 'kivm version',
            since: 'v0.0.1 (1)'
        }
    ]
});
