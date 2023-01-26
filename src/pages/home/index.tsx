import React from 'react'
import api from '../../api/index'
import { GetStaticProps, NextPage } from 'next'
import { Character, Result } from '../../types/Character'

interface Props {
	characters: Character[]
}

const HomePage: NextPage<Props> = ({ characters }) => {
	console.log(characters)
	return (
		<div>
			{characters.map((character) => (
				<div key={character.id}>
					<h1>{character.name}</h1>
				</div>
			))}
		</div>
	)
}

export const getStaticProps: GetStaticProps = async (ctx) => {
	const { data } = await api.get<Result>('/character')
	return {
		props: {
			characters: data.results,
		},
	}
}

export default HomePage
