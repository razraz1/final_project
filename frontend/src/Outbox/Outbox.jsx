import React, { useState } from "react";
import styles from "./style.module.css";
import { BsTrash3 } from "react-icons/bs";
import { useEffect } from "react";
import axios from "axios";

export default function Outbox() {
const [emails, setEmails] = useState([]);

useEffect(() => {
  const userEmail = "emily.davis@gmail.com";
  axios.get("http://localhost:3000/massages/" + userEmail).then((res) => {
    setEmails(res.data);
  });
}, []);

  return (
    <div className={styles.outbox}>
      <table>
        <tbody>
          {emails.length === 0 ? (
            <tr>
              <td>Outbox is empty</td>
            </tr>
          ) : (
            emails.map((email) => (
              <tr key={email._id}>
                <td className={styles.name}> {email.to.map(email => (email))}</td>
                <td className={styles.title}> {email.title} </td>
                <td className={styles.trash}> {<BsTrash3 />} </td>
                <td className={styles.date}> {email.createDate} </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
