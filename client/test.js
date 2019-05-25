const axios = require('axios')

function getProfile() {
	return axios
		.request({
			method: 'get',
			url: 'http://localhost:3000/api/v1/profile/a/'
		})
		.then(response => {
			console.log(response)
		})
		.catch(error => {
			console.log(error)
		})
}

getProfile()
