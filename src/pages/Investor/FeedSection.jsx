import React from 'react'
import PostSection from '@/src/components/investor/PostSection'
import UsersToFollow from '@/src/components/investor/UsersToFollow'
const FeedSection = () => {
  return (
    < div className='overflow-y-scroll scrollbar-hide flex flex-row pb-32' >
    <PostSection/>
    <div className='max-xl:hidden'>
    <UsersToFollow/>
    </div>
  </div>
  )
}

export default FeedSection