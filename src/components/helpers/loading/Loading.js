import React, { Component } from 'react'
import Spinner from '../spinners/bounce3'
import styles from './loading.css'

export default class Loading extends Component {
	render() {
		const { data, children } = this.props
		const css = data.status === "fulfilled" || data.status === 'empty'
			? "" : "notVisible"
			
		return <div>
			<div className={css}>
				{children}
			</div>
			{this.renderLoadingStatus()}
		</div>
	}

	renderLoadingStatus() {
		const { data, spinnerText } = this.props
		switch(data.status) {
			case "pending":
				return <div className={styles.pending}>
					<Spinner text={spinnerText} />
				</div>

			case "rejected":
				var error = "Произошла ошибка"
				if(data.error) error += ": " + data.error
				return <div className={styles.errors}>{error}</div>

			default:
				return null
		}
	}
}