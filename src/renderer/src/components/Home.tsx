import { useEffect, useState } from 'react'
import { type File } from '@renderer/types/types'

export function Home() {
  const [files, setFiles] = useState<File[]>([])
  useEffect(() => {
    const fetchFiles = async () => {
      setFiles(await window.api.getData())
    }
    fetchFiles()
  })

  return (
    <ul>
      {files.map((file: File) => (
        <li key={file.id}>{file.number}</li>
      ))}
    </ul>
  )
}
