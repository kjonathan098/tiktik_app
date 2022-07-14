import React from 'react'
import {footerList1, footerList2, footerList3} from '../utils/constants'

const Footer = () => {
	const List = ({items, mt}: {items: string[]; mt: boolean}) => (
		<div className={`flex flex-wrap gap-2 ${mt && 'mt-5'}`}>
			{items.map((item) => {
				return (
					<p className="text-gray-400 text-sm hover:underline cursor-pointer" key={item}>
						{item}
					</p>
				)
			})}
		</div>
	)

	return (
		<div>
			<div className="mt-6 hidden xl:block ">
				<div className="flex flex-wrap gap-2 mt-5">
					<List items={footerList1} mt={false} />
					<List items={footerList2} mt={true} />
					<List items={footerList3} mt={true} />
					<p className="text-gray-400 text-sm mt-5">2022 TikTik</p>
				</div>
			</div>
		</div>
	)
}

export default Footer
