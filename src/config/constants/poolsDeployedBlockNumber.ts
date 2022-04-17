import { ChainId } from '@envoysvision/sdk'
import { CURRENT_CHAIN_ID } from 'config'
import { PoolDeployedBlockNumber } from './types'

const poolsDeployedBlockNumberMAINNET: PoolDeployedBlockNumber = {
  '0x2061037E588b66Ef8379E1E5216D10bb26e07106': 18467024, // Update with MAINNET EVT
}

const poolsDeployedBlockNumberTESTNET: PoolDeployedBlockNumber = {
  '0x2061037E588b66Ef8379E1E5216D10bb26e07106': 18467024, // Update with TESTNET EVT
}

const BY_NET = {
  [ChainId.MAINNET]: poolsDeployedBlockNumberMAINNET,
  [ChainId.TESTNET]: poolsDeployedBlockNumberTESTNET,
}

const poolsDeployedBlockNumber = BY_NET[CURRENT_CHAIN_ID]

export default poolsDeployedBlockNumber
