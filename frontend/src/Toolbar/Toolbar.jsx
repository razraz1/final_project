import React, { useContext, useState } from "react";
import styles from "./style.module.css";
import { IoPencil } from "react-icons/io5";
import { VscSend } from "react-icons/vsc";
import { MdInbox } from "react-icons/md";
import { LuTrash2 } from "react-icons/lu";
import { Link } from "react-router-dom";
import NewEmailOpenContext from "../context/NewEmailOpenContext";


export default function Toolbar() {
  const { newEmail, setNewEmail } = useContext(NewEmailOpenContext);

  const [isNewEmailOpen, setIsNewEmailOpen] = useState(false);

  const handleNewEmailClick = () => {
    setNewEmail(true);
  };
  return (
    <div className={styles.toolbar}>
      <button className={styles.newEmail} onClick={handleNewEmailClick}>
        <span>
          <IoPencil />
        </span>
        <span className={styles.toolbarBut}>new email</span>
      </button>

      {isNewEmailOpen && (
        <div className={styles.newEmailPopup}>
          {/* כאן תוסיף את הקוד לתיבת הטקסט לכתיבת המייל החדש */}
          <input type="text" placeholder="הכנס נושא..." />
          {/* וכל קומפוננטות נוספות שתזהה למקרה */}
        </div>
      )}

      <Link to="/inbox">
        <button className={styles.inbox}>
          <span>
            <MdInbox />
          </span>
          <span className={styles.toolbarBut}>inbox</span>
        </button>
      </Link>

      <Link to="/outbox">
        <button className={styles.sent}>
          <span>
            <VscSend />
          </span>
          <span className={styles.toolbarBut}>outbox</span>
        </button>
      </Link>

      <button className={styles.trash}>
        <span>
          <LuTrash2 />
        </span>
        <span className={styles.toolbarBut}>trash</span>
      </button>
    </div>
  );
}
