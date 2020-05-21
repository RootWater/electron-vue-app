'use strict';

import {
    app,
    protocol,
    BrowserWindow,
    Tray,
    Menu,
    dialog
} from 'electron'
import {
    createProtocol,
    installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'
import path from 'path';

const isDevelopment = process.env.NODE_ENV !== 'production';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{
    scheme: 'app',
    privileges: {
        secure: true,
        standard: true
    }
}]);

// 设置系统托盘
function setAppTray() {
    // 托盘对象
    let appTray = null
    // 系统托盘右键菜单
    const trayMenuTemplate = [{
        label: '关于',
        click: () => {
            dialog.showMessageBoxSync(win, {
                title: '关于软件',
                type: 'info',
                icon: path.join(__dirname, 'tray_favicon.ico'),
                message: ''
            });
        }
    }, {
        label: '退出',
        click: () => {
            app.quit();
            app.quit();
        }
    }];
    // 系统托盘图标目录
    appTray = new Tray(path.join(__dirname, 'tray_favicon.ico'));
    // 图标的上下文菜单
    const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
    // 设置此托盘图标的悬停提示内容
    appTray.setToolTip('提示内容');
    // 设置此图标的上下文菜单
    appTray.setContextMenu(contextMenu);

    appTray.on('click', function () {
        win.show();
    });
}


function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 1200,
        height: 900,
        frame: !!isDevelopment,
        resizable: true,
        webPreferences: {
            nodeIntegration: true
        }
    });

    /* setTimeout(() => {
        setAppTray();
    }, 100); */

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
        if (!process.env.IS_TEST) win.webContents.openDevTools();
    } else {
        createProtocol('app');
        // Load the index.html when not in development
        win.loadURL('app://./index.html');
    }

    win.on('closed', () => {
        win = null;
    });
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        // Devtools extensions are broken in Electron 6.0.0 and greater
        // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
        // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
        // If you are not using Windows 10 dark mode, you may uncomment these lines
        // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
        // try {
        //   await installVueDevtools()
        // } catch (e) {
        //   console.error('Vue Devtools failed to install:', e.toString())
        // }

    }
    createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', data => {
            if (data === 'graceful-exit') {
                app.quit();
            }
        });
    } else {
        process.on('SIGTERM', () => {
            app.quit();
        });
    }
}

import Methods from './ipcMain';

// Process communication, ipcMain: Main process
const {
    ipcMain
} = require('electron');

// Monitoring async-message events.
ipcMain.on('async-msg', async (event, {
    moduleName = '',
    method = '',
    params
}) => {
    let result; // 返回结果
    try {
        result = {
            success: true,
            data: await Methods[moduleName][method](params, win, event)
        };
    } catch (err) {
        result = {
            success: false,
            error: {
                module: `Module: ${moduleName}\r`,
                method: `Method: ${method} error!`,
                message: `Message: ${err.message}`
            }
        };
    }
    event.reply(`${moduleName}-${method}`, result); // 回复响应
});
