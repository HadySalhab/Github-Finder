class LocalStorage {
	constructor() {
		this.userKey = "users_key";
	}
	saveUser(user) {
		let users;
		if (localStorage.getItem(this.userKey) === null) {
			users = [];
		} else {
			users = JSON.parse(localStorage.getItem(this.userKey));
		}
		users.push(user);
		localStorage.setItem(this.userKey, JSON.stringify(users));
	}
	deleteUser(user) {
		let users;
		if (localStorage.getItem(this.userKey) === null) {
			users = [];
		} else {
			users = JSON.parse(localStorage.getItem(this.userKey));
		}
		users = users.filter((currUser) => currUser.login !== user.login);
		localStorage.setItem(this.userKey, JSON.stringify(users));
	}
	getUsers() {
		let users;
		if (localStorage.getItem(this.userKey) === null) {
			users = [];
		} else {
			users = JSON.parse(localStorage.getItem(this.userKey));
		}
		return users;
	}
}

export default LocalStorage;
