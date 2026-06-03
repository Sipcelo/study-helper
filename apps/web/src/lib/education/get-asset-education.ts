import type { AssetEducation, EducationConcept, StudyQuestion } from '@/types/education';
import { ASSET_EDUCATION } from '@/data/asset-education';
import { logAssetEducationWarnings } from './validate-asset-education';

logAssetEducationWarnings(Object.keys(ASSET_EDUCATION));

export function getAssetEducation(assetId: string): AssetEducation | null {
  return ASSET_EDUCATION[assetId] ?? null;
}

export function getRelatedConcepts(assetId: string): EducationConcept[] {
  return ASSET_EDUCATION[assetId]?.relatedConcepts ?? [];
}

export function getStudyQuestions(assetId: string): StudyQuestion[] {
  return ASSET_EDUCATION[assetId]?.studyQuestions ?? [];
}
