import React, { useEffect, useState } from "react";
// import { BsTrash3 } from "react-icons/bs";
import styles from "./style.module.css";
import { BsTrash3 } from "react-icons/bs";
import axios from "axios";

export default function Inbox() {
  const [emails, setEmails] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const userEmail = "daniel.garcia@example.com";
    console.log(emails);
    axios.get(`http://localhost:3000/massages/${userEmail}`).then((res) => {
      console.log(res.data, "ppppp");
      setEmails(res.data);
      console.log(emails, "oooo");
    });
  }, [refresh]);

  const deletion = (massagesId) => {
    axios.delete(`http://localhost:3000/massages/` + massagesId).then((res) => {
      if (res.data.acknowledged) {
        setRefresh((prevRefresh) => !prevRefresh);
      }
    });
  };

  return (
    <div className={styles.inbox}>
      <table>
        <tbody>
          {Array.isArray(emails) && emails.length === 0 ? (
            emails.map((email) => (
              <tr key={email._id}>
                <td className={styles.name}> {email.from} </td>
                <td className={styles.title}> {email.title}</td>
                <td
                  className={styles.trash}
                  onClick={() => deletion(email._id)}
                >
                  {" "}
                  {<BsTrash3 />}{" "}
                </td>
                <td className={styles.date}>
                  {" "}
                  {new Date(email.createDate).toLocaleDateString()}{" "}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>There is no inbox</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
