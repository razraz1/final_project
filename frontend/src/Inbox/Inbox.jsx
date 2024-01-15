import React, { useEffect, useState } from "react";
// import { BsTrash3 } from "react-icons/bs";
import styles from "./style.module.css";
import { BsTrash3 } from "react-icons/bs";
import axios from "axios";

export default function Inbox() {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const userEmail = "mifchael.clark@example.com";
    axios.get(`http://localhost:3000/massages/to/` + userEmail).then((res) => {
      setEmails(res.data);
      console.log(res.data);
    });
  }, []);
  const deletion = (massagesId) => {
    // const massagesId = "65a523216a96d906a29117f3"
    axios.delete(`http://localhost:3000/massages/` + massagesId).then((res) => {
      console.log(res);
      // setEmails(res.data);
    });
  }
 
  return (
    <div className={styles.inbox}>
      <table>
        <tbody>
          {emails.length === 0 ? (
            <tr>
              <td>There is no inbox</td>
            </tr>
          ) : (
            emails.map((email) => (
              <tr key={email._id}>
                <td className={styles.name}> {email.from} </td>
                <td className={styles.title}> {email.title} </td>
                <td className={styles.trash} onClick={deletion(email._id)}> {<BsTrash3 />} </td>
                <td className={styles.date}> {email.createDate} </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
