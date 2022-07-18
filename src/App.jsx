import { useEffect, useState } from "react";
import axios from "axios";
import './App.css'
import UsersList from "./components/UsersList";
import UsersForm from "./components/UsersForm";

function App() {

  const [users, setUsers] = useState([]);
  const [userSelected, setUserSelected] = useState(null);

  useEffect(() => {
    axios
      .get("https://users-crud1.herokuapp.com/users/")
      .then((res) => setUsers(res.data));
  }, []);

  const getUsers = () => {
    axios
      .get("https://users-crud1.herokuapp.com/users/")
      .then((res) => setUsers(res.data));
  };


  const selectUser = (user) => {
    setUserSelected(user);
  };

  const deselectUser = () => setUserSelected(null);


  return (
    <div className="App">
      <UsersList
        users={users}
        selectUser={selectUser}
        getUsers={getUsers}
      />
      <UsersForm
        getUsers={getUsers}
        userSelected={userSelected}
        deselectUser={deselectUser}
      />
    </div>
  )
}

export default App
