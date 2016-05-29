import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'

import { auth } from '../../actions/auth'
import { fetch as fetchPortions } from '../../actions/allPortions'

import UserStat from './userStat/UserStat'
import AuthForm from './authForm/AuthForm'
import Loading from '../helpers/loading/Loading'

import styles from './main.css'

import request from 'superagent'

class Main extends Component {
	render() {
		const { actions, allPortions, auth } = this.props
		
		return <div className={styles.bg_gradient}>
			<div className={styles.bg_color}>
				<div className={styles.container}>
					<div className={styles.row}>
						{this.props.auth.isLogged 
							? <Loading data={allPortions} spinnerText="Загрузка статистики">
									<UserStat 
										userName={auth.username}
										data={allPortions} />
								</Loading>
							: <AuthForm 
									auth={auth}
									actions={actions.auth} />
						}
					</div>
				</div>
			</div>
		</div>
	}
	
	componentWillReceiveProps(nextProps) {
		const { userId } = nextProps.auth 
		if(userId && (userId !== this.props.auth.userId)) {
			const redirect = this.props.location.query.redirect
			if(redirect)
				return this.context.router.replace(redirect)	
			
			this.props.actions.fetchPortions(userId)
		}
	}
	
	componentDidMount() {
		const { auth, actions, allPortions } = this.props
		
		if(!auth.isLogged) 
			return
		
		const redirect = this.props.location.query.redirect
		if(redirect) 
			return this.context.router.replace(redirect)	
			
		if(allPortions.status !== 'fulfilled')
			actions.fetchPortions(auth.userId)
	}
}

Main.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default connect(
	state => ({
		auth: state.auth,
		allPortions: state.portions.all 
	}),
	dispatch => ({
		actions: {
			auth: {
				request: (type, data) => dispatch(auth(type, data)),
				reject: errors => dispatch({ type: "CLIENT_LOGIN_FAILURE", errors })
			},
			fetchPortions: (userId) => dispatch(fetchPortions(userId))
		}
	})
)(Main)