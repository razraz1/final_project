import React, { useEffect, useState } from "react";
// import { BsTrash3 } from "react-icons/bs";
import styles from "./style.module.css";
import { BsTrash3 } from "react-icons/bs";
import axios from "axios";

export default function Inbox({ searchResult, data }) {
  const [emails, setEmails] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // const userEmail = "jane.smith@gmail.com";
  useEffect(() => {
    const headers =  {
      Authorization: `Bearer ${data}`
    }
    if (searchResult && searchResult.length > 0) {
      setEmails(searchResult)
    } else {
      axios.post(`http://localhost:3000/massages/`,{headers})
        .then((res) => {
          setEmails(res.data["MY INBOX"]);
        });
    }
  }, [refresh, searchResult, data]);

  const deletion = (massagesId) => {
    const headers =  {
      Authorization: `Bearer ${data}`
    }
    axios.delete(`http://localhost:3000/massages/del/${massagesId}`,{headers})
      .then((res) => {
        if (res.data.acknowledged) {
          window.location.reload()
        }
        else {
          setRefresh((prevRefresh) => !prevRefresh);
        }
      });
  };

  return (
    <div className={styles.inbox}>
      <table>
        <tbody>
          {emails && emails.length > 0 ? (
            emails.map((email) => (
              <tr key={email._id} className={styles.emailResult}>
                <td className={styles.name}> {email.from} </td>
                <td className={styles.title}> {email.title}</td>
                {/* <td className={styles.massageBody}> {email.massageBody}</td> */}
                <td className={styles.date}>
                  {" "}
                  {new Date(email.createDate).toLocaleDateString()}{" "}
                </td>
                <td
                  className={styles.trash}
                  onClick={() => deletion(email._id)}
                >
                  {" "}
                  {<BsTrash3 />}{" "}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>{searchResult && searchResult.length > 0 ?
                "No search results" :
                "There is no inbox"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
