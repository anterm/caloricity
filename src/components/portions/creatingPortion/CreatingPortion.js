import React, { Component } from 'react';

import Calendar from './calendar/Calendar'
import PortionList from './portionList/PortionList'
import Popups from './popups/Popups'

import styles from './creatingPortion.css'

export default class CreatingPortion extends Component {
	state = {
		popup: {
			name: 'hide',
			data: null
		}
	};

	render() {
		const { portions, userId, actions, date, products } = this.props

		return <div className={styles.block}>
			<Popups 
				userId={userId}
				date={date}
				popup={this.state.popup} 
				popupAction={this.popup} 
				products={products}
				actions={actions} />

			<Calendar 
				date={date} 
				popup={this.popup}
				handleOnChange={this.changeDate} />

			<PortionList 
				date={date}
				popup={this.popup}
				portions={portions} />
		</div>
	}

	popup = (name, data) => {
		this.setState({ 
			popup: {
				name,
				data
			}
		})
	};

	changeDate = (date) => {
		this.props.router.push("/portions/edit/" + date.format("YYYY-MM-DD"))
	};
}