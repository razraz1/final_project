import React, { useContext } from 'react'
import styles from './style.module.css'
import { CgProfile } from "react-icons/cg";
import { IoPencil } from 'react-icons/io5';

import ProfileImgContext from '../context/ProfileImgContext'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getRefreshTokens, getTokensFromLocalStorage } from '../tokens_utilitys/utility';

export default function Editing() {
  const { profileImg, setProfileImg } = useContext(ProfileImgContext)



  const logOutUser = async () => {
    const { authToken, accessToken } = getTokensFromLocalStorage()

    const refreshedToken = await getRefreshTokens(authToken, accessToken);

    axios.post('http://localhost:3000/logout', {
      accessToken: accessToken
    }, {
      headers: {
        Authorization: `Bearer ${refreshedToken}`
      }
    })
    localStorage.removeItem('token')
    localStorage.removeItem('accessToken')
  }

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
      <input type="text" name='firstName' defaultValue="firstName" />
      <input type="text" name='lastName' defaultValue="lastName" />
      <input type="text" name='password' defaultValue="password" />
      <button >Editing</button>

      <Link to={'/login'}>
      <button onClick={() => logOutUser()}>logOut</button>
      </Link>

    </div>
  )
}
