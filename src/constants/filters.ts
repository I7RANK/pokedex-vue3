import IconList from '@/assets/icons/list.svg'
import IconStar from '@/assets/icons/star.svg'

export const FOOTER_FILTER_OPTIONS = {
  ALL: 'all',
  FAVORITES: 'favorites',
} as const

export const FILTER_UI_CONFIG = [
  {
    key: FOOTER_FILTER_OPTIONS.ALL,
    label: 'All',
    icon: IconList,
  },
  {
    key: FOOTER_FILTER_OPTIONS.FAVORITES,
    label: 'Favorites',
    icon: IconStar,
  },
] as const
