import React, { useContext, useState } from 'react'
import UserContext from '../context/UseContext'
import styles from './style.module.css'
import axios from 'axios'

export default function Login() {

    const { setUser } = useContext(UserContext)
    const [data, setData] = useState({})

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    
    const handleCheck = (e) => {
        setData({ ...data, [e.target.name]: e.target.checked })
    }

    const handleAxios = ()=>{
        axios.post('',data)
    }

    return (
        <div className={styles.container}>
        <h1>LOGIN</h1>
        <div>
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
  
            <div className={styles.formGroup}>
              <label htmlFor='email'>YOUR EMAIL</label>
              <input id='email' name='email' type='email' placeholder='Enter your email' />
            </div>
  
            <div className={styles.formGroup}>
              <label htmlFor='password'>PASSWORD</label>
              <input id='password' name='password' type='password' placeholder='Enter your password' />
            </div>
  
            <div className={styles.formGroup}>
              <label>
                <input type='checkbox' name='isChecked' />
                STAY LOGGED IN
              </label>
            </div>
  
            <button className={styles.loginBtn} type='submit'>LOGIN</button>
          </form>
        </div>
      </div>
    )
}
