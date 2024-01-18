import React, { useState } from "react";
import styles from "./style.module.css";
import { BsTrash3 } from "react-icons/bs";
import { useEffect } from "react";
import axios from "axios";

export default function Outbox() {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const userEmail = "daniel.garcia@example.com";
    axios.get("http://localhost:3000/massages/from/" + userEmail).then((res) => {
      // console.log(res);
      setEmails(res.data);
      // console.log("Updated emails:", emails); // יוספתי שורה זו
    });
  }, []);

  return (
    <div className={styles.outbox}>
      <table>
        <tbody>
          {emails && emails.length > 0 ? (
            emails.map((email) => (
              <tr key={email._id}>
                <td className={styles.name}>
                  {email.to.map((email) => email)}
                </td>
                <td className={styles.title}> {email.title} </td>
                <td className={styles.trash}> {<BsTrash3 />} </td>
                <td className={styles.date}>
                  {new Date(email.createDate).toLocaleDateString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>Outbox is empty</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
