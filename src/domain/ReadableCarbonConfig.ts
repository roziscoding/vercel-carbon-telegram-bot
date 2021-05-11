import { CarbonConfig } from './CarbonConfig'

export type ReadableCarbonConfig = {
  backgroundColor: CarbonConfig['bg']
  theme: CarbonConfig['t']
  windowTheme: CarbonConfig['wt']
  language: CarbonConfig['l']
  dropShadow: CarbonConfig['ds']
  dropShadowOffsetY: CarbonConfig['dsyoff']
  dropShadowBlurRadius: CarbonConfig['dsblur']
  windowControls: CarbonConfig['wc']
  widthAdjustment: CarbonConfig['wa']
  paddingVertical: CarbonConfig['pv']
  paddingHorizontal: CarbonConfig['ph']
  lineNumbers: CarbonConfig['ln']
  fontFamily: CarbonConfig['fm']
  fontSize: CarbonConfig['fs']
  lineHeight: CarbonConfig['lh']
  squaredImage: CarbonConfig['si']
  exportSize: CarbonConfig['es']
  watermark: CarbonConfig['wm']
}
