import { MenuItemsType } from '@envoysvision/uikit'
import { ContextApi } from 'contexts/Localization/types'
import { MenuCompanies, MenuFinance, MenuOTC, MenuSettings, MenuTrade, MenuWallet } from 'icons'

export type ConfigMenuItemsType = MenuItemsType & { hideSubNav?: boolean }

const config: (t: ContextApi['t']) => ConfigMenuItemsType[] = (t) => [
  {
    label: t('Trade'),
    icon: 'Swap',
    active: true,
    href: '/swap',
    showItemsOnMobile: false,
    items: [
      {
        href: '/swap',
      },
      {
        href: '/liquidity',
      },
      {
        href: '/find',
      },
      {
        href: '/add',
      },
    ],
    iconComponent: MenuTrade,
  },
  {
    label: t('Finance'),
    icon: 'Earn',
    active: true,
    href: '/farms',
    items: [
      {
        href: '/farms',
      },
      {
        href: '/pools',
      },
    ],
    iconComponent: MenuFinance,
  },
  {
    label: t('Companies'),
    icon: 'Companies',
    active: true,
    href: '/companies',
    items: [],
    iconComponent: MenuCompanies,
  },
  {
    label: t('Wallet'),
    icon: 'Wallet',
    active: false,
    href: '/wallet',
    items: [],
    iconComponent: MenuWallet,
  },
  // {
  //   label: t('OTC'),
  //   icon: 'OTC',
  //   active: false,
  //   href: '/otc',
  //   items: [],
  //   iconComponent: MenuOTC,
  // },
  {
    label: t('Info'),
    icon: 'Info',
    active: true,
    href: '/info',
    items: [],
    iconComponent: MenuOTC, // TODO: Add Info icon
  },
  {
    label: t('Settings'),
    icon: 'Settings',
    active: true,
    bottom: true,
    href: '/settings',
    items: [],
    iconComponent: MenuSettings,
  },
]

export default config
