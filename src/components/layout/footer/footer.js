import React, {Component, PropTypes} from 'react'
import styles from './footer.css'

export default class Footer extends Component {
 	render() {
 		return <div className={styles.block}>
 			<div className={styles.container}>
 				<span className={styles.copyright}>Антон Ермалёнок. 2016 год.</span>
 			</div>
 		</div>
 	}
 	
 	shouldComponentUpdate() {
		return false
	}
}