var fs = require('fs');

var GulpTaskManager = function() {
	this.load = function(tasks, gulp, config) {
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

	this.isMissingDependencies = function(task) {
		var missingDependencies = [];
		for (var dependency of this[task].dependencies) {
			if (!this[dependency]) {
				missingDependencies.push(dependency);
			}
		}

		return missingDependencies.length ? missingDependencies : false;
	};

	this.addTasks = function(tasks) {
		tasks = Array.isArray(tasks) ? tasks : [].concat(tasks);
		for (var task of tasks) {
			this[task.name] = task.task;
			this[task.name].dependencies = task.dependencies || [];
		}
	};
};

module.exports = new GulpTaskManager();
