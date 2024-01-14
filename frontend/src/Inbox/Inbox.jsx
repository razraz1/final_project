import React, { useEffect, useState } from "react";
// import { BsTrash3 } from "react-icons/bs";
import styles from "./style.module.css";
import { BsTrash3 } from "react-icons/bs";
// import { IconName } from 'react-icons/sl';
import axios from "axios";

export default function Inbox() {
  const [emails, setEmails] = useState([]);
  const inbox = [
    {
      id: 1,
      firstName: "moshe",
      title: "xxxx",
      body: "yyyyyyyyyyyy",
      date: "11/01/2024",
    },
    {
      id: 2,
      firstName: "David",
      title: "Title 1",
      body: "Content 1",
      date: "12/01/2024",
    },
    {
      id: 3,
      firstName: "Sarah",
      title: "Title 2",
      body: "Content 2",
      date: "13/01/2024",
    },
  ];


  // useEffect(() => {
  //   const userEmail = "emily.davis@gmail.com";
  //   axios.get(`http://localhost:3000/massages/` + userEmail).then((res) => {
  //     setEmails(res.data);
  //   });
  // }, []);

  console.log(emails);
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
