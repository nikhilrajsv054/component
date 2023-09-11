const { app, BrowserWindow, ipcMain} = require('electron')


const fs = require("fs");
const path = require('path')
const isDev = require('electron-is-dev')

require('@electron/remote/main').initialize()

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, "preload.js"),
    }
  })

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )
}

app.on('ready', createWindow);


require('electron-reload')(__dirname, {ignored: [path.join(__dirname, 'data.json')] })

const dataPath = path.join(__dirname, "data.json");
console.log("data-path", dataPath);

ipcMain.on("addPost", (event, updatedTasks) => {

  console.log("UPT", updatedTasks);

  const updatedTasksJSON = JSON.stringify(updatedTasks);

  console.log(updatedTasksJSON);
  fs.writeFile(dataPath, updatedTasksJSON,  "utf8", (err) => {
    if (err) {
      console.error(err);
      event.reply('data-added-error');
    }
    else{
      console.log('tasks updated successfully');
      event.reply('data-added-sucess');
    }
  });
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

