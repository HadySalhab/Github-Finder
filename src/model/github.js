import axios from "axios";
export default class Github {
	constructor() {
		this.client_id = "db73b0b76d617730cacd";
		this.client_secret = "95a6bc85a95e01ca0deff2f4441d7518441d08e1";
		this.repos_count = 5;
		this.repos_sort = "created: asc";
	}

	async searchUsers(query) {
		const res = await axios.get(
			`https://api.github.com/search/users?q=${query}&client_id=${this.client_id}&client_secret=${this.client_secret}`
		);

		const users = await res.data.items;
		console.log(users);
		return users;
	}
	async getUser(user) {
		const profileResponse = await axios.get(
			`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`
		);
		const repoResponse = await axios.get(
			`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`
		);
		const profile = await profileResponse.data;
		const repos = await repoResponse.data;
		return {
			profile,
			repos,
		};
	}
}
