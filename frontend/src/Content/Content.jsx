import React from 'react'
import Inbox from '../Inbox/Inbox'
import Toolbar from '../Toolbar/Toolbar'
import Editing from '../Editing/Editing'
import styles from './style.module.css'

// import Editing from '../Editing/Editing'

export default function Content() {
    return (
        <div className={styles.content}>
            <Toolbar />
            <Inbox />
            {/* <Editing /> */}
        </div>
    )
}
