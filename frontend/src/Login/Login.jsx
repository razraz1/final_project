import React, { useContext, useState } from 'react'
import UserContext from '../context/UseContext'
import styles from './style.module.css'
import axios from 'axios'

export default function Login() {

<<<<<<< HEAD
  const { setUser } = useContext(UserContext)
  const [data, setData] = useState({})
  const [err, setErr] = useState()
=======
<<<<<<< HEAD
    const {user, setUser } = useContext(UserContext)
    const [ setData] = useState({})
    const  o = () => {
      setUser()
      console.log(user);
    }
=======
    const { setUser } = useContext(UserContext)
    const [data, setData] = useState({})
>>>>>>> 96fcb06a2880b8e79ce78fb5116dbd50fe3bc081
>>>>>>> e757befe1885766bbffc90e0243ea4bdafc7d2eb

  const handleChange = (e) => {
    console.log(e.target.name);
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleCheck = (e) => {
    setData({ ...data, [e.target.name]: e.target.checked })
  }

<<<<<<< HEAD

  const refreshTokens = async (accessToken) => {
    try {
      const res = await axios.post('http://localhost:3000/refresh', { accessToken });
      console.log(res);
      const refreshToken = res.data.refresh
      return refreshToken
    } catch (error) {
      console.error("login err", error)
    }
  }

  const handleAxios1 = async () => {
    console.log(data);
    try {

      const res = await axios.post('http://localhost:3000/login', {
        email: data.email,
        password: data.password
      }
      )
      console.log(res);
      const token = await refreshTokens(res.data.accessToken)
      console.log(token);
    } catch (err) {
      console.log(err);
    }
  }

  //   const handleAxios = async()=>{
  //     try{
  //      const response = await axios.post('http://localhost:3000/login',data);
  //      const accessToken = response.data.accessToken;
  //      localStorage.setItem('token', accessToken);
  //      await refreshTokens(accessToken)
  //     }
  //   catch (error) {
  //     console.error('Error during login:', error);
  //   }
  // }
  return (
    <div className={styles.container}>
      <h1>LOGIN</h1>
      <div>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>

          <div className={styles.formGroup}>
            <label htmlFor='email'>YOUR EMAIL</label>
            <input id='email' name='email' type='email' placeholder='Enter your email' onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor='password'>PASSWORD</label>
            <input id='password' name='password' type='password' placeholder='Enter your password' onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>
              <input type='checkbox' name='isChecked' />
              STAY LOGGED IN
            </label>
          </div>

          <button className={styles.loginBtn} type='submit' onClick={handleAxios1}>LOGIN</button>
        </form>
=======
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
  
            <button className={styles.loginBtn} onClick={o} type='submit'>LOGIN</button>
          </form>
        </div>
>>>>>>> e757befe1885766bbffc90e0243ea4bdafc7d2eb
      </div>
    </div>
  )
}
