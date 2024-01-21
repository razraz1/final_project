import React, { useState } from "react";
import styles from "./style.module.css";
import { BsTrash3 } from "react-icons/bs";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Outbox() {
  const [emails, setEmails] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // const { email } = useParams()

  const userEmail = "jane.smith@gmail.com";
  useEffect(() => {
    axios.get(`http://localhost:3000/massages/from/${userEmail}`)
      .then((res) => {
        setEmails(res.data["MY OUTBOX"]);
      })
      .catch((error) => {
        console.error("Error fetching emails:", error);
      });
  }, [refresh]);

  const deletion = (massageId) => {
    axios.delete(`http://localhost:3000/massages/sendDelete/${userEmail}/` + massageId)
      .then((res) => {
        if (res.status === 204) {
          setRefresh((prevRefresh) => !prevRefresh);
        }
      })
      .catch((error) => {
        console.error("Error deleting message:", error);
      });
  };

  return (
    <div className={styles.outbox}>
      <table>
        <tbody>
          {emails && emails.length > 0 ? (
            emails.map((email) => (
              <tr key={email._id}>
                <td className={styles.name}>{email.to.map((email) => email)}</td>
                <td className={styles.title}> {email.title} </td>
                {/* <td className={styles.massageBody}> {email.massageBody}</td> */}
                <td className={styles.trash}
                  onClick={() => deletion(email._id)}
                > {<BsTrash3 />} </td>
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
