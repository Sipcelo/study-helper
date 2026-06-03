'use client';

import type { AssetEducation } from '@/types/education';
import { EducationTabs } from './education-tabs';

interface EducationSectionProps {
  education: AssetEducation;
}

export function EducationSection({ education }: EducationSectionProps) {
  return <EducationTabs education={education} />;
}
