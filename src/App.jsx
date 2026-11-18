import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import TodoList from './TodoList';
import TodoDetail from './TodoDetail';
import './App.css';

const initialTodos = [
  {
    id: 1,
    title: 'Kuis Pemrograman Web',
    description: 'Menyelesaikan proyek membuat web untuk list tugas',
    priority: 'high',
    deadline: '2026-10-11',
    status: 'in progress',
  },
  {
    id: 2,
    title: 'Pertemuan 7 Pemrograman Web',
    description: 'Memahami cara penggunaan postman',
    priority: 'low',
    deadline: '2026-11-25',
    status: 'in progress',
  },
  {
    id: 3,
    title: 'Membuat Website Portfolio',
    description: 'Desain dan implementasi portfolio pribadi menggunakan Tailwind CSS.',
    priority: 'medium',
    deadline: '2026-10-20',
    status: 'completed',
  },
  {
    id: 4,
    title: 'Lab Pemweb',
    description: 'Mempelajari react',
    priority: 'low',
    deadline: '2026-10-11',
    status: 'to-do',
  },
];

export default function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [notification, setNotification] = useState('');

  function showNotification(message) {
    setNotification(message);
    setTimeout(() => {
      setNotification('');
    }, 3000);
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout notification={notification} />}>
          <Route
            index
            element={
              <TodoList
                todos={todos}
                setTodos={setTodos}
                showNotification={showNotification}
              />
            }
          />
          <Route
            path="todo/:id"
            element={
              <TodoDetail
                todos={todos}
                setTodos={setTodos}
                showNotification={showNotification}
              />
            }
          />
        </Route>

        <Route
          path="*"
          element={
            <div className="app-container" style={{ textAlign: 'center' }}>
              <h2>404 - Halaman Tidak Ditemukan</h2>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}