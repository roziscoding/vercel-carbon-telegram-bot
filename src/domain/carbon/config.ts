import { CarbonConfig, defaultCarbonConfig } from '../CarbonConfig'
import { ReadableCarbonConfig } from '../ReadableCarbonConfig'

const botToCarbon: Record<keyof ReadableCarbonConfig, keyof CarbonConfig> = {
  backgroundColor: 'bg',
  theme: 't',
  windowTheme: 'wt',
  language: 'l',
  dropShadow: 'ds',
  dropShadowOffsetY: 'dsyoff',
  dropShadowBlurRadius: 'dsblur',
  windowControls: 'wc',
  widthAdjustment: 'wa',
  paddingVertical: 'pv',
  paddingHorizontal: 'ph',
  lineNumbers: 'ln',
  fontFamily: 'fm',
  fontSize: 'fs',
  lineHeight: 'lh',
  squaredImage: 'si',
  exportSize: 'es',
  watermark: 'wm'
}

export function translateToCarbon(config: Partial<ReadableCarbonConfig>) {
  return Object.entries(config).reduce<Partial<CarbonConfig>>((carbonConfig, [name, value]) => {
    const carbonConfigName = botToCarbon[name as keyof typeof botToCarbon]
    if (!carbonConfigName) return carbonConfig
    return { ...carbonConfig, [carbonConfigName]: value }
  }, {})
}

export function getConfig(settings: Partial<ReadableCarbonConfig>): CarbonConfig {
  return {
    ...defaultCarbonConfig,
    ...translateToCarbon(settings)
  }
}
