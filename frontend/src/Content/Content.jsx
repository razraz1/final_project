import React from "react";
import Inbox from "../Inbox/Inbox";
import Toolbar from "../Toolbar/Toolbar";
import Editing from "../Editing/Editing";
import styles from "./style.module.css";
import Outbox from "../Outbox/Outbox";
import { Route, Routes } from "react-router-dom";
import Search from "../Search/Search";
// import Outbox from '../Outbox/Outbox'

// import Editing from '../Editing/Editing'

export default function Content({data}) {
  return (
    <div className={styles.content}>
      <Toolbar />
      <Routes>
        <Route path="/inbox" element={<Inbox />} />
        <Route index element={<Inbox />} />
        <Route path="/editing" element={<Editing />} />
        <Route path="/outbox" element={<Outbox />} />
        {/* <Route path="/search" element={<Search />} /> */}
      </Routes>
    </div>
  );
}
