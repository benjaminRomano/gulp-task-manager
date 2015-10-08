var fs = require('fs');

var GulpTaskManager = function(path) {
	this.tasks = {};

	if (!path) {
		return;
	}

	var tasks = [];
	path = path.slice(-1) === '/' ? path : path + '/';

	fs.readdirSync(path).forEach(function(file) {
		tasks.push(require(path + file));
	});

	this.addTasks(tasks);
};

GulpTaskManager.prototype.load = function(tasks, gulp, config) {
	var self = this;

	tasks.forEach(function(task){
		if (typeof(self[task]) === "function") {
			var missingTasks = self.isMissingDependencies(task);

			if (missingTasks) {
				missingTasks.forEach(function(missingTask){
					console.log("Missing task: " + missingTask);
				});
			} else {
				self[task](gulp, config);
			}
		} else {
			console.log("Missing task: " + task);
		}
	});
};

GulpTaskManager.prototype.isMissingDependencies = function(task) {
    var missingDependencies = [];
    var self = this;
    this[task].dependencies.forEach(function(dependency){
        if (!self[dependency]) {
            missingDependencies.push(dependency);
        }
    });
    return missingDependencies.length ? missingDependencies : false;
};

GulpTaskManager.prototype.addTasks = function(tasks) {
    tasks = Array.isArray(tasks) ? tasks : [].concat(tasks);
    var self = this;

    tasks.forEach(function(task){
        self[task.name] = task.task;
        self[task.name].dependencies = task.dependencies || [];
    });

};

module.exports = GulpTaskManager;
