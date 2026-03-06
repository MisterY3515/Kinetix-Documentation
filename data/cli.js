App.register('cli', {
    title: 'CLI',
    category: 'Tooling',
    description: 'Command Line Interface for managing, compiling, and running Kinetix projects.',
    methods: [
        {
            name: 'init',
            ret: 'void',
            params: '<project_name>',
            desc: 'Inizializza un nuovo progetto Kinetix con scaffolding (project.kicomp e src/main.kix).',
            example: 'kivm init my_app',
            implemented: 'v0.0.9 (33)'
        },
        {
            name: 'build',
            ret: 'void',
            params: '<path/to/project.kicomp>',
            desc: 'Compila l\'intero progetto seguendo le direttive e risolvendo le dipendenze offline.',
            example: 'kivm build project.kicomp',
            implemented: 'v0.0.9 (33)'
        },
        {
            name: 'start',
            ret: 'void',
            params: '<path/to/project.kicomp>',
            desc: 'Compila ed esegue automaticamente il progetto descritto dal .kicomp.',
            example: 'kivm start project.kicomp',
            implemented: 'v0.0.9 (33)'
        },
        {
            name: 'exec',
            ret: 'void',
            params: '<file.kix>',
            desc: '(Legacy) Compila ed esegue un file singolo con permessi globali sbloccati per dev.',
            example: 'kivm exec script.kix',
            implemented: 'v0.0.1 (1)'
        },
        {
            name: 'run',
            ret: 'void',
            params: '<file.exki>',
            desc: 'Esegue un bundle binario compilato.',
            example: 'kivm run main.exki',
            implemented: 'v0.0.1 (1)'
        },
        {
            name: 'compile',
            ret: 'void',
            params: '-i <input> [-o <output>] [--exe]',
            desc: '(Legacy) Compila una singola source in bundle o eseguibile. Sostituito da build per progetti medi.',
            example: [
                `kivm compile -i main.kix`,
                `kivm compile -i main.kix --exe`
            ],
            implemented: 'v0.0.1 (1)'
        },
        {
            name: 'version',
            ret: 'string',
            params: '',
            desc: 'Mostra la versione del sistema Kinetix in esecuzione.',
            example: 'kivm version',
            implemented: 'v0.0.1 (1)'
        }
    ]
});
