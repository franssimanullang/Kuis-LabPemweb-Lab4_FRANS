import { Outlet } from 'react-router-dom';

export default function Layout({ notification }) {
  return (
    <div className="app-container">
      {notification && <div className="notification">{notification}</div>}
      <Outlet />
    </div>
  );
}