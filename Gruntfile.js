'use strict';
module.exports = function(grunt){
    grunt.initConfig({
        jshint: {
            options: { reporter: require('jshint-stylish') },
            files: ['lib/**/*.js','models/**/*.js']
        },
        nsp: {
    		package: grunt.file.readJSON('package.json')
  		},
        watch: {
            files: ['lib/**/*.js','models/**/*.js'],
            tasks: ['jshint']
        },
        nodemon: { dev: { script: 'lib/index.js' } },
        concurrent: {
            dev: [
                'jshint',
                'nsp',                
                'watch',
                'nodemon'
            ],
            options: {
                logConcurrentOutput: true,
                limit: 5
            }
        }
    });

    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks("grunt-contrib-jshint");    
    grunt.loadNpmTasks("grunt-nodemon");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-nsp');
    //Uglifyjs 

    grunt.registerTask('default', [
        'concurrent'
    ]);
}
