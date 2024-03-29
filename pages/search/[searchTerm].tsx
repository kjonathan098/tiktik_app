import axios from 'axios'
import React, {useState} from 'react'
import {BASE_URL} from '../../utils'
import Link from 'next/link'
import {useRouter} from 'next/router'
import Image from 'next/image'
import {GoVerified} from 'react-icons/go'

import VideoCard from '../../components/VideoCard'
import NoResults from '../../components/NoResults'
import useAuthStore from '../../store/authStore'
import {IUser, Video} from '../../types'
import {UserInfo, userInfo} from 'os'

interface IProps {
	videos: Video[]
}

const Search = ({videos}: IProps) => {
	const [isAccounts, setisAccounts] = useState(false)

	const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400'
	const isVideos = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400'

	const router = useRouter()
	const {searchTerm}: any = router.query

	const {allUsers} = useAuthStore()
	const searchedAccounts = allUsers.filter((user: IUser) => user.userName.toLowerCase().includes(searchTerm.toLowerCase()))

	return (
		<div className="w-full">
			<div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
				<p
					className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`}
					onClick={() => {
						setisAccounts(true)
					}}
				>
					Accounts
				</p>
				<p
					className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`}
					onClick={() => {
						setisAccounts(false)
					}}
				>
					Videos
				</p>
			</div>
			{isAccounts ? (
				<div className="md:mt-16">
					{searchedAccounts.length > 0 ? (
						searchedAccounts.map((user: IUser, idx: number) => (
							<Link key={idx} href={`/profile/${user._id}`}>
								<div className=" flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200">
									<div>
										<Image width={50} height={50} className="rounded-full" alt="user-profile" src={user.image} />
									</div>
									<div>
										<div>
											<p className="flex gap-1 items-center text-lg font-bold text-primary">
												{user.userName} <GoVerified className="text-blue-400" />
											</p>
											<p className="capitalize text-gray-400 text-sm">{user.userName}</p>
										</div>
									</div>
								</div>
							</Link>
						))
					) : (
						<NoResults text={`No Account Results for ${searchTerm}`} />
					)}
				</div>
			) : (
				<div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">{videos.length ? videos.map((post: Video, idx: number) => <VideoCard post={post} key={idx} />) : <NoResults text={`No Videos results for ${searchTerm} `} />}</div>
			)}
		</div>
	)
}

export const getServerSideProps = async ({params: {searchTerm}}: {params: {searchTerm: string}}) => {
	const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`)
	return {
		props: {videos: res.data},
	}
}

export default Search
