import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="p-4 bg-slate-900 text-white flex justify-between">
      <Link to="/" className="font-bold text-xl">CareerHub</Link>
      <div>
        {user ? (
          <button onClick={logout}>Logout ({user.name})</button>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/register">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}