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
        <spen><IoPencil /></spen>
        <spen className={styles.toolbarBut}>new email</spen>
      </button>
      <button className={styles.inbox}>
        <spen><MdInbox /></spen>
        <spen className={styles.toolbarBut}>inbox</spen>
      </button>
      <button className={styles.sent}>
        <spen><VscSend /></spen>
        <spen className={styles.toolbarBut}>outbox</spen>
      </button>
      <button className={styles.trash}>
        <spen><LuTrash2 /></spen>
        <spen className={styles.toolbarBut}>trash</spen>
      </button>
    </div>
  )
}
