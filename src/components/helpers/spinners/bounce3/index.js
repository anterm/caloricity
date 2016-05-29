import React from 'react'
import styles from './spinner.css'

export default function Spinner3Bounces({ text }) {
	return <div className={styles.block}>
		<div className={styles.bounce1}></div>
		<div className={styles.bounce2}></div>
		<div className={styles.bounce3}></div>
		<span className={styles.text}>{text}</span>
	</div>
}