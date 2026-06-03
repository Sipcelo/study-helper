# 60 — Continuação: Retomada a partir da Sprint 24/25

**Data de pausa:** 2026-05-28  
**Última sprint concluída:** Sprint 24 — Interact Resource Resolver  
**Próxima sprint planejada:** Sprint 25 — Speech-to-Text (voz no Interact)

---

## Contexto de pausa

O criador pausou este projeto para focar em outro projeto. Este documento serve como ponto de entrada para retomar o Study Helper sem perder contexto.

---

## Estado atual do projeto

### O que está funcionando hoje

| Área | Rota | Estado |
|------|------|--------|
| Módulo Financeiro | `/ativos`, `/ativo/[slug]` | Completo, dados mockados |
| Módulo Programação — Hub | `/programacao` | Completo, 10 trilhas |
| Módulo Programação — Detalhe | `/programacao/[slug]` | Completo |
| Trilha Java Essencial | `/programacao/java-essencial/[topico]` | Conteúdo real em 12 tópicos |
| Study Planner | `/meu-plano` | UI completa, plano GRC mockado |
| Interact — Frontend | `/interact` | Formulário + resultado |
| Interact — Backend Java | `localhost:8080` | 3 endpoints, 41 testes |

### O que ainda NÃO existe

- Speech-to-Text (voz capturada no browser)
- Conteúdo real nas trilhas Spring Boot, REST, DTOs, Testes, Deploy, Entrevista
- Formulário para gerar plano de estudos personalizado
- Persistência de progresso (localStorage ou banco)
- Deploy do backend Java (roda apenas em localhost)
- Autenticação

---

## Sprint 25 — O que fazer ao retomar

**Objetivo:** Speech-to-Text — Web Speech API no browser captura voz → envia texto para a API Interact.

### Tarefas

1. Adicionar botão de microfone ao `InteractPanel` (`apps/web/src/components/interact/interact-panel.tsx`)
2. Implementar hook `useWebSpeechAPI` em `apps/web/src/hooks/use-web-speech.ts`:
   - `startListening()` — ativa microfone
   - `stopListening()` — finaliza captura
   - `transcript: string` — texto reconhecido
   - `isListening: boolean` — estado do microfone
   - `error: string | null` — microfone negado / navegador sem suporte
3. Quando transcrição finalizar → popular o campo de input automaticamente → submeter
4. Tratar erros:
   - Navegador sem suporte (Firefox, Safari parcial) → exibir aviso
   - Permissão negada → mensagem clara
5. Documentar em `docs/61_SPEECH_TO_TEXT_WEB.md`

### Referência técnica

```typescript
// Web Speech API — browser nativo, sem custo
const recognition = new window.SpeechRecognition()
recognition.lang = 'pt-BR'
recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript
  // → enviar para POST /api/interact/text
}
recognition.start()
```

Suporte: Chrome e Edge (nativo), Firefox (requer flag), Safari (parcial iOS 14.5+).

### Para rodar o projeto completo

```powershell
# Terminal 1 — Backend Java
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.19.10-hotspot"
$env:PATH += ";C:\Users\Admin\tools\maven\apache-maven-3.9.8\bin;$env:JAVA_HOME\bin"
cd services/study-helper-api
mvn spring-boot:run

# Terminal 2 — Frontend Next.js
cd apps/web
pnpm dev

# Acessar:
# http://localhost:3000/interact     ← página principal do Interact
# http://localhost:3000/programacao  ← módulo de programação
# http://localhost:3000/meu-plano    ← study planner
```

---

## Backlog priorizado (após Sprint 25)

| Prioridade | Sprint | Entrega | Módulo |
|------------|--------|---------|--------|
| 1 | 25 | Speech-to-Text (Web Speech API → Interact) | API-INTERACT |
| 2 | 26 | Conteúdo real: trilha Spring Boot (tópicos individuais) | PROGRAMACAO |
| 3 | 27 | Formulário `/planejar-estudos` (geração sem IA, regras fixas) | PLATAFORMA |
| 4 | 28 | Progresso no Study Planner (checkbox + localStorage) | PLATAFORMA |
| 5 | 29 | Conteúdo real: trilha REST e Entrevista Java Junior | PROGRAMACAO |
| 6 | 30 | Conexão Study Planner ↔ trilhas de programação | PLATAFORMA |
| 7 | Fase 4 | Deploy do backend Java (Railway ou Render) | PLATAFORMA |
| 8 | Fase 4 | 3D leve no módulo financeiro (React Three Fiber) | FINANCEIRO |

---

## Decisões abertas (responder ao retomar)

1. **Deploy Java:** Railway, Render ou EC2? Depende de orçamento e prazo para tornar público.
2. **Speech-to-Text:** Web Speech API (grátis, só Chrome) ou OpenAI Whisper (pago, robusto, qualquer navegador)?
3. **Autenticação:** entra antes ou depois do produto ser público?
4. **Próximo plano mockado:** criar "Java Essencial 45 dias" para conectar Study Planner com o módulo de Programação?

---

## Documentos-chave para releitura rápida

| Documento | Por que ler |
|-----------|-------------|
| `docs/01_PRODUCT_VISION.md` | O que é o produto e para quem |
| `docs/16_ROADMAP.md` | Fases e status atual |
| `docs/38_API_INTERACT_SPEECH_TO_TEXT.md` | Visão completa da API Interact |
| `docs/46_STUDY_PLANNER_SYSTEM.md` | Sistema de planos de estudo |
| `docs/57_FRONTEND_INTERACT_INTEGRATION.md` | Como frontend e Java se comunicam |
| `docs/58_INTERACT_INTENT_ROUTER.md` | Sprint 23: arquitetura do intent router |
| `docs/59_INTERACT_RESOURCE_RESOLVER.md` | Sprint 24: resource resolver (última sprint) |

---

## Lembrete de arquitetura

```
Frontend Next.js (localhost:3000)
  └─ /interact → InteractPanel
       └─ interactText() → fetch POST
            └─ Java Spring Boot (localhost:8080)
                 ├─ IntentClassifierService   → classifica intenção
                 ├─ ResourceResolverService   → resolve rota real do Study Helper
                 └─ InteractActionResolverService → constrói action de resposta
```

O classificador atual usa **regex** (mock). A substituição por LLM real (Claude API) está planejada para a Fase 8 do roadmap.

---

## Notas pessoais do criador

- Projeto pausado voluntariamente em 2026-05-28.
- Foco atual: outro projeto.
- Retomar quando disponível — não há prazo externo.
- O produto está em estado funcional e navegável. Nada quebrado.
