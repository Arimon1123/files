import { useEffect } from 'react'

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
