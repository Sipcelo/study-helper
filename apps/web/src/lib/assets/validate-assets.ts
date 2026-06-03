import type { Asset } from '@study-helper/types';

export interface AssetWarning {
  assetId: string;
  field: string;
  message: string;
}

const REQUIRED_FIELDS = [
  'id',
  'symbol',
  'name',
  'type',
  'currency',
  'price',
  'changePercent',
  'trend',
  'visualTheme',
  'history',
] as const;

export function validateAssets(assets: Asset[]): AssetWarning[] {
  const warnings: AssetWarning[] = [];

  for (const asset of assets) {
    const id = asset.id ?? '(sem id)';

    for (const field of REQUIRED_FIELDS) {
      const value = asset[field as keyof Asset];
      if (value === undefined || value === null || value === '') {
        warnings.push({ assetId: id, field, message: `campo obrigatório ausente: ${field}` });
      }
    }

    if (!asset.visualTheme?.buildingType) {
      warnings.push({
        assetId: id,
        field: 'visualTheme.buildingType',
        message: 'buildingType ausente — prédio não terá topper correto',
      });
    }

    const historyLen = Array.isArray(asset.history) ? asset.history.length : 0;
    if (historyLen < 30) {
      warnings.push({
        assetId: id,
        field: 'history',
        message: `histórico tem ${historyLen} pontos, esperado ≥ 30`,
      });
    }
  }

  return warnings;
}

export function logAssetWarnings(assets: Asset[]): void {
  if (process.env.NODE_ENV !== 'development') return;

  const warnings = validateAssets(assets);
  if (warnings.length === 0) return;

  console.warn(`[StudyHelper] ${warnings.length} warning(s) nos dados mockados:`);
  for (const w of warnings) {
    console.warn(`  [${w.assetId}] ${w.field} — ${w.message}`);
  }
}
