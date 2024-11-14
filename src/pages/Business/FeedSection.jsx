import React from 'react'
import PostSection from '../../components/investor/PostSection'
import UsersToFollow from '@/src/components/investor/UsersToFollow'
const FeedSection = () => {  
  return (
    < div className=' space-x-6 flex flex-row' >
      <PostSection/>
      <div className='max-xl:hidden' >
        <UsersToFollow/>
      </div>
    </div>
  )
}

export default FeedSection