import React from 'react'
import { BsTrash3 } from "react-icons/bs";
import styles from './style.module.css'

export default function Inbox() {

    const inbox = [
        { firstName: "moshe", title: "xxxx", body: "yyyyyyyyyyyy", date: "11/01/2024" },
        { firstName: "David", title: "Title 1", body: "Content 1", date: "12/01/2024" },
        { firstName: "Sarah", title: "Title 2", body: "Content 2", date: "13/01/2024" },
        { firstName: "Avi", title: "Title 3", body: "Content 3", date: "14/01/2024" },
        { firstName: "Leah", title: "Title 4", body: "Content 4", date: "15/01/2024" },
        { firstName: "Noa", title: "Title 5", body: "Content 5", date: "16/01/2024" },
        { firstName: "Yossi", title: "Title 6", body: "Content 6", date: "17/01/2024" },
        { firstName: "Maya", title: "Title 7", body: "Content 7", date: "18/01/2024" },
        { firstName: "Amit", title: "Title 8", body: "Content 8", date: "19/01/2024" },
        { firstName: "Dina", title: "Title 9", body: "Content 9", date: "20/01/2024" },
        { firstName: "Or", title: "Title 10", body: "Content 10", date: "21/01/2024" },
        { firstName: "moshe", title: "xxxx", body: "yyyyyyyyyyyy", date: "11/01/2024" },
        { firstName: "David", title: "Title 1", body: "Content 1", date: "12/01/2024" },
        { firstName: "Sarah", title: "Title 2", body: "Content 2", date: "13/01/2024" },
        { firstName: "Avi", title: "Title 3", body: "Content 3", date: "14/01/2024" },
        { firstName: "Leah", title: "Title 4", body: "Content 4", date: "15/01/2024" },
        { firstName: "Noa", title: "Title 5", body: "Content 5", date: "16/01/2024" },
        { firstName: "Yossi", title: "Title 6", body: "Content 6", date: "17/01/2024" },
        { firstName: "Maya", title: "Title 7", body: "Content 7", date: "18/01/2024" },
        { firstName: "Amit", title: "Title 8", body: "Content 8", date: "19/01/2024" },
        { firstName: "Dina", title: "Title 9", body: "Content 9", date: "20/01/2024" },
        { firstName: "Or", title: "Title 10", body: "Content 10", date: "21/01/2024" }
    ];


    return (
        <div className={styles.inbox}>
            <table >
                {inbox.map(email =>
                    <tr>
                        <td className={styles.name}> {email.firstName} </td>
                        <td className={styles.title}> {email.title} </td>
                        <td className={styles.trash}> {<BsTrash3 />} </td>
                        <td className={styles.date}> {email.date} </td>
                    </tr>
                )}

            </table>


        </div>
    )
}
