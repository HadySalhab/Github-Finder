import "./scss/main.scss";
import App from "./controller/app";
import UI from "./view/ui";
import LocalStorage from "./model/localStorage";
import Github from "./model/github";
const ui = new UI();
const github = new Github();
const localStorage = new LocalStorage();
const app = new App(ui, github, localStorage);
