import React from 'react'
import { HashRouter as Router } from 'react-router-dom'

import StoreProvider from './store/StoreProvider'
import Header from './components/Header/Header'
import AsideMenu from './components/AsideMenu/AsideMenu'

import './App.scss'
import { HashRouter } from 'react-router-dom'

const App = () => {
	return (
		<StoreProvider>
			<Header />
			<Router>
				<div className="content-wrapper">
					<AsideMenu />
				</div>
			</Router>
		</StoreProvider>
	)
}

export default App
