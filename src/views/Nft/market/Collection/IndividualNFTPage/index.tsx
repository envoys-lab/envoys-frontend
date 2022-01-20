import React from 'react'
import { useParams } from 'react-router'
import { pancakeBunniesAddress } from '../../constants'
import IndividualEnvoysBunnyPage from './EnvoysBunnyPage'
import IndividualNFTPage from './OneOfAKindNftPage'

const IndividualNFTPageRouter = () => {
  // For EnvoysBunnies tokenId in url is really bunnyId
  const { collectionAddress, tokenId } = useParams<{ collectionAddress: string; tokenId: string }>()

  const isPBCollection = collectionAddress.toLowerCase() === pancakeBunniesAddress.toLowerCase()
  if (isPBCollection) {
    return <IndividualEnvoysBunnyPage bunnyId={tokenId} />
  }

  return <IndividualNFTPage collectionAddress={collectionAddress} tokenId={tokenId} />
}

export default IndividualNFTPageRouter
