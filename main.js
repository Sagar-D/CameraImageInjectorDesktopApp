const express = require("express");
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { electron } = require('process');

let win;

function createWindow () {
    win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        },
        show: false
    })
    //win.webContents.openDevTools();
    win.maximize();
    win.loadFile('index.html');
    win.show();
  }

  app.whenReady().then(() => {
    createWindow()
  })

const expressApp = express();
const port = "3000";
let content = "Image Injected!!";

expressApp.get("/", (req, res) => {
    res.status(200).send(content);
    win.show()
  });

  expressApp.get("/default", (req, res) => {
    res.status(200).send(content);
    win.webContents.send('set_default_image');
    win.show()
  });

  expressApp.get("/qr/:data", (req, res) => {
    res.status(200).send(content);
    win.webContents.send('set_image_qr', req.params.data);
    win.show()
    // setTimeout(() => {
    //     win.webContents.send('set_default_image');
    // },40000)
  });

expressApp.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});