import React, { useContext, useEffect, useState } from 'react'
import styles from './style.module.css'
import { CgProfile } from "react-icons/cg";
import { IoPencil } from 'react-icons/io5';

import ProfileImgContext from '../context/ProfileImgContext'
import axios from 'axios';

export default function Editing() {
  const { profileImg, setProfileImg } = useContext(ProfileImgContext)
  const authToken = localStorage.getItem("token");

  const [user, setUser] = useState('')
  const [data, setData] = useState({
    firstName: "",
    lastName: ""
  });

  const handleChange = (e) => {
    setData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };

  const editing = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/user`,
        data,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log("res", response);
    } catch (error) {
      console.error("Error while updating email status:", error);
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/user`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        console.log(res, "res");
        setUser(res.data)
        console.log(user);
      });
  }, []);
  
  // setProfileImg('')


  return (
    <div className={styles.editing}>
      <div className={styles.profileImg}>
        {profileImg ? (
          <img src={profileImg} alt="" />
        ) : (
          <div className={styles.cgProfile}>
            <CgProfile />
          </div>
        )}
        <div className={styles.icon}>
          <IoPencil />
        </div>
      </div>
      <input type="text" name='firstName' defaultValue={user.firstName} onChange={handleChange}/>
      <input type="text" name='lastName' defaultValue={user.lastName} onChange={handleChange}/>
      <button onClick={() => { editing() }}>Editing</button>

    </div>
  )
}
