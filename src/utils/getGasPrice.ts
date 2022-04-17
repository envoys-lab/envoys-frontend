import { ChainId } from '@envoysvision/sdk'
import { CURRENT_CHAIN_ID } from 'config'
import store from 'state'
import { GAS_PRICE_GWEI } from 'state/user/hooks/helpers'

/**
 * Function to return gasPrice outwith a react component
 */
const getGasPrice = (): string => {
  const state = store.getState()
  const userGas = state.user.gasPrice || GAS_PRICE_GWEI.default
  return CURRENT_CHAIN_ID === ChainId.MAINNET ? userGas : GAS_PRICE_GWEI.testnet
}

export default getGasPrice
