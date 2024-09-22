import { ElectronAPI } from '@electron-toolkit/preload'
import { FileEntity } from '../main/entities/file.entity'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      saveData: (file:FileEntity) => any,
      getData: () => Promise<FileEntity[]>,
    }
  }
}
