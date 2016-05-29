import React, { Component } from 'react';

import DatePicker from 'react-datepicker'
import styles from './calendar.css'

import moment from "moment"
import "moment/locale/ru"
moment.locale('ru')

if(IS_CLIENT) {
	require('react-datepicker/dist/react-datepicker.css')
}

export default class Calendar extends Component {
	render() {
		const { date, handleOnChange, popup } = this.props
		const momentDate = typeof date === 'string' ? moment(date) : date
		
		return <div id='calendar_header'>
			<div className={styles.block}>
				<div className={styles.container}>
					<button className={styles.addPortion} onClick={() => popup('new_portion', date)}>Новая порция</button>
					<div className={styles.component}>
						<DatePicker 
							ref="datepicker"
							selected={momentDate}
							weekdays={moment.weekdaysShort()}
							locale="ru"
							onChange={handleOnChange} />
					</div>
				</div>
			</div>
		</div>
	}

	componentDidMount() {
		const name = styles.block.split(/\s/)[0]
		const elem = document.querySelector("." + name)
		if(!elem) return

		const calendar_header = document.getElementById("calendar_header")
		const elemRect = elem.getBoundingClientRect()

		const targetPos = elemRect.top + window.pageYOffset
		var fixed = false

		window.addEventListener('scroll', () => {
			let windowPos = window.pageYOffset
			if(!fixed && (windowPos >= targetPos)) {
				elem.classList.add("fixed")
				calendar_header.style.height = elemRect.height + "px"
				fixed = true
			} else if(fixed && (windowPos < targetPos)) {
				elem.classList.remove("fixed")
				calendar_header.style.height = ""
				fixed = false
			}
		})
	}
}
