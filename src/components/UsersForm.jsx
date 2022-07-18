import React from 'react';
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Swal from 'sweetalert2'

const UsersForm = ({ getUsers, userSelected, deselectUser }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthday, setBirthday] = useState("");

    useEffect(() => {
        if (userSelected !== null) {
            setEmail(userSelected.email);
            setPassword(userSelected.password);
            setFirstName(userSelected.first_name);
            setLastName(userSelected.last_name);
            setBirthday(userSelected.birthday);
        }
    }, [userSelected]);

    const submit = (e) => {
        e.preventDefault();
        const userForm = {
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName,
            birthday: birthday
        };

        if (userSelected !== null) {
            Swal.fire({
                icon: 'success',
                title: 'SUCCESS',
                text: 'The user has been successfully updated.',
            })
            axios
                .put(
                    `https://users-crud1.herokuapp.com/users/${userSelected.id}/`,
                    userForm
                )
                .then(() => {
                    getUsers();
                    reset();
                    deselectUser();
                });
        } else {
            axios
                .post("https://users-crud1.herokuapp.com/users/", userForm)
                .then(() => {
                    getUsers();
                    reset();
                })
                .catch((error) => console.log(error.response));
        }
    };

    const reset = () => {
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setBirthday("");
    };

    const clear = () => {
        reset();
        deselectUser();
    };

    return (
        <form onSubmit={submit}>
            <h1>New User</h1>
            <div className='userInputs'>
                <div className='nameInputs'>
                    <div className="input-container">
                        <label htmlFor="firstName"><i className="fa-solid fa-user"></i></label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="first name"
                        />
                    </div>

                    <div className="input-container">
                        <label htmlFor="lastName"></label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="last name"
                        />
                    </div>
                </div>

                <div className="input-container">
                    <label htmlFor="email"><i className="fa-solid fa-envelope"></i></label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email"
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="password"><i className="fa-solid fa-lock"></i></label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="birthday"><i className="fa-solid fa-cake-candles"></i></label>
                    <input
                        type="date"
                        id="birthday"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        className='date'
                    />
                </div>
            </div>
            <div className='formButtons'>
                <button className='submit'>{userSelected !== null ? "Update" : "Create"}</button>
                {userSelected !== null && <button className='clear' onClick={clear} type="button">Clear</button>}
            </div>
        </form>
    );
};

export default UsersForm;