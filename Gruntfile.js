module.exports = function(grunt) {
    // Read package.json
    grunt.file.readJSON('package.json');


    //Initialize grunt
    grunt.initConfig({
        copy: {
            build: {
                files: [
                    {
                        expand: true,
                        src: ['index.html'],
                        dest: './build',
                        cwd: '.'
                    },
                    {
                        expand: true,
                        src: ['./*.js'],
                        dest: './build/app',
                        cwd: './app'
                    },
                    {
                        expand: true,
                        src: ['./**/*.js'],
                        dest: './build/app',
                        cwd: './app'
                    },
                    {
                        expand: true,
                        src: ['./**/*.html'],
                        dest: './build/app',
                        cwd: './app'
                    },
                    {
                        expand: true,
                        src: ['./resources/css/*.*'],
                        dest: './build',
                        cwd: '.'
                    },
                    {
                        expand: true,
                        src: ['./resources/fonts/*.*'],
                        dest: './build',
                        cwd: '.'
                    },
                    {
                        expand: true,
                        src: ['./resources/images/*.*'],
                        dest: './build',
                        cwd: '.'
                    },
                    {
                        expand: true,
                        src: ['./resources/images/**/*.*'],
                        dest: './build',
                        cwd: '.'
                    },
                    {
                        expand: true,
                        src: ['*.js'],
                        dest: './build/resources/libs',
                        cwd: './resources/libs'
                    }
                ]
            }
        },

        clean: {
            build: {
                src: ['./build']
            },
            stylesheets: {
                src: [ 'build/**/*.css', '!build/resources/app.min.css' ]
            },
            scripts: {
                src: [ 'build/**/*.js', '!build/app/app.min.js' ]
            }
        },

        cssmin: {
            build: {
                files: {
                    'build/resources/app.min.css': [ 'build/**/*.css' ]
                }
            }
        },

        uglify: {
            build: {
                options: {
                    mangle: false
                },
                files: {
                    'build/app/app.min.js': [ 'build/**/*.js' ]
                }
            }
        }
    });

    // load the tasks
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // define the tasks

    grunt.registerTask(
        'build',
        'Compiles all of the assets and copies the files to the build directory.',
        [ 'clean', 'copy', 'cssmin', 'clean:stylesheets', 'uglify', 'clean:scripts' ]
    );
};