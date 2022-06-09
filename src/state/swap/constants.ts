import { ChainId } from '@envoysvision/sdk'
import { CURRENT_CHAIN_ID } from 'config'

// BNB
export const DEFAULT_INPUT_CURRENCY = 'BNB'

// EVT
const EVT_BY_NEY = {
  [ChainId.TESTNET]: '0x35f64b2f6824d8Be046Ac854c5E4db72f6D9cE79', // EvtToken smart conract
  [ChainId.MAINNET]: '0x75F8ADf88019E9B1d023fF4645DfAa350Bf3Fb04', // TODO: REPLACE WTH EVT MAINNET
}

export const DEFAULT_OUTPUT_CURRENCY = EVT_BY_NEY[CURRENT_CHAIN_ID]
