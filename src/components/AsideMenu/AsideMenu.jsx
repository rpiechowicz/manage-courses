import React, { useContext } from 'react'
import bemCssModule from 'bem-css-modules'

import UserMenu from './subcomponents/UserMenu'
import AdminMenu from './subcomponents/AdminMenu'

import { default as AsideMenuStyles } from './AsideMenu.module.scss'
import { StoreContext } from '../../store/StoreProvider'

const style = bemCssModule(AsideMenuStyles)

const ADMIN_TYPE = 1

const AsideMenu = () => {
	const { user } = useContext(StoreContext)

	const adminMenuComponent = user && user.accessLevel === ADMIN_TYPE ? <AdminMenu /> : null
	console.log(adminMenuComponent)

	return (
		<section className={style()}>
			<div className={style('nav-wrapper')}>
				<UserMenu isUserLogged={Boolean(user)} />
				{adminMenuComponent}
			</div>
		</section>
	)
}

export default AsideMenu
