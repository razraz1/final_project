import React, { useContext, useEffect, useState } from "react";
// import { BsTrash3 } from "react-icons/bs";
import styles from "./style.module.css";
import { BsTrash3 } from "react-icons/bs";
import axios from "axios";
import { Link } from "react-router-dom";
import NavigationContext from "../context/NavigationContext";

export default function Mailboxes({ searchResult }) {
  const [emails, setEmails] = useState([]);
  const { navigation } = useContext(NavigationContext);

  const authToken = localStorage.getItem('token')

  useEffect(() => {
    console.log(navigation);
    let variable = "";
    let myData = "MY INBOX";
    if (navigation === "inbox" || navigation === "outbox" || navigation === "trash") {
      console.log(navigation);
      if (navigation === "inbox") {
        variable = "";
        myData = "MY INBOX";
      }
      if (navigation === "outbox") {
        variable = "from/";
        myData = "MY OUTBOX";
      }
      if (navigation === "trash") {
        variable = "trashMail/";
        myData = "MY TRASH";
      }
      axios
        .get(`http://localhost:3000/massages/${variable}`, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        })
        .then((res) => {
          console.log(res, "res");
          setEmails(res.data[myData]);
        });
    }
    else if (navigation === "search") {
      console.log(searchResult);
      setEmails(searchResult);


    }
  }, [navigation, searchResult]);

  const deletion = (massagesId) => {
    axios.delete(`http://localhost:3000/massages/del/${massagesId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
      .then((res) => {
        setEmails((prevEmails) => prevEmails.filter((email) => email._id !== massagesId));

      }
      ).catch(err => {
        "Delete field"
      })
  };

  return (
    <div className={styles.inbox}>
      <table>
        <tbody>
          {Array.isArray(emails) && emails.length > 0 ? (
            emails.map((email) => (
              <tr key={email._id}>
                <td className={styles.name}>
                  <Link to={`messageContent/${email.email}`}>{email.from}</Link>
                </td>
                <td className={styles.title}>
                  <Link to={`messageContent/${email.email}`}>
                    {email.title}
                  </Link>
                </td>
                <td className={styles.title}>
                  <Link to={`messageContent/${email.email}`}>
                    {email.massageBody}
                  </Link>
                </td>
                <td className={styles.trash}
                  onClick={() => deletion(email._id)}>
                  {<BsTrash3 />}
                </td>

                <td className={styles.date}>
                  <Link to={`messageContent/${email.email}`}>
                    {new Date(email.createDate).toLocaleDateString()}
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>
                {searchResult && searchResult.length > 0 ?
                  "no search result " :
                  'no inbox to show'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
