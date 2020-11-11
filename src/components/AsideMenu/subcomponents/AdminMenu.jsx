import React from 'react'
import bemCssModules from 'bem-css-modules'
import { Link } from 'react-router-dom'

import { default as AisdeMenuStyles } from '../AsideMenu.module.scss'

const style = bemCssModules(AisdeMenuStyles)

const AdminMenu = () => {
	return (
		<>
			<p className={style('title')}>Panel administratora</p>
			<nav>
				<ul>
					<li className={style('link')}>
						<Link to="/manage-courses">Zarzadzanie kursami</Link>
					</li>
				</ul>
			</nav>
		</>
	)
}

export default AdminMenu
