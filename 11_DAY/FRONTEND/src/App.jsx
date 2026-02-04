import { useEffect, useState } from "react";
import "./app.scss";
import axios from "axios";
const App = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [detils, setDetils] = useState("");
  const [notes, setNotes] = useState([]);

  const [editId, setEditId] = useState(null);
  const [newDescription, setNewDescription] = useState("");

  async function getNotes() {
    try {
      const { data } = await axios.get("http://localhost:3000/api/notes");
      setNotes(data.notes);
    } catch (error) {
      console.error(`Can't featch notes data ${error}`);
    }
  }

  async function crateNote(e) {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3000/api/notes`, {
        name,
        image,
        description: detils,
      });

      setName("");
      setImage("");
      setDetils("");

      getNotes();
      console.log(`Note create successfullly`);
    } catch (error) {
      console.error(`can't create successfully error : ${error}`);
    }
  }

  async function deleteNote(id) {
    try {
      await axios.delete(`http://localhost:3000/api/notes/${id}`);
      getNotes();
      console.log(`note deleted successfully`);
    } catch (error) {
      console.error(`can't note deleted error : ${error}`);
    }
  }

  async function updateNote(id) {
    try {
      const updateNote = await axios.patch(
        `http://localhost:3000/api/notes/${id}`,
        { description: newDescription },
      );

      setEditId(null);
      getNotes();
      console.log(`note update successfully note : `);
    } catch (error) {
      console.error(`can't note update successfully error : ${error} `);
    }
  }

  function handleUpdate(note) {
    (setEditId(note._id), setNewDescription(note.description));
  }

  

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <main>
      <form action="" onSubmit={(e) => crateNote(e)}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          name=""
          id=""
          placeholder="Enter your name"
        />
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          type="text"
          name=""
          id=""
          placeholder="Enter your image url"
        />
        <textarea
          value={detils}
          onChange={(e) => setDetils(e.target.value)}
          name=""
          id=""
          placeholder="Enter about you"
        ></textarea>

        <button type="submit">Submit</button>
      </form>
      {/* notes  */}

      <div className="notes">
        {notes &&
          notes.map((note) => (
            <div className="note" key={note._id}>
              <img src={note.image} alt="" />
              <div className="texts">
                <h1>{note.name}</h1>
                {editId === note._id ? (
                  <>
                    <textarea
                      name=""
                      id=""
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                    ></textarea>
                  </>
                ) : (
                  <p>{note.description}</p>
                )}
              </div>

              <div className="buttons">
                {editId === note._id ? (
                  <>
                    <button className="delete" onClick={() => setEditId(null)}>
                      Cancle
                    </button>
                    <button
                      className="edite"
                      onClick={() => updateNote(note._id)}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="delete"
                      onClick={() => deleteNote(note._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="edite"
                      onClick={() => handleUpdate(note)}
                    >
                      Edite
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
      </div>
    </main>
  );
};

export default App;
