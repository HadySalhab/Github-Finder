export default class App {
	constructor(ui, github, localStorage) {
		this.ui = ui;
		this.localStorage = localStorage;
		this.github = github;
		ui.registerListener(this);
		this.state = {
			page: 1,
			loading: false,
			users: [],
			input: "",
			currentUser: null,
			savedUsers: this.localStorage.getUsers(),
		};
		this.resPerPage = 10;
		this.ui.renderSavedUsers(this.localStorage.getUsers());
	}
	setState(newDataState) {
		this.state = { ...this.state, ...newDataState };
	}

	onInputChange(value) {
		this.setState({
			input: value,
		});
	}

	//pagination btn
	onButtonClicked(goToPage) {
		this.setState({
			page: goToPage,
		});

		this.ui.clearUserItem();
		this.evalResultsAndRender();
		this.evalPaginationAndRender();
	}

	//on userItem clicked
	async onUserClicked(name) {
		if (
			(this.state.currentUser !== null &&
				this.state.currentUser.login === name) ||
			this.state.loading === true
		) {
			return;
		}

		this.ui.clearProfile();
		this.ui.clearRepos();
		this.setState({
			loading: true,
		});
		this.ui.renderUserLoading();
		const { profile, repos } = await this.github.getUser(name);
		this.setState({
			currentUser: profile,
		});
		this.setState({
			loading: false,
		});

		//if saved (render unfollow btn otherwise render follow)
		const isSavedUser = this.checkIsSavedUser();
		this.ui.renderUserLoading();
		this.ui.renderProfile(profile, isSavedUser);
		this.ui.renderRepos(repos);
	}
	//verify if user is already in local storage
	checkIsSavedUser() {
		let isSaved = false;
		const currUser = this.state.currentUser;
		this.state.savedUsers.forEach((savedUser) => {
			if (savedUser.login === currUser.login) {
				isSaved = true;
				return;
			}
		});
		return isSaved;
	}
	//save user from local storage and update ui
	saveUser() {
		this.localStorage.saveUser(this.state.currentUser);
		this.setState({
			savedUsers: this.localStorage.getUsers(),
		});
		this.ui.renderSavedUsers(this.state.savedUsers);
		this.ui.clearAlert();
		this.ui.showAlert("success", "User is saved");
		setTimeout(() => {
			this.ui.clearAlert();
		}, 2000);
	}

	//remove user from local storage and update ui
	removeUser() {
		this.localStorage.deleteUser(this.state.currentUser);
		this.setState({
			savedUsers: this.localStorage.getUsers(),
		});
		this.ui.renderSavedUsers(this.state.savedUsers);
		this.ui.clearAlert();
		this.ui.showAlert("success", "User is removed");
		setTimeout(() => {
			this.ui.clearAlert();
		}, 2000);
	}

	async onSubmit() {
		const inputValue = this.state.input;
		this.ui.clearInput();
		this.setState({
			input: "",
		});
		// if user input query
		if (inputValue) {
			this.ui.renderListLoading();
			this.setState({
				loading: true,
			});
			let users;
			try {
				users = await this.github.searchUsers(inputValue);
			} catch (err) {
				//error response
				this.ui.renderListLoading();
				this.ui.clearAlert();
				this.ui.showAlert("fail", "Check Network Connection");
				setTimeout(() => {
					this.ui.clearAlert();
				}, 2000);
				this.setState({
					loading: false,
				});
				return;
			}

			//empty response
			if (users.length === 0) {
				this.ui.renderListLoading();
				this.setState({
					loading: false,
				});
				this.ui.clearAlert();
				this.ui.showAlert("info", "Can't Find Your Request");
				setTimeout(() => {
					this.ui.clearAlert();
				}, 2000);
				return;
			}

			//success
			this.setState({
				users,
				loading: false,
				page: 1,
			});
			this.ui.clearUserItem();
			this.ui.renderListLoading();
			this.evalResultsAndRender();
			this.evalPaginationAndRender();
		}
		//no input
		else {
			this.ui.clearAlert();
			this.ui.showAlert("info", "	Please input user name before submit");
			setTimeout(() => {
				this.ui.clearAlert();
			}, 2000);
		}
	}

	evalResultsAndRender() {
		const newUsers = this.evalUsers();
		newUsers.forEach((user) => {
			this.ui.renderUserItem(user);
		});
	}

	evalUsers() {
		const { page, users } = this.state;
		const start = (page - 1) * this.resPerPage;
		const end = page * this.resPerPage;
		return users.slice(start, end);
	}

	evalPaginationAndRender() {
		this.ui.clearPagination();
		const { page, users } = this.state;
		const numResults = users.length;
		const pages = Math.ceil(numResults / this.resPerPage);
		if (page === 1 && pages > 1) {
			this.ui.renderPagination("next", page + 1);
		} else if (page < pages) {
			this.ui.renderPagination("next", page + 1);
			this.ui.renderPagination("prev", page - 1);
		} else if (page === pages && pages > 1) {
			this.ui.renderPagination("prev", page - 1);
		}
	}
}
