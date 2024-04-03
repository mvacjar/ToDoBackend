import { useState } from "react";
import { useCookies } from "react-cookie";
import "../styles/Modal.css";
import "../styles/App.css";
const serverUrl = import.meta.env.VITE_SERVER_URL;

function Modal({ mode, setShowModal, task, getData }) {
  const editMode = mode === "edit" ? true : false;
  const [cookies, setCookies, removeCookies] = useCookies(null);
  const authToken = cookies.AuthToken;

  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : "",
    progress: editMode ? task.progress : 50,
    date: editMode ? task.date : new Date(),
  });

  const editData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
<<<<<<< HEAD
        `https://todolist-fullstack-five.vercel.app/todos/${task.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
=======
        `http://localhost:8000/todos/${task.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
>>>>>>> c7f4fdcdbb970403b190bf6e660be4f7278d19c0
            authorization: authToken,
          },
          body: JSON.stringify({
            ...data,
<<<<<<< HEAD
            title: data.title.charAt(0).toUpperCase() + data.title.slice(1),
=======
            title:
              data.title.charAt(0).toUpperCase() +
              data.title.slice(1),
>>>>>>> c7f4fdcdbb970403b190bf6e660be4f7278d19c0
          }),
        }
      );
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
<<<<<<< HEAD
      const response = await fetch(
        `https://todolist-fullstack-five.vercel.app/todos`,
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
=======
      const response = await fetch(`http://localhost:8000/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: authToken,
        },
        body: JSON.stringify({
          ...data,
          title:
            data.title.charAt(0).toUpperCase() + data.title.slice(1),
        }),
      });
>>>>>>> c7f4fdcdbb970403b190bf6e660be4f7278d19c0
      if (response.status === 200) {
        console.log("Todo created successfully");
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
<<<<<<< HEAD
    <div className="overlay-container">
      <div className="modal-container">
        <div className="title-container">
          <h3 className="modal-title">Let's {mode} your task!</h3>
          <button className="x-button" onClick={() => setShowModal(false)}>
=======
    <div className='overlay-container'>
      <div className='modal-container'>
        <div className='title-container'>
          <h3 className='modal-title'>Let's {mode} your task!</h3>
          <button
            className='x-button'
            onClick={() => setShowModal(false)}
          >
>>>>>>> c7f4fdcdbb970403b190bf6e660be4f7278d19c0
            X
          </button>
        </div>
        <form className="form-container">
          <input
            type="text"
            required
            maxLength={30}
            placeholder="Write your next task here"
            name="title"
            value={data.title}
            onChange={handleChange}
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
        </form>
      </div>
    </div>
  );
}

export default Modal;
