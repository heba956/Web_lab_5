import { useState } from "react";
import "./App.css";

function MovieItem({ movie, onDelete, onUpdate }) {
  return (
    <li className="movie">
      <div className="movie-top">
        <span className="movie-title">{movie.title}</span>
        <button className="remove" onClick={() => onDelete(movie.id)}>
          Remove
        </button>
      </div>

      <div className="stars">
        {[1, 2, 3, 4, 5].map(n => (
          <button
            key={n}
            className="star"
            onClick={() =>
              onUpdate(movie.id, { rating: n === movie.rating ? 0 : n })
            }
          >
            {n <= movie.rating ? "⭐" : "☆"}
          </button>
        ))}
      </div>

      <p className="rating-text">
        {movie.rating > 0
          ? `${"⭐".repeat(movie.rating)} (${movie.rating}/5)`
          : "Not rated yet"}
      </p>

      <textarea
        className="review"
        value={movie.review}
        onChange={e => onUpdate(movie.id, { review: e.target.value })}
        placeholder="Write your review..."
      />
    </li>
  );
}

function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");

  function handleAdd() {
    const clean = title.trim();
    if (!clean) return;
    setMovies([...movies, { id: Date.now(), title: clean, review: "", rating: 0 }]);
    setTitle("");
  }

  function handleDelete(id) {
    setMovies(movies.filter(m => m.id !== id));
  }

  function handleUpdate(id, changes) {
    setMovies(movies.map(m => (m.id === id ? { ...m, ...changes } : m)));
  }

  return (
    <div className="app">
      <h1>🎬 Movies Watch List 🎬</h1>

      <div className="add-row">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") handleAdd();
          }}
          placeholder="Movie title"
        />
        <button className="add" onClick={handleAdd}>Add</button>
      </div>

      {movies.length === 0 && <p className="empty">No movies yet</p>}

      <ul>
        {movies.map(movie => (
          <MovieItem
            key={movie.id}
            movie={movie}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;