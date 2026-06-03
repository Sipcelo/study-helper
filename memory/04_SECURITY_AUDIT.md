# 04 — Seguranca e Auditoria

## Checklist por camada

### Front-end (Next.js)

- [ ] Nenhum segredo em bundle (verificar build output)
- [ ] `.env.local` no .gitignore
- [ ] Inputs de usuario validados antes de chamar API
- [ ] XSS: nenhum `dangerouslySetInnerHTML` sem sanitizacao
- [ ] CSRF: forms mutaveis com token ou SameSite cookies
- [ ] Links externos com `rel="noopener noreferrer"`
- [ ] LocalStorage: nao guardar tokens ou PII
- [ ] Nenhuma chamada para URL construida a partir de input do usuario

### Back-end (Java Spring Boot)

- [ ] Endpoints sensiveis com autenticacao
- [ ] SQL injection: usar JPA ou Prepared Statement, nunca concatenar
- [ ] CORS configurado para origens explicitas (nunca `*` em prod)
- [ ] Rate limiting em endpoints publicos
- [ ] Validacao de entrada com Bean Validation (`@Valid`, `@NotNull`, etc.)
- [ ] Logs nao contem PII, senha, token, chave
- [ ] Segredos via env var, nunca hardcoded
- [ ] Dependencias verificadas contra CVEs conhecidos
- [ ] Actuator desabilitado ou protegido em prod

### Banco (PostgreSQL)

- [ ] Usuario da app com privilegios minimos (nao `postgres`)
- [ ] Senhas em conexao via env, nao em URL
- [ ] Backups automaticos
- [ ] Dados sensiveis criptografados em repouso (quando aplicavel)
- [ ] PII identificada e marcada para LGPD
- [ ] Migrations versionadas e revisadas (Flyway/Liquibase)

### Geral

- [ ] HTTPS em producao
- [ ] Headers de seguranca: HSTS, CSP, X-Frame-Options
- [ ] Auditoria de dependencias (`npm audit`, `mvn dependency-check`)
- [ ] Sem segredo commitado: rodar `gitleaks` ou similar
- [ ] LGPD: consentimento para dados pessoais, direito de exclusao, politica de privacidade

## CORS no Study Helper

Origens permitidas (dev):

- `http://localhost:3000` (Next.js dev)
- `http://localhost:8888` (referenciado em Rascunho_sprints Sprint 25)

Origem de producao: definir antes do deploy (pendente).

## Auditoria periodica

- A cada sprint: rodar `npm audit` e checar CVEs em deps novas
- A cada mes: revisar CORS, headers, permissoes
- Antes de deploy: rodar checklist completo

## Resposta a incidente

1. Conter (revogar credencial, fechar origem, bloquear rota)
2. Avaliar impacto (logs, dados acessados, duracao)
3. Notificar (Sipcelo + usuarios afetados se LGPD exigir)
4. Remediar (patch + deploy)
5. Documentar (postmortem em `memory/incidents/AAAA-MM-DD-resumo.md`)

Fonte esperada: `docs/20_SECURITY_PRIVACY.md` (AUSENTE na recuperacao) — recriar com base neste arquivo quando prioridade exigir.
