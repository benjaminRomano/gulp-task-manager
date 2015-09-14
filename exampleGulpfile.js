var gulp = require('gulp');
var argv = require('yargs').argv;
//Require gulp-task-manager
var gulpTaskManager = require('gulp-task-manager');
var exampleConfig = require('./exampleConfig');

config = !!argv.production ? exampleConfig.production : exampleConfig.dev;

//You can create additional tasks and load them
//It's also possible to override the premade tasks
gulpTaskManager.addTasks([
    require('./task/nonPremadeTask1'),
    require('./task/nonPremadeTask2'),
]);

//Load only the tasks you need
gulpTaskManager.load([
    'clean',
    'move-externals'
], gulp, config);

gulp.task('build', ['clean', 'move-externals']);
