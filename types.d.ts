export interface Video {
	caption: string
	video: string
	_id: string
	postedBy: {
		_id: string
		userName: string
		image: string
	}
	likes: {
		postedBy: {
			_id: string
			userName: string
			image: string
		}
	}[]
	comments: {
		comment: string
		_key: string
		postedBy: {
			_ref: string
		}
	}[]
	userId: string
}
