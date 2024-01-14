import React from 'react'
import styles from './style.module.css'
import { IoPencil } from "react-icons/io5";
import { VscSend } from "react-icons/vsc";
import { MdInbox } from "react-icons/md";
import { LuTrash2 } from "react-icons/lu";


export default function   Toolbar() {
  return (
    <div className={styles.toolbar}>
      <button className={styles.newEmail}>
        <span><IoPencil /></span>
        <span className={styles.toolbarBut}>new email</span>
      </button>
      <button className={styles.inbox}>
        <span><MdInbox /></span>
        <span className={styles.toolbarBut}>inbox</span>
      </button>
      <button className={styles.sent}>
        <span><VscSend /></span>
        <span className={styles.toolbarBut}>outbox</span>
      </button>
      <button className={styles.trash}>
        <span><LuTrash2 /></span>
        <span className={styles.toolbarBut}>trash</span>
      </button>
    </div>
  )
}
