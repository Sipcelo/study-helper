import { ASSET_EDUCATION } from '@/data/asset-education';
import { GLOSSARY } from '@/data/glossary';

export function validateAssetEducation(): { assetId: string; issues: string[] }[] {
  const glossaryIds = new Set(Object.keys(GLOSSARY));
  const results: { assetId: string; issues: string[] }[] = [];

  for (const [assetId, edu] of Object.entries(ASSET_EDUCATION)) {
    const issues: string[] = [];

    for (const concept of edu.relatedConcepts) {
      if (!glossaryIds.has(concept.id)) {
        issues.push(`relatedConcept id "${concept.id}" not found in GLOSSARY`);
      }
    }

    if (issues.length > 0) {
      results.push({ assetId, issues });
    }
  }

  return results;
}

export function logAssetEducationWarnings(assetIds: string[]): void {
  if (process.env.NODE_ENV !== 'development') return;

  const glossaryIds = new Set(Object.keys(GLOSSARY));

  for (const assetId of assetIds) {
    if (!ASSET_EDUCATION[assetId]) {
      console.warn(`[education] Asset "${assetId}" has no education data.`);
      continue;
    }

    for (const concept of ASSET_EDUCATION[assetId].relatedConcepts) {
      if (!glossaryIds.has(concept.id)) {
        console.warn(
          `[education] Asset "${assetId}": relatedConcept id "${concept.id}" not found in GLOSSARY.`
        );
      }
    }
  }
}
