import { getPersonalPosts } from '@/src/services/api/feed'
import React, { useEffect, useState } from 'react'
import PostDisplay from '@/src/components/Common/MyPosts'

const MyPosts = () => {
  const [posts, setPosts] = useState([])
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPersonalPosts()
        setPosts(response)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const handleEdit = () => {
    setRefresh(!refresh)
  }
  const handleDelete = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId))
  }

  return (
    <>
      {/* Heading */}
      {/* <div className="text-center">
        <h1 className="text-3xl font-semibold text-gray-800">My Posts</h1>
      </div> */}

      {/* Post Grid */}
      <div className="pt-5 -z-50 grid gap-6 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 pb-32">
        {posts.map((post) => (
          <PostDisplay
            key={post.id}
            post={post}
            onEdit={handleEdit}
            onDelete={() => handleDelete(post.id)}
          />
        ))}
      </div>
    </>
  )
}

export default MyPosts
