export default {
	get(path, params = {}) {
		return new Promise((resolve, reject) => {
			window.axios.get(path, {params})
				.then(function (response) {
					resolve(response);
				})
				.catch(function (error) {
					reject(error);
				});
		});
	},
	post(path, data) {
		return new Promise((resolve, reject) => {
			window.axios.post(path, data)
				.then(function (response) {
					resolve(response);
				})
				.catch(function (error) {
					reject(error);
				});
		});
	},
}
