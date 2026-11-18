import { useState } from 'react';
import { Link } from 'react-router-dom';

const emptyForm = {
  title: '',
  description: '',
  status: 'to-do',
  priority: 'low',
  deadline: '',
};

export default function TodoList({ todos, setTodos, showNotification }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newTodo = {
      id: Date.now(),
      ...formData,
    };
    setTodos((prev) => [newTodo, ...prev]);
    setFormData(emptyForm);
    setShowModal(false);
    showNotification('Tugas berhasil ditambahkan!');
  }

  function handleDelete(id) {
    if (window.confirm('Apakah kamu yakin ingin menghapus tugas ini?')) {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
      showNotification('Tugas berhasil dihapus!');
    }
  }

  function formatDate(date) {
    if (!date) return '-';
    return new Date(date + 'T00:00:00').toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  }

  return (
    <>
      <header className="header">
        <div>
          <h1>Todo List</h1>
        </div>
        <button className="add-button" onClick={() => setShowModal(true)}>
          + Tambah Tugas
        </button>
      </header>

      <main>
        <div className="section-header">
          <h2>Daftar Tugas</h2>
          <span>{todos.length} Total Tugas</span>
        </div>

        <div className="table-wrapper">
          <table className="todo-table">
            <thead>
              <tr>
                <th>Judul</th>
                <th>Status</th>
                <th>Prioritas</th>
                <th>Deadline</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {todos.length > 0 ? (
                todos.map((todo) => (
                  <tr key={todo.id}>
                    <td className="title-cell">{todo.title}</td>
                    <td>
                      <span
                        className={`status-badge status-${todo.status.replace(' ', '-')}`}
                      >
                        {todo.status}
                      </span>
                    </td>
                    <td>
                      <span className={`priority-badge priority-${todo.priority}`}>
                        {todo.priority}
                      </span>
                    </td>
                    <td>{formatDate(todo.deadline)}</td>
                    <td>
                      <div className="action-buttons">
                        <Link to={`/todo/${todo.id}`} className="detail-button">
                          Detail
                        </Link>
                        <button
                          className="delete-button"
                          onClick={() => handleDelete(todo.id)}
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="empty-state">
                    Belum ada tugas. Silakan tambahkan tugas baru!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* MODAL TAMBAH TUGAS */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Tambah Tugas Baru</h2>
              <button
                type="button"
                className="close-button"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Judul</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Contoh: Belajar React Router"
                  required
                />
              </div>

              <div className="form-group">
                <label>Deskripsi</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tuliskan rincian tugas..."
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="to-do">to-do</option>
                    <option value="in progress">in progress</option>
                    <option value="completed">completed</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Prioritas</label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                  >
                    <option value="low">low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowModal(false)}
                >
                  Batal
                </button>
                <button type="submit" className="submit-button">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}