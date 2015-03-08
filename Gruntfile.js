module.exports = function(grunt) {


    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-minified');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    
    grunt.registerTask('validate', ['jshint']);  //to run jshint on all javascript files
    grunt.registerTask('package', ['concat', 'minified']);  //to concat all javascript files into 1 .js and then minify using "minified"
    grunt.registerTask('build_all', ['less', 'package', 'validate']); //all tasks


  grunt.initConfig({

	  less: 
	  {
	      development: 
	      {
	        options: 
	        {
	          compress: true,
	          yuicompress: true,
	          optimization: 2
	        },
	        files: 
	        [{
	  				expand: true,
	  				cwd: "bower_components/bootstrap/less",
	  				src: ['**/myd3css.less','**/local.less'],
	  				dest: "www/css/",
	  				ext: ".css"
	        }]
	      }
	  },

	concat: {
	      options: {
              separator: ';',
	      },
	      dist: {
	          src: ['www/js/site.js',' www/js/d3js.js'],  //specify all .js files
 	          dest: 'www/js/libs.js'
	      },
	  },

	 minified : {
	      files: {
	          src: [
                 'www/js/libs.js'
	          ],
	          dest: 'www/js/min/minified.js'
	      },
	      options : {
	          sourcemap: true,
	          allinone: false
	      }
	  },

      jshint: {
            all: ['www/js/test-spec.js', 'www/js/site.js'],

            options: {
              reporter: require('jshint-jenkins-checkstyle-reporter'),
              reporterOutput: 'report-jshint-checkstyle.xml'
          }

           },

           jasmine: {
            all: {
                src: [
                    'www/js/site.js',
                ],
                options: {
                    'vendor':['http://ajax.aspnetcdn.com/ajax/knockout/knockout-2.1.0.js','node-modules/jasmine-check/jasmine-check.js'],
                    'specs': 'www/js/test-spec.js',
                    //'template': require('grunt-template-jasmine-requirejs')
                }
            },

                    istanbul: {
                      src: '<%= jasmine.all.src %>',
                      options: {
                        vendor: '<%= jasmine.all.options.vendor %>',
                        specs: '<%= jasmine.all.options.specs %>',
                        template: require('grunt-template-jasmine-istanbul'),
                        templateOptions: {
                              coverage: 'coverage/json/coverage.json',
                              report: [
                                {type: 'html', options: {dir: 'coverage/html'}},
                                {type: 'cobertura', options: {dir: 'coverage/cobertura'}},
                                {type: 'text-summary'}
                        ]
                    }
                 }
            }
        },

//         requirejs: {
//   compile: {
//     options: {
//       baseUrl: "www/js/test-spec.js",
//       mainConfigFile: "node_modules/jasmine-check/jasmine-check.js",
//       name: "www/js", // assumes a production build using almond 
//       out: "www/js/optimized.js"
//     }
//   }
// }


  });


 
  // This will automatically load any grunt plugin you install, such as grunt-contrib-less.
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

};
