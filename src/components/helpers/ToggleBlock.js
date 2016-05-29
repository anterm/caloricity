import React, { Component } from 'react';

export default class ToogleBlock extends Component {
	state = {
		isHidden: this.props.hide
	};

	render() {
		const { isHidden } = this.state
		const controlText = isHidden ? "Показать" : "Скрыть"
		const { title, styles, children, portion } = this.props
		const bodycss = styles.body + (isHidden ? " hidden" : "")
		const iconcss = styles.icon_chevron + (isHidden ? "" : " rotate90deg")
		var header_right_text;

		if(portion) {
			header_right_text = <div className={isHidden ? " hidden" : ""}>
				<span className={styles.header_text}>{portion.date.substr(11, 5)}</span>
				<span className={styles.header_text}>({portion.eats.length})</span>
			</div>
		}

		return <div>
			<div className={styles.header}>
				<div className={styles.header_row}>
					<div className={styles.header_left}>
						<a className={styles.link} onClick={this.toggle} href='#'>
							<span className={iconcss}></span>
							<span className={styles.link_text}>{controlText}</span>
						</a>
						<span className={styles.title}>{title}</span>
					</div>
					<div className={styles.header_right}>
						{header_right_text}
					</div>
				</div>
			</div>

			<div className={bodycss}>{children}</div>
		</div>
	}

	toggle = (e) => {
		e.preventDefault()
		this.setState({isHidden: !this.state.isHidden})
	};
}
