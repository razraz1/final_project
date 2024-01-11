import React, { useContext } from 'react'
import styles from './style.module.css'
import { CgProfile } from "react-icons/cg";

import ProfileImgContext from '../context/ProfileImgContext'

export default function Editing() {
  const { profileImg, setProfileImg } = useContext(ProfileImgContext)

  const editing = () => {

  }
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
      </div>
      <input type="text" name='firstName' defaultValue="firstName" />
      <input type="text" name='lastName' defaultValue="lastName" />
      <input type="text" name='password' defaultValue="password" />
      <button onClick={() => { editing() }}>Editing</button>

    </div>
  )
}
