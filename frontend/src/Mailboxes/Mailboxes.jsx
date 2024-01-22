import React, { useContext, useEffect, useState } from "react";
// import { BsTrash3 } from "react-icons/bs";
import styles from "./style.module.css";
import { BsTrash3 } from "react-icons/bs";
import axios from "axios";
import { Link } from "react-router-dom";
import NavigationContext from "../context/NavigationContext";

export default function Mailboxes({ searchResult }) {
  const [emails, setEmails] = useState([]);
  // const [refresh, setRefresh] = useState(false);
  // const [navigation, setNavigation] = useContext(NavigationContext)
  const { navigation } = useContext(NavigationContext);

  const [refresh, setRefresh] = useState(false);
  
  // let navigation = "Inbox";
  
  useEffect(() => {
    // let noMessage = "";
    let variable = "";
    let myData = "MY INBOX";
    if (navigation === "inbox" || navigation === "outbox" || navigation === "trash") {
      console.log(navigation,'kkkkkk');
      if (navigation === "Inbox") {
        variable = "";
        myData = "MY INBOX";
        // noMessage = "No incoming mail";
      }
      if (navigation === "outbox") {
        variable = "from/";
        myData = "MY OUTBOX";
        // noMessage = "No outgoing  mail";
      }
      if (navigation === "trash") {
        variable = "trashMail/";
        myData = "MY TRASH";
        // noMessage = "No junk mail";
      }
      // const userEmail = "jane.smith@gmail.com";
      const authToken = localStorage.getItem(token);


      axios
      .get(`http://localhost:3000/massages/${variable}`, {
      headers:{'Authorization': `Bearer ${authToken}`}
      })
      .then((res) => {
        setEmails(res.data[myData]);
      });
    } else if(navigation === "search") {
      if (searchResult && searchResult.length > 0) {
        setEmails(searchResult);
        console.log(emails);
        
      }
    }
    
  }, [navigation, searchResult]);
  
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
                <td
                  className={styles.trash}
                  onClick={() => deletion(email._id)}
                >
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
                {/* {noMessage} */}
                {/* {searchResult && searchResult.length > 0 ? "no search result " : 'no inbox'} */}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
