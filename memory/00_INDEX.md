# 00 — Indice do Cerebro

Este diretorio e o cerebro em nuvem do projeto. Documenta preferencias, regras, decisoes, padroes e aprendizados para treinar o agente pessoal de Sipcelo.

## Arquivos tematicos

| Arquivo | Finalidade |
|---------|-----------|
| `01_PROFILE.md` | Quem e Sipcelo, contexto, modo de trabalho |
| `02_PREFERENCES.md` | Idioma, formato, tom, retorno preferido |
| `03_PROMPTS_STYLE.md` | Como prompts sao escritos para o agente |
| `04_SECURITY_AUDIT.md` | Checklist de seguranca e auditoria |
| `05_CODING_STYLE.md` | Convencoes TypeScript e Java |
| `06_AGENT_RULES.md` | Regras obrigatorias para o agente pessoal |
| `07_DECISION_PATTERN.md` | Modelo de ADR (Architectural Decision Record) |
| `08_SESSION_LOG.md` | Modelo de log de sessao do agente |
| `09_TECH_STACK.md` | Decisoes de stack e suas justificativas |
| `10_GLOSSARY.md` | Glossario de termos do projeto |
| `11_SPRINT_LESSONS.md` | Template e registro de licoes de sprint |

## Arquivos de licoes de sprint

A cada conclusao de sprint, criar `sprint_NN_lesson.md` (na raiz de memory/) com:

- o que foi feito
- desafio
- erros
- decisoes tomadas
- aprendizados

Indice consolidado em `11_SPRINT_LESSONS.md`.

## Como evoluir

- Cerebro versionado no git junto do projeto
- Cada arquivo e autonomo e pode crescer organicamente
- Quando surgir topico novo, criar proximo arquivo numerado e atualizar este indice
- Lacunas marcadas como TUDO indicam que a fonte original esta ausente e precisa ser recriada

## Fontes consumidas (estado atual)

- `docs/02_CREATOR_CONTEXT.md` — presente
- `docs/16_ROADMAP.md` — presente
- `docs/23_DECISION_LOG.md` — presente
- `docs/Rascunho_sprints.md` — presente (drafts 25-31)

## Fontes ausentes (a recriar)

- `docs/03_MVP_SCOPE.md` ate `docs/15_AGENT_PROMPTS.md`
- `docs/17_TASKS_BACKLOG.md` ate `docs/22_ACCEPTANCE_CRITERIA.md`
- `docs/24_AGENT_SESSION_LOG.md` ate `docs/27_*.md`
