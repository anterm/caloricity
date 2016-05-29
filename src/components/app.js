import React, {Component, PropTypes} from 'react'

if(IS_CLIENT) {
	require("./normalize.css")
	require("./base.css")
}

const Header = require('./layout/header/header').default
const Footer = require('./layout/footer/footer').default

export default class App extends Component {
 	render() {
 		return <div className="application">
 			<Header />
 			{this.props.children}
 			<Footer />
 		</div>
 	}
}