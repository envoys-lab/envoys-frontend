import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'EnvoysSwap',
  description:
    'The most popular AMM on BSC by user count! Earn CAKE through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by EnvoysSwap), NFTs, and more, on a platform you can trust.',
  image: 'https://pancakeswap.finance/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  let basePath
  if (path.startsWith('/swap')) {
    basePath = '/swap'
  } else if (path.startsWith('/add')) {
    basePath = '/add'
  } else if (path.startsWith('/remove')) {
    basePath = '/remove'
  } else if (path.startsWith('/teams')) {
    basePath = '/teams'
  } else if (path.startsWith('/voting/proposal') && path !== '/voting/proposal/create') {
    basePath = '/voting/proposal'
  } else if (path.startsWith('/nfts/collections')) {
    basePath = '/nfts/collections'
  } else if (path.startsWith('/nfts/profile')) {
    basePath = '/nfts/profile'
  } else if (path.startsWith('/pancake-squad')) {
    basePath = '/pancake-squad'
  } else {
    basePath = path
  }

  switch (basePath) {
    case '/':
      return {
        title: `${t('Home')} | ${t('EnvoysSwap')}`,
      }
    case '/swap':
      return {
        title: `${t('Exchange')} | ${t('EnvoysSwap')}`,
      }
    case '/add':
      return {
        title: `${t('Add Liquidity')} | ${t('EnvoysSwap')}`,
      }
    case '/remove':
      return {
        title: `${t('Remove Liquidity')} | ${t('EnvoysSwap')}`,
      }
    case '/liquidity':
      return {
        title: `${t('Liquidity')} | ${t('EnvoysSwap')}`,
      }
    case '/find':
      return {
        title: `${t('Import Pool')} | ${t('EnvoysSwap')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('EnvoysSwap')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('EnvoysSwap')}`,
      }
    case '/prediction/leaderboard':
      return {
        title: `${t('Leaderboard')} | ${t('EnvoysSwap')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('EnvoysSwap')}`,
      }
    case '/farms/auction':
      return {
        title: `${t('Farm Auctions')} | ${t('EnvoysSwap')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('EnvoysSwap')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('EnvoysSwap')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('EnvoysSwap')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('EnvoysSwap')}`,
      }
    case '/voting':
      return {
        title: `${t('Voting')} | ${t('EnvoysSwap')}`,
      }
    case '/voting/proposal':
      return {
        title: `${t('Proposals')} | ${t('EnvoysSwap')}`,
      }
    case '/voting/proposal/create':
      return {
        title: `${t('Make a Proposal')} | ${t('EnvoysSwap')}`,
      }
    case '/info':
      return {
        title: `${t('Overview')} | ${t('EnvoysSwap Info & Analytics')}`,
        description: 'View statistics for Envoysswap exchanges.',
      }
    case '/info/pools':
      return {
        title: `${t('Pools')} | ${t('EnvoysSwap Info & Analytics')}`,
        description: 'View statistics for Envoysswap exchanges.',
      }
    case '/info/tokens':
      return {
        title: `${t('Tokens')} | ${t('EnvoysSwap Info & Analytics')}`,
        description: 'View statistics for Envoysswap exchanges.',
      }
    case '/nfts':
      return {
        title: `${t('Overview')} | ${t('EnvoysSwap')}`,
      }
    case '/nfts/collections':
      return {
        title: `${t('Collections')} | ${t('EnvoysSwap')}`,
      }
    case '/nfts/activity':
      return {
        title: `${t('Activity')} | ${t('EnvoysSwap')}`,
      }
    case '/nfts/profile':
      return {
        title: `${t('Profile')} | ${t('EnvoysSwap')}`,
      }
    case '/pancake-squad':
      return {
        title: `${t('Envoys Squad')} | ${t('EnvoysSwap')}`,
      }
    default:
      return null
  }
}
