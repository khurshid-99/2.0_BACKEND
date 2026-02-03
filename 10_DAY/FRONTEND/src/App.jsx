import { useEffect, useState } from "react";
import "./app.scss";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function getNotes() {
    const { data } = await axios.get("http://localhost:3000/api/notes");
    console.log(data.notes);
    setNotes(data.notes);
    console.log(notes);
  }

  async function createNote(e) {
    e.preventDefault();

    await axios.post("http://localhost:3000/api/notes", {
      title,
      description,
    });

    setDescription("");
    setTitle("");
    getNotes();
  }

  async function deleteNote(id) {
    await axios.delete(`http://localhost:3000/api/notes/${id}`);
    getNotes();
  }

  const [editId, setEditId] = useState(null);
  const [newDescription, setNewDescription] = useState("");

  // 2. Updated Edit function using a prompt for simplicity
  async function editeDescription(id) {
    await axios.patch(`http://localhost:3000/api/notes/${id}`, {
      description: newDescription,
    });
    setEditId(null);
    getNotes();
  }

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="main">
      <div className="form_contanier">
        <form action="" onSubmit={(e) => createNote(e)}>
          <input
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            name=""
            id=""
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button type="submit" className="submit_btn">
            Submit
          </button>
        </form>
      </div>
      <div className="notes">
        {notes.map(({ title, description, _id }) => (
          <div key={_id} className="note">
            <div>
              <h1>{title}</h1>

              {editId === _id ? (
                <textarea
                  className=""
                  placeholder="Edite Description"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                ></textarea>
              ) : (
                <p>{description}</p>
              )}
            </div>
            <div className="buttons">
              {editId === _id ? (
                <>
                  <button
                    className="save_btn"
                    onClick={() => editeDescription(_id)}
                  >
                    Save
                  </button>
                  <button
                    className="cancel_btn"
                    onClick={() => {
                      setEditId(null);
                    }}
                  >
                    Cancle
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="delete_btn"
                    onClick={() => deleteNote(_id)}
                  >
                    Delete
                  </button>
                  <button
                    className="edite_btn"
                    onClick={() => {
                      setNewDescription(description);
                      setEditId(_id);
                    }}
                  >
                    Edite
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

// --------

// import { useEffect, useState } from "react";
// import "./app.scss";
// import axios from "axios";

// const App = () => {
//   const [notes, setNotes] = useState([]);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   // 1. New state to track which note is being edited and its temporary text
//   const [editId, setEditId] = useState(null);
//   const [editText, setEditText] = useState("");

//   async function getNotes() {
//     const { data } = await axios.get("http://localhost:3000/api/notes");
//     setNotes(data.notes);
//   }

//   async function createNote(e) {
//     e.preventDefault();
//     await axios.post("http://localhost:3000/api/notes", { title, description });
//     setTitle(""); // Clear inputs
//     setDescription("");
//     getNotes();
//   }

//   async function deleteNote(id) {
//     await axios.delete(`http://localhost:3000/api/notes/${id}`);
//     getNotes();
//   }

//   // 2. Function to handle the Save action
//   async function saveUpdate(id) {
//     await axios.patch(`http://localhost:3000/api/notes/${id}`, {
//       description: editText,
//     });
//     setEditId(null); // Exit edit mode
//     getNotes();
//   }

//   useEffect(() => {
//     getNotes();
//   }, []);

//   return (
//     <div className="main">
//       <div className="form_contanier">
//         <form onSubmit={(e) => createNote(e)}>
//           <input
//             type="text"
//             placeholder="Enter Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//           <textarea
//             placeholder="Enter Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           ></textarea>
//           <button type="submit" className="submit_btn">
//             Submit
//           </button>
//         </form>
//       </div>

//       <div className="notes">
//         {notes.map(({ title, description, _id }) => (
//           <div key={_id} className="note">
//             <div>
//               <h1>{title}</h1>

//               {/* 3. Conditional Rendering for Description */}
//               {editId === _id ? (
//                 <textarea
//                   className="edit_input"
//                   value={editText}
//                   onChange={(e) => setEditText(e.target.value)}
//                 />
//               ) : (
//                 <p>{description}</p>
//               )}
//             </div>

//             <div className="buttons">
//               {editId === _id ? (
//                 <>
//                   <button className="save_btn" onClick={() => saveUpdate(_id)}>
//                     Save
//                   </button>
//                   <button
//                     className="cancel_btn"
//                     onClick={() => setEditId(null)}
//                   >
//                     Cancel
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <button
//                     className="delete_btn"
//                     onClick={() => deleteNote(_id)}
//                   >
//                     Delete
//                   </button>
//                   <button
//                     className="edite_btn"
//                     onClick={() => {
//                       setEditId(_id);
//                       setEditText(description); // Pre-fill with old text
//                     }}
//                   >
//                     Edit
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default App;
