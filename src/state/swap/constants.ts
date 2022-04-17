import { ChainId } from '@envoysvision/sdk'
import { CURRENT_CHAIN_ID } from 'config'

// BNB
export const DEFAULT_INPUT_CURRENCY = 'BNB'

// EVT
const EVT_BY_NEY = {
  [ChainId.TESTNET]: '0x35f64b2f6824d8Be046Ac854c5E4db72f6D9cE79', // EvtToken smart conract
  [ChainId.MAINNET]: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82', // TODO: REPLACE WTH EVT MAINNET
}

export const DEFAULT_OUTPUT_CURRENCY = EVT_BY_NEY[CURRENT_CHAIN_ID]
