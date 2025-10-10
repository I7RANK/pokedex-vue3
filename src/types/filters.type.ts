import { FOOTER_FILTER_OPTIONS } from '@/constants/filters'

export type FooterFilterOptions = (typeof FOOTER_FILTER_OPTIONS)[keyof typeof FOOTER_FILTER_OPTIONS]
