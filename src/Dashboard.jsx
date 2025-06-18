// src/Dashboard.jsx
import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import './Dashboard.css';

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user);
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user.email}</h2>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Clients</h3>
          <p>View and manage all your clients.</p>
        </div>

        <div className="card">
          <h3>Appointments</h3>
          <p>See upcoming meetings and schedules.</p>
        </div>

        <div className="card">
          <h3>Notes</h3>
          <p>Organize your notes and reminders.</p>
        </div>
      </div>

      <button className="logout-button" onClick={handleLogout}>Log out</button>
    </div>
  );
}
