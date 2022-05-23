import { ChainId } from '@envoysvision/sdk'

const NETWORK_URLS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: process.env.NEXT_PUBLIC_NODE_PRODUCTION,
  [ChainId.TESTNET]: process.env.NEXT_PUBLIC_NODE_PRODUCTION,
}

export default NETWORK_URLS
