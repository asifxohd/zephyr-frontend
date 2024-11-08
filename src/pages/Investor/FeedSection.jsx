import React from 'react'
import PremiumCard from '@/src/components/investor/PremiumCard'
import PostSection from '@/src/components/investor/PostSection'

const FeedSection = () => {
  return (
    < div className='overflow-y-scroll flex flex-row' >
    <PostSection></PostSection>
    <PremiumCard/>
  </div>
  )
}

export default FeedSection