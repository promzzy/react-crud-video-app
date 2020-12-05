import React from 'react';
import styles from './styles/PageLayout.module.css'
import Nav from '../shared/Nav.js'
export default function PageLayout(props){
    return(
        <div>
            <Nav />
            {props.children}
        </div>
    )
}