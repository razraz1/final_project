import React, { useEffect, useState } from 'react'
import styles from "./style.module.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getRefreshTokens, getTokensFromLocalStorage } from '../tokens_utilitys/utility';



export default function MessageContent() {
    const [emails, setEmails] = useState([]);

    // const { email } = useParams();
    // const email = "65ad15ee6ae4ac28f9c49b1b"
    // const userEmail = "jane.smith@gmail.com"
    // const authToken = localStorage.getItem('token')

    useEffect((massagesId) => {

        const { authToken, accessToken } = getTokensFromLocalStorage()
        const read = async () => {

            const refreshedToken = await getRefreshTokens(authToken, accessToken);
            axios.put(`http://localhost:3000/massages/reading/${massagesId}`, {
                headers: {
                    Authorization: `Bearer ${refreshedToken}`
                }
            })
                .then((res) => {
                    setEmails(res.data)
                    console.log(emails);
                })
        }
        read();
    },
        [])





    return (
        <div>
            <div className={styles.messageContent}>
                <div className={styles.to}>isketmiowect;iowehaioc ty aw ioeytwo;ietywo;u</div>
                <div className={styles.from}></div>
                <div className={styles.title}></div>
                <div className={styles.body}></div>
            </div>
        </div>
    )
}
