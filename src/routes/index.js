import React from 'react'
import styles from './styles/index.module.css'
import desktop from '../resources/banner.jpg'
import PageLayout from '../components/layouts/PageLayout.js'
import Login from '../components/auth/Login.js'
import Nav from '../components/shared/Nav.js'

export default function HomePage(){
    return(
        <>
        <div className={styles.home}>

        <Login />
            
        </div>
        </>
)}