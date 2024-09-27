import { useEffect, useState } from 'react'
import { type File } from '@renderer/types/types'

export function Home() {
  useEffect(() => {
    const fetchFiles = async () => {
      const result = await window.api.findLoans()
      console.log(result.data)
    }
    fetchFiles()
  })

  return (
    <ul>
      <li> a </li>
    </ul>
  )
}
