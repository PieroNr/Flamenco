export const DEFAULT_EFFECTS = ['height', 'width', 'color', 'background', 'pulse', 'opticalIllusion'] as const;
export type DefaultEffectKind = typeof DEFAULT_EFFECTS[number]
export type EffectKind = DefaultEffectKind | 'custom'
interface BaseEffect {
  kind: EffectKind
}

interface BaseDefaultEffect extends BaseEffect {
  kind: DefaultEffectKind;
  selector: string;
}

export interface HeightEffect extends BaseDefaultEffect {
  kind: 'height';
  selector: string;
  options: {min: number, max: number};
}

export interface WidthEffect extends BaseDefaultEffect {
  kind: 'width';
  selector: string;
  options: {min: number, max: number};
}

export interface FontColorEffect extends BaseDefaultEffect {
  kind: 'color';
  selector: string;
  options: {min: string, max: string};
}

export interface PulseEffect extends BaseDefaultEffect {
  kind: 'pulse';
  selector: string;
}

export interface BackgroundColorEffect extends BaseDefaultEffect {
  kind: 'background';
  selector: string;
}

export interface OpticalIllusionEffect extends BaseDefaultEffect {
    kind: 'opticalIllusion';
    selector: string;
}


export type DefaultEffect = HeightEffect | WidthEffect | FontColorEffect | BackgroundColorEffect | PulseEffect | OpticalIllusionEffect

export type FunctionEffect = (context: { dataArray: Uint8Array, indexValue: number }) => void
export interface CustomEffect extends BaseEffect {
  kind: 'custom';
  onUpdate: FunctionEffect;
}

export type Effect =  CustomEffect | DefaultEffect