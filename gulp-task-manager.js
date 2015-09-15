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
	tasks = Array.isArray(tasks) ? tasks : [].concat(tasks);

	for (var task of tasks) {
		if (typeof(this[task]) === "function") {
			var missingTasks = this.isMissingDependencies(task);

			if (missingTasks) {
				for (var missingTask of missingTasks) {
					console.log("Missing task: " + missingTask);
				}
			} else {
				this[task](gulp, config);
			}
		} else {
			console.log("Missing task: " + task);
		}
	}
};


GulpTaskManager.prototype.isMissingDependencies = function(task) {
	if(!this[task].dependencies) {
		return false;
	}
	var missingDependencies = [];
	for (var dependency of this[task].dependencies) {
		if (!this[dependency]) {
			missingDependencies.push(dependency);
		}
	}

	return missingDependencies.length ? missingDependencies : false;
};

GulpTaskManager.prototype.addTasks = function(tasks) {
	tasks = Array.isArray(tasks) ? tasks : [].concat(tasks);
	for (var task of tasks) {
		this[task.name] = task.task;
		this[task.name].dependencies = task.dependencies || [];
	}
};

module.exports = GulpTaskManager;
