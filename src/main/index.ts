/* eslint-disable prettier/prettier */
import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { dataSource, filterFiles, filterLoans, filterPersons, findFiles, findLoans, findPersons, saveFile, saveLoan, savePerson, searchFilesByNumber, searchLoansByNumber, searchPersonsByName, updateFile, updateLoan, updatePerson } from './typeorm'
import { FileEntity } from './entities/file.entity'
import { PersonEntity } from './entities/person.entity'
import { LoanEntity } from './entities/loan.entity'
import { generateDocument } from './carbone'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1020,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {

  
  // Set app user model id for windows
  dataSource.initialize()
  electronApp.setAppUserModelId('com.electron')
  
 
  ipcMain.handle('findFiles',async () => {
    return await findFiles()
  })

  ipcMain.handle('saveFile', async (_event, file: FileEntity) => {
    return await saveFile(file)
  })

  ipcMain.handle('filterByName',async (_event, number: string) => {
    return await searchFilesByNumber(number)
  })

  ipcMain.handle('filterFiles', async (_event, filter: string) => {
    return await filterFiles(filter)
  })

  ipcMain.handle('updateFile', async (_event, file:FileEntity) => {
    return await updateFile(file)
  })

  ipcMain.handle('savePerson', async (_event, person:PersonEntity) => {
    return await savePerson(person)
  })

  ipcMain.handle('findPersons', async () => {
    return await findPersons()
  })

  ipcMain.handle('filterPerson', async (_event, filter: string) => {
    return await filterPersons(filter)
  })

  ipcMain.handle('searchPerson', async (_event, name: string) => {
    return await searchPersonsByName(name)
  })

  ipcMain.handle('updatePerson', async (_event, person: PersonEntity) => {
    return await updatePerson(person)
  })

  ipcMain.handle('findLoans', async () => {
    return await findLoans()
  })

  ipcMain.handle('saveLoan', async (_event, loan: LoanEntity) => {
    return await saveLoan(loan)
  })

  ipcMain.handle('filterLoans', async (_event, filter: string) => {
    return await filterLoans(filter)
  })

  ipcMain.handle('searchLoan', async (_event, number: number) => {
    return await searchLoansByNumber(number)
  })

  ipcMain.handle('updateLoan', async (_event, loan: LoanEntity) => {
    return await updateLoan(loan)
  })

  ipcMain.handle('generateDoc', async (_event, loan: LoanEntity) => {
    return generateDocument(loan)
  })

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
