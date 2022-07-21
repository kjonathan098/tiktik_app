import React, {useEffect, useState} from 'react'
import {SanityAssetDocument} from '@sanity/client'
import {useRouter} from 'next/router'
import {FaCloudUploadAlt} from 'react-icons/fa'
import {MdDelete} from 'react-icons/md'
import axios from 'axios'
import {topics} from '../utils/constants'

import useAuthStore from '../store/authStore'
import {client} from '../utils/client'
import {BASE_URL} from '../utils'

const Upload = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>()
	const [wrongFileType, setWrongFileType] = useState(false)
	const [caption, setCaption] = useState('')
	const [category, setCategory] = useState(topics[0].name)
	const [savingPost, setSavingPost] = useState(false)
	const {userProfile}: {userProfile: any} = useAuthStore()
	const router = useRouter()

	const uploadVideo = async (e: any) => {
		setIsLoading(true)
		setWrongFileType(false)
		const seletedFile = e.target.files[0]
		const fileType = ['video/mp4', 'video/webm', 'video/ogg']

		if (!fileType.includes(seletedFile.type)) {
			setIsLoading(false)
			setWrongFileType(true)
			return
		}

		const data = await client.assets.upload('file', seletedFile, {
			contentType: seletedFile.type,
			filename: seletedFile.name,
		})
		setVideoAsset(data)
		setIsLoading(false)
	}

	const handlePost = async () => {
		if (!caption.length || !videoAsset?._id || !category) return console.log('not good xs')

		setSavingPost(true)

		const document = {
			_type: 'post',
			caption,
			video: {
				_type: 'file',
				asset: {
					_type: 'reference',
					_ref: videoAsset?._id,
				},
			},
			userId: userProfile?._id,
			postedBy: {
				_type: 'postedBy',
				_ref: userProfile?._id,
			},
			topic: category,
		}

		await axios.post(`${BASE_URL}/api/post`, document)
		router.push('/')
	}
	return (
		<div className="flex w-full h-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#f8f8f8] justify-center">
			<div className="bg-white rounded-lg bg-white rounded-lg xl:h-[80vh] flex gap-6 flex-wrap justify-between items-center p-14 pt-6 w-[60%]">
				<div className="">
					<div>
						<p className="text-2xl font-bold">Upload Video</p>
						<p className="text-md text-gray-400 mt-1">Post a video to your account</p>
					</div>
					<div className=" border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center  outline-none mt-10 w-[260px] h-[458px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100">
						{isLoading ? (
							<p className="text-center text-3xl text-red-400 font-semibold">Uploading...</p>
						) : (
							<div>
								{!videoAsset ? (
									<label className="cursor-pointer">
										<div className="flex flex-col items-center justify-center h-full">
											<div className="flex flex-col justify-center items-center">
												<p className="font-bold text-xl">
													<FaCloudUploadAlt className="text-gray-300 text-6xl" />
												</p>
												<p className="text-xl font-semibold">Select video to upload</p>
											</div>

											<p className="text-gray-400 text-center mt-10 text-sm leading-10">
												MP4 or WebM or ogg <br />
												720x1280 resolution or higher <br />
												Up to 10 minutes <br />
												Less than 2 GB
											</p>
											<p className="bg-[#F51997] text-center mt-8 rounded text-white text-md font-medium p-2 w-52 outline-none">Select file</p>
										</div>
										<input type="file" name="upload-video" onChange={(e) => uploadVideo(e)} className="w-0 h-0" />{' '}
									</label>
								) : (
									<div className=" rounded-3xl w-[300px]  p-4 flex flex-col gap-6 justify-center items-center">
										<video src={videoAsset.url} loop controls className="rounded-xl h-[450px]  bg-black"></video>
									</div>
								)}
							</div>
						)}
						{wrongFileType && <p className="text-center text-xl text-red-400 font-semibold mt-4 w-[250px] ">File Type Not supported </p>}
					</div>
				</div>
				<div className="flex flex-col gap-3 pb-10">
					<label className="text-md font-medium">Caption</label>
					<input
						type="text"
						value={caption}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setCaption(e.target.value)
						}}
						className="rounded outline-none text-md border-2 border-gray-200 p-2"
					/>
					<label className="text-md font-medium">Choose a Categorie</label>
					<select
						onChange={(e) => {
							setCategory(e.target.value)
						}}
						className="outline-none border-2 border-gray-200 text-md capitalized lg:p-4 p-2 rounder cursor-pointer"
					>
						{topics.map((topic) => (
							<option key={topic.name} className="outline-none capitalized bg-white text-gray-600 text-md p-2 hover:bg-slate-300" value={topic.name}>
								{topic.name}
							</option>
						))}
					</select>
					<div className="flex gap-6 mt-10 ">
						<button onClick={() => {}} type="button" className="border-gray-300 border-2 text-md font-medium rounded w-28 lg:w-44 outline-none ">
							Discard
						</button>
						<button onClick={handlePost} type="button" className="bg-[#f51997] text-white text-md font-medium rounded w-28 lg:w-44 outline-none ">
							Post
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Upload
