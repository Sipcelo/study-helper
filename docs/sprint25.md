# Sprint 25 — Voz no Interact

## Status

**PARCIAL** — front-end nao recebeu o hook de voz; back-end nao precisou de mudanca (correto).

## Estado inicial esperado

- `apps/web/src/hooks/use-web-speech.ts` — hook de captura de voz via Web Speech API
- `apps/web/src/components/interact/interact-panel.tsx` — receber transcricao do hook
- `services/study-helper-api/src/main/java/com/studyhelper/api/config/WebConfig.java` — adicionar `http://localhost:8888` ao CORS
- `docs/sprint25.md` — esta memoria

## O que foi feito

- Back-end nao foi alterado (correto: voz fica no browser, sem endpoint de audio)
- `interact-panel.tsx` mantido com input apenas de texto (96 linhas)
- CORS: back-end permite apenas `http://localhost:3000` e `http://localhost:3001`. **Falta `http://localhost:8888`** (que e a porta esperada de dev segundo o Rascunho_sprints.md e a validacao manual do sprint26.md remoto)

## O que nao foi feito

- `apps/web/src/hooks/use-web-speech.ts` NAO existe no codigo recuperado
- O input do Interact continua sendo apenas `<textarea>` (sem botao de microfone, sem transcricao)
- CORS nao foi atualizado para incluir `localhost:8888`

## Risco

- Se o dev rodar `next dev` na porta 8888 (como documentado no sprint26 remoto), o navegador vai bloquear a chamada `POST /api/interact/text` por CORS
- O fluxo "voz → transcricao → backend → resposta" nao existe ainda

## Correcoes necessarias para concluir a sprint

1. Criar `apps/web/src/hooks/use-web-speech.ts` que encapsula `window.SpeechRecognition || window.webkitSpeechRecognition`
2. Atualizar `interact-panel.tsx` para usar o hook (botao de microfone, preenchimento do textarea)
3. Atualizar `WebConfig.java` para adicionar `http://localhost:8888` aos `allowedOrigins`

## Licao

Ver `memory/sprint_25_lesson.md`.
