/**
 * Contexto Interact → Study Planner.
 *
 * Salva o contexto da interacao do usuario com o Interact para ser
 * consumido pelo Study Planner ao navegar via START_STUDY_PLAN.
 *
 * Usa sessionStorage (nao localStorage) porque o contexto so e
 * relevante durante a sessao de navegacao. Nao persiste entre abas.
 */

const STORAGE_KEY = 'study-helper:planner-context';

export interface PlannerContext {
  source: 'interact';
  input: string;
  domain: string;
  intent: string;
  actionType: string;
  createdAt: string;
}

export function savePlannerContext(ctx: PlannerContext): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(ctx));
  } catch {
    // sessionStorage indisponivel — ignora
  }
}

export function loadPlannerContext(): PlannerContext | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.source !== 'interact') return null;
    return parsed as PlannerContext;
  } catch {
    return null;
  }
}

export function clearPlannerContext(): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignora
  }
}

const DOMAIN_TO_AREA: Record<string, string> = {
  programming: 'programacao',
  career: 'carreira',
  finance: 'financeiro',
  study: 'personalizado',
  general: 'personalizado',
};

/**
 * Mapeia um dominio do Interact para a area correspondente no formulario.
 * Usado pelo draft ao preencher o campo "area" a partir do contexto.
 */
export function domainToArea(domain: string): string {
  return DOMAIN_TO_AREA[domain] || 'personalizado';
}

/**
 * Extrai um objective legivel a partir do input do Interact.
 * Tenta remover prefixos comuns como "quero estudar", "me explica", etc.
 */
export function extractObjective(input: string): string {
  const cleaned = input
    .replace(/^(quero\s+)?(estudar|aprender|saber\s+sobre|fazer\s+um\s+plano\s+(de\s+)?(estudos\s+)?(para\s+)?|me\s+ensina\s+)/i, '')
    .replace(/^(criar|montar|gerar|preciso\s+de\s+um)\s+/i, '')
    .trim();
  return cleaned || input;
}