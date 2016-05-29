
import React from 'react'
import styles from './spinner.css'

export default function Spinner5Rect({ text }) {
	return <div className={styles.block}>
		<div className={styles.rect1}></div>
		<div className={styles.rect2}></div>
		<div className={styles.rect3}></div>
		<div className={styles.rect4}></div>
		<div className={styles.rect5}></div>
		<span className={styles.text}>{text}</span>
	</div>
}