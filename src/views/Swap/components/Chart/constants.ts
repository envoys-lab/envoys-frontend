import { ChainId } from '@envoysvision/sdk'
import { CURRENT_CHAIN_ID } from 'config'

// BNB Address

const BNB_BY_NET = {
  [ChainId.TESTNET]: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd', // 'TESTNET WBNB',
  [ChainId.MAINNET]: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
}

const BNB_ADDRESS = BNB_BY_NET[CURRENT_CHAIN_ID]

export { BNB_ADDRESS }
