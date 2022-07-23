import React from 'react'
import {MdOutlineVideocamOff} from 'react-icons/md'
import {BiCommentX} from 'react-icons/bi'

interface IProps {
	text: string
}

const NoResults = ({text}: IProps) => {
	return (
		<div className="flex flex-col justify-center items-center h-full w-full">
			<p className="text-8xl">
				{text.length === 0 && (
					<>
						<MdOutlineVideocamOff />
						<p>No results..</p>
					</>
				)}
				{text === 'No Comments yet.. Be the first one!' && (
					<>
						<BiCommentX /> <p className="text-2xl text-center">{text}</p>
					</>
				)}
			</p>
		</div>
	)
}

export default NoResults
