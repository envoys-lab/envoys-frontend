import { serializeTokens } from './tokens'
import { SerializedFarmConfig } from './types'

const serializedTokens = serializeTokens()

export enum DefaultFarmIdentifier {
  EVT = 0,
  EVT_BNB = 1,
  BUSD_BNB = 2,
}

const farms: SerializedFarmConfig[] = [
  /**
   * These 3 farms (PID 0, 1, 2) should always be at the top of the file.
   */
  {
    pid: DefaultFarmIdentifier.EVT,
    lpSymbol: 'EVT',
    lpAddresses: {
      97: '0x35f64b2f6824d8Be046Ac854c5E4db72f6D9cE79', // 0x2061037E588b66Ef8379E1E5216D10bb26e07106
      56: '0x75F8ADf88019E9B1d023fF4645DfAa350Bf3Fb04', // TODO: Replace with EVT MAINNET
    },
    token: serializedTokens.syrup,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: DefaultFarmIdentifier.EVT_BNB,
    lpSymbol: 'EVT-BNB LP',
    lpAddresses: {
      97: '0xde90D784072254Bb36D6867c5093e70b29032ffD', // TODO: Add pool identifier from MasterChef smart contract
      56: ' 0x2206ca84db75ae620400ba7e54b7c59d6fdcf950',
    },
    token: serializedTokens.evt,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: DefaultFarmIdentifier.BUSD_BNB,
    lpSymbol: 'BUSD-BNB LP',
    lpAddresses: {
      97: '0x66eDf8072b5C46E8a069cB9b3c6cf0198532a743', // TODO: Add pool identifier from MasterChef smart contract
      56: '0x58332999bdcef7acb1e82029262661e27de174c4',
    },
    token: serializedTokens.busd,
    quoteToken: serializedTokens.wbnb,
  },
]

export default farms
