import { useState } from "react";
import ProgressBar from "./ProgressBar";
import TickIcon from "./TickIcon";
import Modal from "./Modal";
import "../styles/App.css";
import "../styles/ListItem.css";
const serverUrl = import.meta.env.VITE_SERVER_URL;

function ListItem({ task, getData }) {
  const [showModal, setShowModal] = useState(false);

  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : "",
    progress: editMode ? task.progress : 50,
    date: editMode ? task.date : new Date(),
  });

  const editData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${serverUrl}/todos/${task.id}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        setShowModal(false);
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://to-do-backend-rose.vercel.app/todos`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: authToken,
          },
          body: JSON.stringify({
            ...data,
            title: data.title.charAt(0).toUpperCase() + data.title.slice(1),
          }),
        }
      );
      if (response.status === 200) {
        console.log("Todo created successfully!");
        setShowModal(false);
        getData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((data) => ({ ...data, [name]: value }));
    console.log(data);
  };

  return (
    <div className="listItem-container">
      <div className="wrapper">
        <div className="data-container">
          <div className="info-container">
            <TickIcon />
            <p className="task-title">{task.title}</p>
          </div>
          <div className="progressBar-container">
            <ProgressBar progress={task.progress} />
          </div>
        </div>
        <div className="button-container">
          <button className="edit-button" onClick={() => setShowModal(true)}>
            Edit
          </button>
          <button className="delete-button" onClick={deleteItem}>
            Delete
          </button>
        </div>
        {showModal && (
          <>
            <Modal
              mode={"edit"}
              setShowModal={setShowModal}
              task={task}
              getData={getData}
            />
            <label htmlFor="range" className="text-bar">
              Drag to select your current progress!
            </label>
            <input
              type="range"
              id="range"
              required
              min="0"
              max="100"
              name="progress"
              value={data.progress}
              onChange={handleChange}
            />
            <input
              className={mode}
              type="submit"
              onClick={editMode ? editData : postData}
              id="submit-button"
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Modal;
