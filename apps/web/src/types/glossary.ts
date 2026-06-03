export type GlossaryCategory =
  | 'Mercado'
  | 'Moedas'
  | 'Ações'
  | 'Risco'
  | 'Macroeconomia'
  | 'Tecnologia e Setores';

export interface GlossaryConcept {
  id: string;
  title: string;
  shortDefinition: string;
  fullExplanation: string;
  category: GlossaryCategory;
  example: string;
  relatedTerms: string[];
}
