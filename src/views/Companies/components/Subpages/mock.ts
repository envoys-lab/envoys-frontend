import { CompanyAirdropDetails, CompanySaleDetails } from '../../utils'

const twoWeeksTime = 14 * 24 * 3600 * 1000
const nowDate = new Date()
const someFutureDateTime = nowDate.getTime() + Math.random() * twoWeeksTime
const futureDate = new Date(someFutureDateTime)

const fakeAddress = '0x75F8ADf88019E9B1d023fF4645DfAa350Bf3Fb04'

const mockAirDrop: CompanyAirdropDetails = {
  airdropAddress: fakeAddress,
  totalTokens: 100000,
  allocated: 1,
  allocation: [],
  claimed: 20,
  endTime: futureDate.toDateString(),
  status: 'in process',
}

const mockSale: CompanySaleDetails = {
  saleAddress: fakeAddress,
  softCap: 45,
  hardCap: 90,
  startTime: nowDate.toDateString(),
  endTime: futureDate.toDateString(),
  pureDates: { nowDate, futureDate },
  minBuy: 1,
  maxBuy: 5,
  sold: 65,
  status: 'in process',
}

export default {
  airdrop: mockAirDrop,
  sale: mockSale,
}
