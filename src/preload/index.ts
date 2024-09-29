import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { FileEntity } from '../main/entities/file.entity'
import { Result } from '../main/types/types'
import { PersonEntity } from '../main/entities/person.entity'
import { LoanEntity } from '../main/entities/loan.entity'

// Custom APIs for renderer
const api = {
  findFiles: async (): Promise<Result<FileEntity[]>> => await ipcRenderer.invoke('findFiles'),
  saveFile: (file: FileEntity): Promise<Result<FileEntity>> => {
    return ipcRenderer.invoke('saveFile', file)
  },
  filterByName: async (number: string): Promise<Result<FileEntity[]>> => {
    return ipcRenderer.invoke('filterByName', number)
  },
  filterFiles: async (filter: string): Promise<Result<FileEntity[]>> => {
    return ipcRenderer.invoke('filterFiles', filter)
  },
  updateFile: async (file: FileEntity): Promise<Result<FileEntity>> => {
    return ipcRenderer.invoke('updateFile', file)
  },
  findPersons: async (): Promise<Result<PersonEntity[]>> => await ipcRenderer.invoke('findPersons'),
  savePerson: (person: PersonEntity): Promise<Result<string>> => {
    return ipcRenderer.invoke('savePerson', person)
  },
  filterPerson: async (filter: string): Promise<Result<PersonEntity[]>> => {
    return ipcRenderer.invoke('filterPerson', filter)
  },
  searchPerson: async (name: string): Promise<Result<PersonEntity[]>> => {
    return ipcRenderer.invoke('searchPerson', name)
  },
  updatePerson: async (person: PersonEntity): Promise<Result<string>> => {
    return ipcRenderer.invoke('updatePerson', person)
  },
  findLoans: async (): Promise<Result<LoanEntity[]>> => await ipcRenderer.invoke('findLoans'),
  saveLoan: (loan: LoanEntity): Promise<Result<string>> => {
    return ipcRenderer.invoke('saveLoan', loan)
  },
  filterLoans: async (filter: string): Promise<Result<LoanEntity[]>> => {
    return ipcRenderer.invoke('filterLoans', filter)
  },
  searchLoan: async (number: number): Promise<Result<LoanEntity[]>> => {
    return ipcRenderer.invoke('searchLoan', number)
  },
  updateLoan: async (loan: LoanEntity): Promise<Result<string>> => {
    return ipcRenderer.invoke('updateLoan', loan)
  },
  generateDoc: async (loan: LoanEntity): Promise<Result<Buffer>> => {
    return ipcRenderer.invoke('generateDoc', loan)
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
