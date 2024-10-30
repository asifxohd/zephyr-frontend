import React from 'react'
import PostSection from '../../components/investor/PostSection'
import PremiumCard from '../../components/investor/PremiumCard'
const FeedSection = () => {
  return (
    < div className='overflow-y-scroll flex flex-row' >
      <PostSection></PostSection>
      <PremiumCard/>
    </div>
  )
}

export default FeedSection