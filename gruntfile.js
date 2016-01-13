module.exports = function(grunt) {
    // Load all tasks
    require('load-grunt-tasks')(grunt);
    // Show elapsed time
    require('time-grunt')(grunt);

    // Modify this list to include or exclude JS you want
    var jsFileList = [
        'assets/vendors/bootstrap/js/*.js',
        'assets/js/*.js'
    ];

    var banner ='/**\n' +
        ' * <%= pkg.displayName %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
        ' * Copyright 2014-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
        ' * Apache 2.0.\n' +
        ' */\n';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /* --- CSS options --- */
        // LESS compiler
        less: {
            options: {
                banner: banner
            },
            dev: {
                options: {
                    compress: false,
                    sourceMap: true
                },
                files: [{
                    expand: true,
                    cwd: 'assets/less/',
                    src: ['public.less'],
                    dest: 'dist/css/',
                    ext: '.css'
                }]
            },
            dist: {
                options: {
                    compress: true,
                    cleancss: true,
                    report: 'gzip'
                },
                files: [{
                    expand: true,
                    cwd: 'assets/less/',
                    src: ['public.less'],
                    dest: 'dist/css/',
                    ext: '.min.css'
                }]
            }
        },
        // Prefix CSS properties for all browsers
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9', 'android 2.3', 'android 4', 'opera 12']
            },
            dev: {
                options: {
                    map: {
                        prev: 'dist/css/'
                    }
                },
                src: 'dist/css/*.css'
            },
            dist: {
                src: 'dist/css/*.min.css'
            }
        },

        /* --- JavaScript options --- */
        // Code quality
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'gruntfile.js',
                'assets/js/*.js'
            ]
        },
        // Concat + minification options
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: [jsFileList],
                dest: 'dist/js/public.js',
            }
        },
        uglify: {
            options: {
                banner: banner
            },
            dev: {
                options: {
                    beautify: true,
                    compress: false,
                    mangle: false,
                    preserveComments: true
                },
                files: {
                    'dist/js/public.js': [jsFileList]
                }
            },
            dist: {
                options: {
                    report: 'gzip',
                    mangle: {
                        except: ['jQuery']
                    }
                },
                files: {
                    'dist/js/public.min.js': [jsFileList]
                }
            }
        },
        modernizr: {
            dist: {
                files: {
                    'src': [
                        ['dist/js/*.js'],
                        ['dist/css/*.css']
                    ]
                },
                dest: 'dist/js/modernizr.min.js',
                uglify: true,
                parseFiles: true
            }
        },

        /* -- Copy vendor resources -- */
        copy: {
            fonts: {
                files: [
                    {
                        expand: true,
                        flattern: true,
                        filter: 'isFile',
                        cwd: 'assets/vendors/font-awesome/fonts/',
                        src: '**',
                        dest: 'dist/fonts/'
                    }
                ]
            }
        },

        /* -- Replace versions accros project (base on verison defined within package.json) -- */
        replace: {
            versionBower: {
                src: ['bower.json'],
                overwrite: true,
                replacements: [{
                    from: /("version":)[^,]+,/g,
                    to: "$1 \"<%= pkg.version %>\","
                }]
            }
        },

        /* --

         /* -- Misc tasks -- */
        watch: {
            less: {
                files: [
                    'assets/less/*.less',
                    'assets/less/**/*.less'
                ],
                tasks: ['less:dev', 'autoprefixer:dev']
            },
            js: {
                files: [
                    jsFileList,
                    '<%= jshint.all %>'
                ],
                tasks: ['jshint', 'concat']
            },
            version: {
                files: [
                    'package.json'
                ],
                tasks: ['replace']
            },
            livereload: {
                // Browser live reloading
                // https://github.com/gruntjs/grunt-contrib-watch#live-reloading
                options: {
                    livereload: false
                },
                files: [
                    'dist/css/public.css',
                    'dist/js/public.js'
                ]
            }
        }
    });

    // Register tasks
    grunt.registerTask('default', [
        'dev'
    ]);
    grunt.registerTask('dev', [
        'jshint',
        'less:dev',
        'autoprefixer:dev',
        'uglify:dev',
        'modernizr',
        'copy'
    ]);
    grunt.registerTask('dist', [
        'jshint',
        'less:dist',
        'autoprefixer:dist',
        'uglify:dist',
        'modernizr',
        'copy',
    ]);
    grunt.registerTask('bump', [
        'replace'
    ]);
};