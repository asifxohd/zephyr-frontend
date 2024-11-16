import PostDisplay from '@/src/components/Common/MyPosts'
import { getAllPostFromServer } from '@/src/services/api/feed'
import React, { useState, useEffect } from 'react'
import Pagination from '@/src/components/business/Pagination'


const Posts = () => {
	const [posts, setPosts] = useState([])
	const [refresh, setRefresh] = useState(false)

	const handleEdit = () => {
		setRefresh(!refresh)
	}
	const handleDelete = (postId) => {
		setPosts(posts.filter((post) => post.id !== postId))
	}
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await getAllPostFromServer();
				console.log(response);
				setPosts(response)
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
	}, [])

	return (
		<>
			<div className='text-center pb-16 text-2xl font-sans'>
				Manage Posts
			</div>
			<div className='flex justify-center items-center '>
				<div className="grid sm:grid-cols-1 md:grid-cols-2 space-x-2 lg:grid-cols-3">
					{posts.map((post) => (
							<PostDisplay
								key={post.id}
								post={post}
								onEdit={handleEdit}
								onDelete={() => handleDelete(post.id)}
							/>
						))}
				</div>
				
			</div>
			<Pagination></Pagination>
		</>
	)
}

export default Posts