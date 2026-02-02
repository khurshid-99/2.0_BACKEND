import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function getNotes() {
    const { data } = await axios.get("http://localhost:3000/api/notes");
    setNotes(data.notes);
  }

  async function deleteNote(id) {
    await axios.delete(`http://localhost:3000/api/notes/${id}`);
    setNotes((prev) => prev.filter((note) => note._id !== id));
  }

  async function createNote(e) {
    e.preventDefault();

    await axios.post("http://localhost:3000/api/notes", {
      title,
      description,
    });

    setTitle("");
    setDescription("");
    console.log(title);
    console.log(description);
     getNotes(); 
  }

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <div className="notes">
        {notes.map((note) => (
          <div key={note._id} className="note">
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            <button onClick={() => deleteNote(note._id)}>Delete</button>
          </div>
        ))}
      </div>

      <form onSubmit={createNote}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note Title"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter note Description"
        />

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default App;
