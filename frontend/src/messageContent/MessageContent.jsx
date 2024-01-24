import React, { useEffect, useState } from 'react'
import styles from "./style.module.css";
import { useParams } from 'react-router-dom';

 

export default function MessageContent({messageContent,setMessageContent}) {
    const [emails, setEmails] = useState([]);
    const { email } = useParams();
    const authToken = localStorage.getItem('token')

    return (
    <div>
        <div className={styles.messageContent}>
          <div className={styles.x} onClick={() => setMessageContent(false)}>X</div>
            <div className={styles.from}>from: {messageContent.from}</div>
            <div className={styles.title}>title: {messageContent.title}</div>
            <div className={styles.body}>body: {messageContent.massageBody}</div>
        </div>
    </div>
  )
}
