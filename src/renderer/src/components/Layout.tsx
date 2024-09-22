import { Link } from 'react-router-dom'

export function Layout({ className }: { className?: string }) {
  return (
    <ul className={className}>
      <li>
        <Link to="/" className="link">
          Home
        </Link>
      </li>
      <li>
        <Link to="/form" className="link">
          Formulario
        </Link>
      </li>
    </ul>
  )
}
