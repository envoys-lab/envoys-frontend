import { getAddress } from 'utils/addressHelpers'

describe('getAddress', () => {
  const address = {
    56: '0x35f64b2f6824d8Be046Ac854c5E4db72f6D9cE79',
    97: '0x75F8ADf88019E9B1d023fF4645DfAa350Bf3Fb04',
  }

  // it(`get address for mainnet (chainId 56)`, () => {
  //   process.env.NEXT_PUBLIC_CHAIN_ID = '56'
  //   const expected = address[56]
  //   expect(getAddress(address)).toEqual(expected)
  // })
  it(`get address for testnet (chainId 97)`, () => {
    process.env.NEXT_PUBLIC_CHAIN_ID = '97'
    const expected = address[97]
    expect(getAddress(address)).toEqual(expected)
  })
  // it(`get address for any other network (chainId 31337)`, () => {
  //   process.env.NEXT_PUBLIC_CHAIN_ID = '31337'
  //   const expected = address[56]
  //   expect(getAddress(address)).toEqual(expected)
  // })
})
