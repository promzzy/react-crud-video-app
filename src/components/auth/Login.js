import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import styles from './styles/Login.module.css'

export default function Login(){
    return(
        <>
        <form className={styles.form}>
        <div className={styles.formContainer}>


        <h3>Please sign in to your account below.</h3>
        <div className={styles.inputContainer}>
            <label className={styles.label}>Email</label>
            <input type="email" className={styles.input} />
        </div>

        <div className={styles.inputContainer}>
            <label className={styles.label}>Password</label>
            <input type="password" className={styles.input} />
        </div>
        <button className={styles.button}>Login</button>

        
       </div>
       
       </form>
   </>
    )  
};
