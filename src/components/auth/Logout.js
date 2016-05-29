import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router'
import { logout } from '../../actions/auth'
import { setDefaultState as defaultProductState } from '../../actions/products'
import { setDefaultState as defaultDayPortionState } from '../../actions/dayPortions'
import { setDefaultState as defaultAllPortionState } from '../../actions/allPortions'

import { connect } from 'react-redux'

class Logout extends Component {
	render() {
		return <Link className={this.props.className} to="/" onClick={() => this.handle()}>Выйти</Link>
	}

	handle() {
		this.props.dispatch(logout())
		this.props.dispatch(defaultDayPortionState())
		this.props.dispatch(defaultAllPortionState())
		this.props.dispatch(defaultProductState())
	}
}

export default connect()(Logout)