import { GLOSSARY, GLOSSARY_CONCEPTS } from '@/data/glossary';
import type { GlossaryConcept, GlossaryCategory } from '@/types/glossary';

export function getGlossaryConcept(id: string): GlossaryConcept | null {
  return GLOSSARY[id] ?? null;
}

export function getGlossaryConcepts(): GlossaryConcept[] {
  return GLOSSARY_CONCEPTS;
}

export function getGlossaryByCategory(): Record<GlossaryCategory, GlossaryConcept[]> {
  const result = {} as Record<GlossaryCategory, GlossaryConcept[]>;
  for (const concept of GLOSSARY_CONCEPTS) {
    if (!result[concept.category]) result[concept.category] = [];
    result[concept.category].push(concept);
  }
  return result;
}

export function searchGlossaryConcepts(query: string): GlossaryConcept[] {
  const q = query.toLowerCase().trim();
  if (!q) return GLOSSARY_CONCEPTS;
  return GLOSSARY_CONCEPTS.filter(
    (c) =>
      c.title.toLowerCase().includes(q) ||
      c.shortDefinition.toLowerCase().includes(q) ||
      c.fullExplanation.toLowerCase().includes(q),
  );
}
