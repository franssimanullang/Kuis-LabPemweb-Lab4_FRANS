import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function TodoDetail({ todos, setTodos, showNotification }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const todo = todos.find((item) => item.id === Number(id));
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(todo || {});

  if (!todo) {
    return (
      <div className="card-box" style={{ textAlign: 'center' }}>
        <h2>Tugas Tidak Ditemukan</h2>
        <button className="submit-button" onClick={() => navigate('/')}>
          Kembali ke Daftar
        </button>
      </div>
    );
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleUpdate(e) {
    e.preventDefault();
    setTodos((prev) =>
      prev.map((item) => (item.id === todo.id ? { ...item, ...formData } : item))
    );
    setIsEditing(false);
    showNotification('Tugas berhasil diperbarui!');
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
    <div className="card-box">
      {!isEditing ? (
        <>
          <h2>Detail Tugas</h2>

          <div className="detail-grid">
            <div className="detail-item">
              <label>Judul</label>
              <p style={{ fontWeight: '600', fontSize: '17px' }}>{todo.title}</p>
            </div>

            <div className="detail-item">
              <label>Deskripsi</label>
              <p>{todo.description}</p>
            </div>

            <div className="detail-meta">
              <div className="detail-item">
                <label>Status</label>
                <span
                  className={`status-badge status-${todo.status.replace(' ', '-')}`}
                >
                  {todo.status}
                </span>
              </div>

              <div className="detail-item">
                <label>Prioritas</label>
                <span className={`priority-badge priority-${todo.priority}`}>
                  {todo.priority}
                </span>
              </div>

              <div className="detail-item">
                <label>Deadline</label>
                <p style={{ fontSize: '14px' }}>{formatDate(todo.deadline)}</p>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate('/')}
            >
              Kembali
            </button>
            <button
              type="button"
              className="submit-button"
              onClick={() => {
                setFormData(todo);
                setIsEditing(true);
              }}
            >
              Edit Tugas
            </button>
          </div>
        </>
      ) : (
        <>
          <h2>Update Tugas</h2>

          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label>Judul</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Deskripsi</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
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
                onClick={() => setIsEditing(false)}
              >
                Batal
              </button>
              <button type="submit" className="submit-button">
                Simpan Perubahan
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}