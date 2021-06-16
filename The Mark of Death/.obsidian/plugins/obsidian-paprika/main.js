/*
THIS IS A GENERATED/BUNDLED FILE BY ROLLUP
if you want to view the source visit the plugins github repository
*/

'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

const electronPkg = require("electron");
console.log("🚀 ~ file: index.ts ~ line 2 ~ electronPkg", electronPkg);
const { remote, ipcRenderer } = electronPkg;
const { BrowserWindow, ipcMain } = remote;
class API {
    constructor() {
        this.domain = "https://www.paprikaapp.com";
    }
    request(t) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("🚀 ~ file: index.ts ~ line 9 ~ fetch", t);
            return new Promise((resolve) => {
                const window = new BrowserWindow({
                    width: 1000,
                    height: 600,
                    webPreferences: {
                        webSecurity: false,
                        nodeIntegration: false
                    },
                    show: false
                });
                window.webContents.on("did-finish-load", () => __awaiter(this, void 0, void 0, function* () {
                    console.log("did-finish-load");
                    const result = yield window.webContents.executeJavaScript(() => {
                        var data = "email=emmylou491%40gmail.com&password=angel4591";
                        var xhr = new XMLHttpRequest();
                        xhr.withCredentials = true;
                        xhr.addEventListener("readystatechange", function () {
                            console.log(this.response);
                            if (this.readyState === 4) {
                                console.log(this.responseText);
                            }
                        });
                        xhr.open("POST", "https://vast-woodland-91876.herokuapp.com/https://www.paprikaapp.com/api/v2/account/login/");
                        xhr.setRequestHeader("Origin", "Obsidian Paprika");
                        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                        xhr.send(data);
                        /*                      const myHeaders = new Headers();
                        myHeaders.append("Origin", "Obsidian Paprika");
                        myHeaders.append(
                            "Content-Type",
                            "application/x-www-form-urlencoded"
                        );

                        const urlencoded = new URLSearchParams();
                        urlencoded.append("email", "emmylou491@gmail.com");
                        urlencoded.append("password", "angel4591");

                        const requestOptions: RequestInit = {
                            method: "POST",
                            headers: myHeaders,
                            body: JSON.stringify({
                                email: "emmylou491@gmail.com",
                                password: "angel4591"
                            }),
                            redirect: "follow"
                        };

                        fetch(
                            "https://vast-woodland-91876.herokuapp.com/https://www.paprikaapp.com/api/v2/account/login/",
                            requestOptions
                        )
                            .then((response) => response.text())
                            .then((result) => console.log(result))
                            .catch((error) => console.log("error", error)); */
                    });
                    console.log("🚀 ~ file: index.ts ~ line 21 ~ result", result);
                    window.destroy();
                    resolve(result);
                }));
                window.loadURL("https://github.com");
            });
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const myHeaders = new Headers();
            myHeaders.append("Origin", "Obsidian Paprika");
            //myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
            myHeaders.append("Content-Type", "application/json; charset=UTF-8");
            /* const urlencoded = new URLSearchParams();
            urlencoded.append("email", "emmylou491@gmail.com");
            urlencoded.append("password", "angel4591"); */
            const data = {
                email: "emmylou491@gmail.com",
                password: "angel4591"
            };
            const requestOptions = {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                redirect: "follow",
                referrerPolicy: "no-referrer",
                headers: myHeaders,
                body: JSON.stringify(data)
            };
            fetch("https://vast-woodland-91876.herokuapp.com/https://www.paprikaapp.com/api/v2/account/login/", requestOptions)
                .then((response) => response.text())
                .then((result) => console.log(result))
                .catch((error) => console.log("error", error));
        });
    }
}

const DEFAULT_SETTINGS = {
    mySetting: "default"
};
class PaprikaPlugin extends obsidian.Plugin {
    constructor() {
        super(...arguments);
        this.api = new API();
    }
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("loading plugin");
            yield this.loadSettings();
            this.addSettingTab(new PaprikaSettings(this));
            this.addStatusBarItem().setText("Paprika");
        });
    }
    onunload() {
        console.log("unloading plugin");
    }
    loadSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
        });
    }
    saveSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.saveData(this.settings);
        });
    }
}
class LoginModal extends obsidian.Modal {
    constructor(plugin) {
        super(plugin.app);
        this.plugin = plugin;
    }
    open() {
        super.open();
        return this;
    }
    onOpen() {
        let { contentEl } = this;
        contentEl.empty();
        new obsidian.Setting(contentEl)
            .setHeading()
            .setName("Login")
            .setDesc("Use the email and password you use for Paprika sync.");
        let pw;
        let eml;
        new obsidian.Setting(contentEl).setName("Email").addText((t) => {
            eml = t;
            eml.setPlaceholder("janedoe@example.com");
        });
        new obsidian.Setting(contentEl)
            .setName("Password")
            .setDesc("Please note that the password is not securely stored.")
            .addText((t) => {
            pw = t;
            pw.setPlaceholder("Password");
        });
        new obsidian.Setting(contentEl).addButton((b) => {
            b.setButtonText("Login").onClick(() => __awaiter(this, void 0, void 0, function* () {
                /* if (!eml.inputEl.value || !pw.inputEl.value) {
                    new Notice("Enter an email and password first.");
                    return;
                } */
                /*
                const email = eml.inputEl.value;
                const password = pw.inputEl.value; */
                const email = "emmylou491@gmail.com";
                const password = "angel4591";
                this.plugin.api.login(email, password);
            }));
        });
    }
    onClose() {
        let { contentEl } = this;
        contentEl.empty();
    }
}
class PaprikaSettings extends obsidian.PluginSettingTab {
    constructor(plugin) {
        super(plugin.app, plugin);
        this.plugin = plugin;
    }
    display() {
        let { containerEl } = this;
        containerEl.empty();
        containerEl.createEl("h2", { text: "Paprika" });
        new obsidian.Setting(containerEl).setName("Login to Paprika").addButton((b) => {
            b.setButtonText("Login")
                .setTooltip("Login to Paprika")
                .onClick(() => {
                new LoginModal(this.plugin).open();
            });
        });
    }
}

module.exports = PaprikaPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vb2JzaWRpYW4tcGFwcmlrYS9ub2RlX21vZHVsZXMvdHNsaWIvdHNsaWIuZXM2LmpzIiwiLi4vLi4vLi4vLi4vLi4vb2JzaWRpYW4tcGFwcmlrYS9zcmMvYXBpL2luZGV4LnRzIiwiLi4vLi4vLi4vLi4vLi4vb2JzaWRpYW4tcGFwcmlrYS9zcmMvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6bnVsbCwibmFtZXMiOlsiUGx1Z2luIiwiTW9kYWwiLCJTZXR0aW5nIiwiUGx1Z2luU2V0dGluZ1RhYiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXVEQTtBQUNPLFNBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRTtBQUM3RCxJQUFJLFNBQVMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sS0FBSyxZQUFZLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsVUFBVSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtBQUNoSCxJQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUMvRCxRQUFRLFNBQVMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDbkcsUUFBUSxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxD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
