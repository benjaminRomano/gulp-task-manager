# Gulp-task-manager

Gulp Task Manager is a package to help simplify creating guplfiles

* Check out tasks/exampleTask.js for an example on how to create a new task for gulp-task-manager
* Check out exampleConfig.js to see an example config that uses premade tasks

#### Example gulpfile.js
```js
    var gulp = require('gulp');
    var GulpTaskManager = require('gulp-task-manager');
    //Optional: Pass in a path to all your tasks
    var gulpTaskManager = new GulpTaskManager('./tasks');
    var config = require('./exampleConfig');

    gulpTaskManager.addTasks([
        require('./newTask')
    ]);

    //Load only the tasks you need
    gulpTaskManager.load([
        'clean',
        'move-externals'
    ], gulp, config);

    //Create new tasks using tasks from gulp-task-manager
    gulp.task('build', ['clean', 'move-externals']);
```
