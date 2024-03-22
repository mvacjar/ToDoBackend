import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import "./styles/App.css";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email;
  const [task, setTask] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/todos/${userEmail}`);
      const json = await response.json();
      setTask(json);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => getData, []);

  console.log(task);

  const sortedTasks = task?.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <>
      <div className="app-container">
        {!authToken && <Auth />}
        {authToken && (
          <>
            <ListHeader listName={"Your ToDo List"} getData={getData} />
            {sortedTasks?.map((task) => (
              <ListItem key={task.id} task={task} getData={getData} />
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default App;
