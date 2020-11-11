import React, { useContext, useEffect, useState } from 'react'
import bemCssModules from 'bem-css-modules'

import Modal from '../Modal/Modal'
import { default as LoginFormStyles } from './LoginForm.module.scss'
import { StoreContext } from '../../store/StoreProvider'
import request from '../../helpers/request'

const style = bemCssModules(LoginFormStyles)

const LoginForm = ({ handleOnClose, isModalOpen }) => {
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [validateMessage, setValidateMessage] = useState('')

	const { setUser } = useContext(StoreContext)

	const resetStateofInputs = () => {
		setLogin('')
		setPassword('')
		setValidateMessage('')
	}

	const handleOnChangeLogin = ({ target: { value } }) => setLogin(value)
	const handleOnChangePassword = ({ target: { value } }) => setPassword(value)
	const handleOnCloseModal = e => {
		e.preventDefault()
		handleOnClose()
	}

	const handleOnSubmit = async e => {
		e.preventDefault()

		const { data, status } = await request.post('/users', { login, password })

		if (status === 200) {
			setUser(data.user)
			resetStateofInputs()
			handleOnClose()
		} else {
			setValidateMessage(data.message)
		}
	}

	useEffect(() => {
		if (isModalOpen) {
			resetStateofInputs()
		}
	}, [isModalOpen])

	const validateMessageComponent = validateMessage.length ? (
		<p className={style('validateMessage')}>{validateMessage}</p>
	) : null

	return (
		<Modal isOpen={isModalOpen} handleOnClose={handleOnClose} shouldBeCloneOnOutsideClick={true}>
			{validateMessageComponent}
			<form className={style()} method="post" onSubmit={handleOnSubmit}>
				<div className={style('row')}>
					<label>
						Login:
						<input type="text" value={login} onChange={handleOnChangeLogin} />
					</label>
				</div>
				<div className={style('row')}>
					<label>
						Hasło:
						<input type="password" value={password} onChange={handleOnChangePassword} />
					</label>
				</div>
				<div className={style('row')}>
					<button type="submit">Zaloguj</button>
					<button type="button" onClick={handleOnCloseModal}>
						Anuluj
					</button>
				</div>
			</form>
		</Modal>
	)
}

export default LoginForm
