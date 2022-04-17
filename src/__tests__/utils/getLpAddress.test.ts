import { ChainId, Token } from '@envoysvision/sdk'
import getLpAddress from 'utils/getLpAddress'

const EVT_AS_STRING = '0x35f64b2f6824d8Be046Ac854c5E4db72f6D9cE79'
const BNB_AS_STRING = '0xae13d989dac2f0debff460ac112a837c89baa7cd'
const EVT_AS_TOKEN = new Token(ChainId.TESTNET, EVT_AS_STRING, 18)
const BNB_AS_TOKEN = new Token(ChainId.TESTNET, BNB_AS_STRING, 18)
const EVT_BNB_LP = '0xde90D784072254Bb36D6867c5093e70b29032ffD'

describe('getLpAddress', () => {
  it('returns correct LP address, both tokens are strings', () => {
    expect(getLpAddress(EVT_AS_STRING, BNB_AS_STRING)).toBe(EVT_BNB_LP)
  })
  it('returns correct LP address, token1 is string, token 2 is Token', () => {
    expect(getLpAddress(EVT_AS_STRING, BNB_AS_TOKEN)).toBe(EVT_BNB_LP)
  })
  it('returns correct LP address, both tokens are Token', () => {
    expect(getLpAddress(EVT_AS_STRING, BNB_AS_TOKEN)).toBe(EVT_BNB_LP)
  })
  it('returns null if any address is invalid', () => {
    expect(getLpAddress('123', '456')).toBe(null)
    expect(getLpAddress(undefined, undefined)).toBe(null)
    expect(getLpAddress(EVT_AS_STRING, undefined)).toBe(null)
    expect(getLpAddress(undefined, BNB_AS_TOKEN)).toBe(null)
    expect(getLpAddress(EVT_AS_STRING, '456')).toBe(null)
    expect(getLpAddress('123', BNB_AS_TOKEN)).toBe(null)
  })
})
