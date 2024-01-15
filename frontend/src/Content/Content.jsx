import React from "react";
import Inbox from "../Inbox/Inbox";
import Toolbar from "../Toolbar/Toolbar";
import Editing from "../Editing/Editing";
import styles from "./style.module.css";
import Outbox from "../Outbox/Outbox";
import { Route, Routes } from "react-router-dom";
// import Outbox from '../Outbox/Outbox'

// import Editing from '../Editing/Editing'

export default function Content() {
  return (
    <div className={styles.content}>
      <Toolbar />
      <Routes>
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/*" element={<Inbox />} />
        <Route path="/editing" element={<Editing />} />
        <Route path="/outbox" element={<Outbox />} />
      </Routes>
    </div>
  );
}
