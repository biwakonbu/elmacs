/// <reference path="../typings/github-electron/github-electron-main.d.ts" />

import * as app from 'app';
import BrowserWindow = require('browser-window');
import crashReporter = require('crash-reporter');

class MainWindow {
    private window;
    constructor() {
        this.window = new BrowserWindow({ width: 1200, height: 800 });
        this.window.loadUrl('file://' + __dirname + '/../renderer/index.html');
        this.window.on('closed', () => {
            this.window = null;
        });
    }
}

class Application {
    private mainWindow: MainWindow;
    constructor() {
        this.mainWindow = null;
    }

    openMainWindow() {
        this.mainWindow = new MainWindow();
    }
    
    closeMainWindow() {
        this.mainWindow = null;
    }

    onReady() {
        this.setApplicationMenu();
    }

    run() {
        this.startCrashReporter();
        this.onReady();
    }

    setApplicationMenu() {
        app.on('ready', () => {
            this.openMainWindow();
        });
        app.on('closed', () => {
            this.closeMainWindow();
        })
    }

    startCrashReporter() {
        crashReporter.start();
    }
}

var application: Application = new Application();
application.run()