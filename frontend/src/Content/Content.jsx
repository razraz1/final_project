import React, { useContext } from "react";
import Inbox from "../Inbox/Inbox";
import Toolbar from "../Toolbar/Toolbar";
import Editing from "../Editing/Editing";
import styles from "./style.module.css";
import Outbox from "../Outbox/Outbox";
import { Route, Routes } from "react-router-dom";
import NewEmailOpenContext from "../context/NewEmailOpenContext";
import { IoCloseSharp } from "react-icons/io5";
// import Outbox from '../Outbox/Outbox'

// import Editing from '../Editing/Editing'

export default function Content(props) {

  const { newEmail, setNewEmail } = useContext(NewEmailOpenContext);
  return (
    <div className={styles.content}>
      <Toolbar />
      <Routes>
        <Route path="/inbox" element={<Inbox searchResult={props.searchResult} />} />
        <Route index element={<Inbox />} />
        <Route path="/editing" element={<Editing />} />
        <Route path="/outbox" element={<Outbox searchResult={props.searchResult} />} />
        {/* <Route path="/search" element={<Search />} /> */}
      </Routes>
      {newEmail && (
        <div className={styles.newEmail}>
          <div className={styles.email}>
            <div>new message</div>
            <button onClick={ () => setNewEmail(false)}>
              <IoCloseSharp />
            </button>
          </div>
          <input type="text" className={styles.to} placeholder="to" />
          <input type="text" className={styles.title} placeholder="Topic" />
          <input type="text" className={styles.body} />
          <button>send</button>
        </div>
      )}
    </div>
  );
}
