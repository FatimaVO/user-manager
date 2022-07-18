import React from 'react';
import axios from "axios";
import Swal from 'sweetalert2'

const UsersList = ({ users, selectUser, getUsers }) => {

    const deleteUser = (id) => {
        Swal.fire({
            icon: 'success',
            title: 'SUCCESS',
            text: 'The user has been successfully deleted',
        })
        axios
            .delete(`https://users-crud1.herokuapp.com/users/${id}/`)
            .then(() => getUsers());
    };

    return (
        <ul className='usersList'>
            {users.map((user) => (
                <li key={user.id} className="userCard">
                    <div className='userInfo'>
                        <b className='userName'>
                            {user.first_name}
                            {" "}
                            {user.last_name}
                        </b>
                        <div>
                            {user.email}
                        </div>
                        <div>
                            <i className="fa-solid fa-calendar-days"></i>
                            {" "}
                            {user.birthday}
                        </div>
                    </div>
                    <div className='userButtons'>
                        <button className='editButton' onClick={() => selectUser(user)}><i className="fa-solid fa-pencil"></i></button>
                        <button className='deleteButton' onClick={() => deleteUser(user.id)}><i className="fa-solid fa-trash-can"></i></button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default UsersList;