import React, { useContext } from 'react'
import styles from './style.module.css';
import { CgProfile } from "react-icons/cg";
import { SlMagnifier } from "react-icons/sl";
import ProfileImgContext from '../context/ProfileImgContext';

export default function Header() {

const  editing = () => {
}


const firstName = "moshe"
// const name = ""

    const { profileImg } = useContext(ProfileImgContext)

    return (
        <div className={styles.header}>
            <button onClick={editing } className={styles.profilePictures}>
                <div>
                    {profileImg ? (
                        <img src={profileImg} alt="profileImg" />
                    ) : (
                        <div className={styles.cgProfile}>
                            <CgProfile />
                        </div>
                    )}
                </div>
                <div className={styles.name}>
                    {firstName}
                </div>

            </button>
            <div className={styles.input}>
                <input type="text" 
                // value={}
                // onChange={}
                placeholder='Enter a name to search...' />
                <SlMagnifier />
 
            </div>
            <div className={styles.imgChat}>
                <img src="https://cdn.pixabay.com/photo/2013/07/12/15/53/email-150497_640.png"/>
            </div>
        </div>
    )
}

