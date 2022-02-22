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
    items: [],
    iconComponent: MenuTrade,
  },
  {
    label: t('Finance'),
    icon: 'Earn',
    active: true,
    href: '/farms',
    items: [],
    iconComponent: MenuFinance,
  },
  {
    label: t('Companies'),
    icon: 'Companies',
    active: false,
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
  {
    label: t('OTC'),
    icon: 'OTC',
    active: false,
    href: '/otc',
    items: [],
    iconComponent: MenuOTC,
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
