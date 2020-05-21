import Alert from "./components/Alert";
import UserItem from "./components/UserItem";
import { NextButton, PrevButton } from "./components/Pagination";
import User from "./components/User";
import Repos from "./components/Repos";
export default class UI {
	constructor() {
		this.uiElements = {
			container: document.querySelector(".container"),
			input: document.querySelector(".search__input"),
			form: document.querySelector(".search"),
			resultList: document.querySelector(".results__list"),
			userList: document.querySelector(".results__users"),
			loadingList: document.querySelector(".loadingspinner-users"),
			loadingUser: document.querySelector(".loadingspinner-user"),
			pagination: document.querySelector(".results__pages"),
			resultPages: document.querySelector(".results__pages"),
			userProfile: document.querySelector(".user__profile"),
			userRepos: document.querySelector(".user__repos"),
			savedUsersField: document.querySelector(".following__user"),
		};
		this.listeners = [];
		this.addEventListener();
	}
	registerListener(listener) {
		this.listeners.push(listener);
	}
	unregisterListener(listener) {
		this.listeners.filter((item) => {
			if (item !== listener) {
				return item;
			}
		});
	}
	addEventListener() {
		this.uiElements.input.addEventListener("input", (e) => {
			this.listeners.forEach((listener) => {
				listener.onInputChange(e.target.value);
			});
		});
		this.uiElements.form.addEventListener("submit", (e) => {
			e.preventDefault();
			this.listeners.forEach((listener) => listener.onSubmit());
		});
		this.uiElements.resultPages.addEventListener("click", (e) => {
			const btn = e.target.closest(".btn-inline");
			if (btn) {
				const goToPage = parseInt(btn.dataset.goto, 10);
				this.listeners.forEach((listener) => {
					listener.onButtonClicked(goToPage);
				});
			}
		});
		this.uiElements.userList.addEventListener("click", (e) => {
			const user = e.target.closest(".results__item");
			if (user) {
				this.listeners.forEach((listener) => {
					listener.onUserClicked(user.lastElementChild.textContent);
				});
			}
		});
		this.uiElements.savedUsersField.addEventListener("click", (e) => {
			const user = e.target.closest(".results__item");
			if (user) {
				this.listeners.forEach((listener) => {
					listener.onUserClicked(user.lastElementChild.textContent);
				});
			}
		});
		this.uiElements.userProfile.addEventListener("click", (e) => {
			if (e.target.textContent === "Follow User") {
				e.preventDefault();
				this.listeners.forEach((listener) => {
					listener.saveUser();
					e.target.textContent = "Unfollow User";
				});
			} else if (e.target.textContent === "Unfollow User") {
				e.preventDefault();
				this.listeners.forEach((listener) => {
					listener.removeUser();
					e.target.textContent = "Follow User";
				});
			}
		});
	}

	showAlert(type, alertMessage) {
		this.uiElements.container.insertAdjacentHTML(
			"afterBegin",
			Alert(type, alertMessage)
		);
	}
	clearAlert() {
		const alert = document.querySelector(".alert");
		if (alert) {
			alert.remove();
		}
	}
	renderUserItem(user) {
		this.uiElements.userList.insertAdjacentHTML(
			"afterBegin",
			UserItem(user.avatar_url, user.login)
		);
	}
	renderSavedUsers(savedUsers) {
		this.uiElements.savedUsersField.innerHTML = "";
		let savedUsersHtml = "";
		savedUsers.forEach((savedUser) => {
			savedUsersHtml += UserItem(savedUser.avatar_url, savedUser.login);
		});
		this.uiElements.savedUsersField.insertAdjacentHTML(
			"afterbegin",
			savedUsersHtml
		);
	}

	renderProfile(user, isSavedUser) {
		this.uiElements.userProfile.insertAdjacentHTML(
			"afterBegin",
			User(
				user.avatar_url,
				user.company,
				user.blog,
				user.location,
				user.created_at,
				user.public_repos,
				user.public_gists,
				user.followers,
				user.following,
				user.html_url,
				isSavedUser
			)
		);
	}
	clearInput() {
		this.uiElements.input.value = "";
	}
	clearProfile() {
		this.uiElements.userProfile.innerHTML = "";
	}

	clearUserItem() {
		this.uiElements.userList.innerHTML = "";
	}
	clearPagination() {
		this.uiElements.pagination.innerHTML = "";
	}
	renderListLoading() {
		this.uiElements.loadingList.classList.toggle("loadingspinner--vis");
	}
	renderUserLoading() {
		this.uiElements.loadingUser.classList.toggle("loadingspinner--vis");
	}

	renderRepos(repos) {
		let repoString = "";
		repos.forEach((repo) => {
			repoString += Repos(
				repo.html_url,
				repo.name,
				repo.stargazers_count,
				repo.watchers,
				repo.forks_count
			);
		});

		this.uiElements.userRepos.insertAdjacentHTML(
			"afterbegin",
			`
		<h1>Latest Repos</h1>
		${repoString}
		`
		);
	}
	clearRepos() {
		this.uiElements.userRepos.innerHTML = ``;
	}

	renderPagination(type, page) {
		let btn;
		if (type === "next") {
			btn = NextButton(page);
		} else {
			btn = PrevButton(page);
		}
		this.uiElements.pagination.insertAdjacentHTML("afterBegin", btn);
	}
}
