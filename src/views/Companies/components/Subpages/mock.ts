import { CompanyAirdropDetails, CompanyQuest, CompanySaleDetails } from '../../utils'

const twoWeeksTime = 14 * 24 * 3600 * 1000
const nowDate = new Date()
const someFutureDateTime = nowDate.getTime() + Math.random() * twoWeeksTime
const futureDate = new Date(someFutureDateTime)

const fakeAddress = '0x75F8ADf88019E9B1d023fF4645DfAa350Bf3Fb04'

const mockAirDrop: CompanyAirdropDetails = {
  airdropAddress: fakeAddress,
  totalTokens: 100000,
  maxClaim: 99,
  minClaim: 1,
  claimed: 33,
  yourClaim: 7,
  allocations: [],
  endTime: futureDate.toDateString(),
  status: 'inprogress',
}

const mockSale: CompanySaleDetails = {
  saleAddress: fakeAddress,
  softCap: 45,
  hardCap: 90,
  startTime: nowDate.toDateString(),
  endTime: futureDate.toDateString(),
  pureDates: { nowDate, futureDate },
  minBuy: 1,
  maxBuy: 49,
  sold: 65,
  toSell: 99,
  status: 'inprogress',
}

const mockQuests: CompanyQuest[] = [
  {
    id: Math.random().toString(),
    question:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.',
    buttonLabel: 'ссылка на пост Twitter',
    placeholder: 'Paste your link on social network',
  },
  {
    id: Math.random().toString(),
    question:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    buttonLabel: 'ссылка на пост Meta',
    placeholder: 'Paste your link on social network',
  },
  {
    id: Math.random().toString(),
    question:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.',
    buttonLabel: 'ссылка на пост Twitter',
    placeholder: 'Paste your link on social network',
  },
  {
    id: Math.random().toString(),
    question:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    buttonLabel: 'ссылка на пост LiveJournal',
    placeholder: 'Paste your link on social network',
  },
  {
    id: Math.random().toString(),
    question:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.',
    buttonLabel: 'ссылка на пост Twitter',
    placeholder: 'Paste your link on social network',
  },
  {
    id: Math.random().toString(),
    question:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    buttonLabel: 'ссылка на пост Twitter',
    placeholder: 'Paste your link on social network',
  },
]

export default {
  airdrop: mockAirDrop,
  sale: mockSale,
  quests: mockQuests,
}
