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
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82', // TODO: Replace with EVT MAINNET
    },
    token: serializedTokens.syrup,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: DefaultFarmIdentifier.EVT_BNB,
    lpSymbol: 'EVT-BNB LP',
    lpAddresses: {
      97: '0xde90D784072254Bb36D6867c5093e70b29032ffD', // TODO: Add pool identifier from MasterChef smart contract
      56: '',
    },
    token: serializedTokens.evt,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: DefaultFarmIdentifier.BUSD_BNB,
    lpSymbol: 'BUSD-BNB LP',
    lpAddresses: {
      97: '0x66eDf8072b5C46E8a069cB9b3c6cf0198532a743', // TODO: Add pool identifier from MasterChef smart contract
      56: '',
    },
    token: serializedTokens.busd,
    quoteToken: serializedTokens.wbnb,
  },
]

export default farms
