import React from 'react';
import {Link, NavLink} from 'react-router-dom'

import styles from './styles/Nav.module.css'

export default function nav(){
    return(
        <>
        <div className={styles.header}>
            <div className={styles.logo}>logo</div>
            <div>
                <ul className={styles.navContent}>
                    <li className={styles.navItem}>
                        <Link className={styles.navLink} exact to='/'> Home </Link>
                    </li>
                    <li className={styles.navItem}>
                    <Link className={styles.navLink} exact to='/movies'>
                   My Movies
                    </Link>
                    </li>
                </ul>
            </div>
        </div>
        </>
    )
}