import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router'
import Logout from '../../auth/Logout'
import { connect } from 'react-redux'

import header from "./header.css"
import nav from './nav.css'

class Header extends Component {
	render() {
		return <div className={header.block}>
 			<div className={header.container}>
	 			<div className={nav.row}>
	 				<div className={nav.logo}>
						<div className={nav.item}>
		 					<Link className={nav.link} to='/'>Главная</Link>
		 				</div>
	 				</div>
	 				
					{!this.props.auth.isLogged
						? <div className={nav.list}>
								<div className={nav.item}>
									<Link className={nav.link} to='/'>Регистрация</Link>
								</div>
								<div className={nav.item}>
									<Link className={nav.link} to='/'>Войти</Link>
								</div>
							</div>
						: <div className={nav.list}>
								<div className={nav.item}>
									<Link className={nav.link} to='/products'>Продукты</Link>
								</div>

								<div className={nav.item}>
									<Link className={nav.link}  to="/portions/view">Порции</Link>
								</div>
								<div className={nav.item}>
									<Logout className={nav.link} />
								</div>
							</div>
					}
	 			</div>
			</div>
		</div>
	}
}

export default connect(state => ({
	auth: state.auth
}))(Header)
