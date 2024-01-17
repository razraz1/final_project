import React, { useEffect, useState } from "react";
// import { BsTrash3 } from "react-icons/bs";
import styles from "./style.module.css";
import { BsTrash3 } from "react-icons/bs";
import axios from "axios";

export default function Inbox() {
  const [emails, setEmails] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const userEmail = "jafne.smith@gmail.com";
    let action = "from";
    axios
      .get(`http://localhost:3000/massages/${action}/${userEmail}`)
      .then((res) => {
        setEmails(res.data);
        console.log(res.data);
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
          {emails.length === 0 ? (
            <tr>
              <td>There is no inbox</td>
            </tr>
          ) : (
            emails.map((email) => (
              <tr key={email._id}>
                <td className={styles.name}> {email.from} </td>
                <td className={styles.title}> {email.title} </td>
                <td
                  className={styles.trash}
                  onClick={() => deletion(email._id)}
                >
                  {" "}
                  {<BsTrash3 />}{" "}
                </td>
                <td className={styles.date}> {new Date(email.createDate).toLocaleDateString()} </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
