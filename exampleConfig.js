module.exports = {
    dev: {
        src: {
            js: '**/*.js',
            css: '**/*.css',
        },
        dest: {
            buildOutput: 'dist/production/'
        }
    },
    production: {
        src: {
            js: '**/*.js',
            css: '**/*.css',
        },
        dest: {
            buildOutput: 'dist/production/'
        }
    }
};
