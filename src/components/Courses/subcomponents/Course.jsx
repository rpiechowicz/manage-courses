import React, { useContext } from 'react'
import bemCssModules from 'bem-css-modules'

import { default as CourseStyle } from './Course.module.scss'
import request from '../../../helpers/request'
import { StoreContext } from '../../../store/StoreProvider'
import { useHistory } from 'react-router-dom'

const style = bemCssModules(CourseStyle)

const Course = ({ authors, id, img, isUserContext = false, price, title }) => {
	const { user, setUser } = useContext(StoreContext)
	const history = useHistory()

	const isUserLogged = Boolean(user)
	const allAuthors = authors.join(', ')

	const handleClick = async () => {
		try {
			const { data, status } = await request.patch('/users', { login: user.login, courseId: id })

			if (status === 202) {
				setUser(data.user)
				history.push('/my-courses')
			}
		} catch (error) {
			console.warn(error)
		}
	}

	const shouldBeBuyButton = isUserLogged && !isUserContext

	return (
		<li>
			<article className={style()}>
				<h3 className={style('title')}>{title}</h3>
				<img src={img} alt={title} className={style('image')} />
				<p className={style('price')}>{`Kosz kursu: ${price} złotych`}</p>
				<p className={style('authors')}>{`Autorzy kursu: ${allAuthors}`}</p>
				{shouldBeBuyButton && <button onClick={handleClick}>Kup ten kurs</button>}
			</article>
		</li>
	)
}

export default Course
