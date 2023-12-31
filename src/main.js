const { app, BrowserWindow, ipcMain, ipcRenderer } = require("electron");
const { autoUpdater } = require("electron-updater");
const path = require("path");

let electron_server = require("update-electron-app")({
  repo: "shaukat456/ElectronApp2",
  updateInterval: "5 minutes",
  logger: require("electron-log"),
});

console.log({ electron_server });

// autoUpdater.setFeedURL("https://github.com/Shaukat456/ElectronAPP.git");
// autoUpdater.downloadUpdate().then((res) => res.map());

// Or MacUpdater, AppImageUpdater

// autoUpdater
//   .checkForUpdatesAndNotify()
//   .then((res) => console.log({ res }))
//   .catch((error) => console.log({ error }));
autoUpdater.forceDevUpdateConfig = true;

const repo = "Shaukat456/ElectronAPP2";
const token = "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";

// fetch(`https://api.github.com/repos/shaukat456/ElectronApp2/releases/latest`, {
//   headers: {
//     Authorization: "Bearer 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",
//   },
// })
//   .then((response) => response.json())
//   .then((data) => {
//     // Process the data

//     console.log(data);
//   })
//   .catch((error) => {
//     // Handle any errors
//     console.error({ error });
//   });

// fetch(` https://api.github.com/repos/Shaukat456/ElectronAPP2/zipball/v1.0.4`, {
//   headers: {
//     Authorization: "Bearer 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",
//   },
// })
//   .then((response) => response.json())
//   .then((data) => {
//     // Process the data

//     console.log(data);
//   })
//   .catch((error) => {
//     // Handle any errors
//     console.error({ error });
//   });

// autoUpdater.setFeedURL(
//   `https://api.github.com/repos/${repo}/releases/109781143`,
//   {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }
// );
// autoUpdater
//   .checkForUpdates()
//   .then((res) => {
//     console.log({ res });
//   })
//   .catch((err) => console.log({ err }));

// autoUpdater.setFeedURL(`https://github.com/Shaukat456/ElectronAPP.git`, {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });

// console.log({ latestVersion });
// autoUpdater.on("update-available", () => {
//   const latestVersion = autoUpdater.getLatestVersion();
//   const currentVersion = app.getVersion();

//   console.log({ latestVersion, currentVersion });
//   if (latestVersion !== currentVersion) {
//   }
// });

autoUpdater.on("error", (error) => {
  // Handle errors here
});

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // ipcMain.on("inputData", (event, lead) => {
  //   console.log({ lead });
  // });

  // var counter = 0;
  // var counter2 = 0;

  // setInterval(() => {
  //   counter++;
  //   mainWindow.webContents.send("change", counter);
  // }, 1000);

  // setInterval(() => {
  //   counter2--;
  //   // mainWindow.webContents.send("change", counter2);
  //   mainWindow.webContents.send();
  // }, 1000);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.on("ready", createWindow)

app.whenReady().then(() => {
  autoUpdater.setFeedURL(`https://api.github.com/repos/${repo}/releases/dis`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  autoUpdater
    .checkForUpdates()
    .then((res) => {
      console.log({ res });
    })
    .catch((err) => console.log({ err }));

  createWindow();
});
app.whenReady().then(() => {
  createWindow();
});
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// app.on("activate", () => {
//   // On OS X it's common to re-create a window in the app when the
//   // dock icon is clicked and there are no other windows open.
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
