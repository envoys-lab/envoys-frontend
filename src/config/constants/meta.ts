import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'Envoys',
  description:
    'The most popular AMM on BSC by user count! Earn EVT through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by Envoys), NFTs, and more, on a platform you can trust.',
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
  } else if (path.startsWith('/envoys-squad')) {
    basePath = '/envoys-squad'
  } else {
    basePath = path
  }

  switch (basePath) {
    case '/':
      return {
        title: `${t('Home')} | ${t('Envoys')}`,
      }
    case '/swap':
      return {
        title: `${t('Exchange')} | ${t('Envoys')}`,
      }
    case '/add':
      return {
        title: `${t('Add Liquidity')} | ${t('Envoys')}`,
      }
    case '/remove':
      return {
        title: `${t('Remove Liquidity')} | ${t('Envoys')}`,
      }
    case '/liquidity':
      return {
        title: `${t('Liquidity')} | ${t('Envoys')}`,
      }
    case '/find':
      return {
        title: `${t('Import Pool')} | ${t('Envoys')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('Envoys')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('Envoys')}`,
      }
    case '/prediction/leaderboard':
      return {
        title: `${t('Leaderboard')} | ${t('Envoys')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('Envoys')}`,
      }
    case '/farms/auction':
      return {
        title: `${t('Farm Auctions')} | ${t('Envoys')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('Envoys')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('Envoys')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('Envoys')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('Envoys')}`,
      }
    case '/voting':
      return {
        title: `${t('Voting')} | ${t('Envoys')}`,
      }
    case '/voting/proposal':
      return {
        title: `${t('Proposals')} | ${t('Envoys')}`,
      }
    case '/voting/proposal/create':
      return {
        title: `${t('Make a Proposal')} | ${t('Envoys')}`,
      }
    case '/info':
      return {
        title: `${t('Overview')} | ${t('Envoys Info & Analytics')}`,
        description: 'View statistics for Pancakeswap exchanges.',
      }
    case '/info/pools':
      return {
        title: `${t('Pools')} | ${t('Envoys Info & Analytics')}`,
        description: 'View statistics for Pancakeswap exchanges.',
      }
    case '/info/tokens':
      return {
        title: `${t('Tokens')} | ${t('Envoys Info & Analytics')}`,
        description: 'View statistics for Pancakeswap exchanges.',
      }
    case '/nfts':
      return {
        title: `${t('Overview')} | ${t('Envoys')}`,
      }
    case '/nfts/collections':
      return {
        title: `${t('Collections')} | ${t('Envoys')}`,
      }
    case '/nfts/activity':
      return {
        title: `${t('Activity')} | ${t('Envoys')}`,
      }
    case '/nfts/profile':
      return {
        title: `${t('Profile')} | ${t('Envoys')}`,
      }
    case '/envoys-squad':
      return {
        title: `${t('Envoys Squad')} | ${t('Envoys')}`,
      }
    default:
      return null
  }
}
