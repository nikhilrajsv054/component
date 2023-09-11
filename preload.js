const { ipcRenderer, contextBridge } = require("electron");
contextBridge.exposeInMainWorld("api", {
  send: (channel, data) => ipcRenderer.send(channel, data),
  receive: (channel, func) =>
    ipcRenderer.on(channel, (event, ...args) => func(event, args)),
  remove: (channel) => {
    ipcRenderer.removeAllListeners(channel);
  }
});