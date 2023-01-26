import React from 'react'
import api from '../../api/index'
import { Result, Character } from '@/types/Character'
import { GetStaticPaths, GetStaticProps } from 'next'

interface Props {
	character: Character
}

const Character = ({ character }: Props) => {
	return <div>{character.name}</div>
}
export const getStaticPaths: GetStaticPaths = async (ctx) => {
	const { data } = await api.get<Result>('/character?page=1')
	return {
		paths: data.results.map(({ id }) => ({
			params: {
				id: id.toString(),
			},
		})),
		fallback: false,
	}
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { id } = params as { id: string }
	const { data } = await api.get<Character>(`/character/${id}`)
	return {
		props: {
			character: data,
		},
	}
}

export default Character
