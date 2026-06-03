# sprint_25_lesson — Voz no Interact

Sprint: 25
Modulo: cross (Interact + WebConfig)
Periodo: 2026-05 (data exata TUDO)

## O que foi feito

- Decisao: voz fica no browser (Web Speech API), sem endpoint de audio no back
- CORS deveria ter sido atualizado para incluir `http://localhost:8888` (nao foi)

## Desafio

- O hook `use-web-speech.ts` precisa lidar com a ausencia de `SpeechRecognition` em alguns browsers (fallback)
- Coordenacao entre a transcricao do navegador e o submit do formulario

## Erros

- O hook de voz nao foi commitado no codigo recuperado
- CORS ficou com apenas `localhost:3000` e `localhost:3001`, sem `localhost:8888` que e a porta de dev esperada
- Nao houve validacao de build apos a mudanca

## Decisoes tomadas

- Voz no client (sem endpoint de audio)
- TypeScript strict no hook
- Reuso do mesmo `POST /api/interact/text` (transcricao vai como string)

## Aprendizados

- Toda decisao de "voz fica no browser" precisa de hook dedicado para nao poluir o panel
- Toda porta de dev documentada precisa estar no CORS antes de qualquer teste manual
- Validacao minima (typecheck) deve rodar apos criar hook novo, mesmo que simples
- Para o agente: SEMPRE ler o estado real do codigo antes de assumir o que esta feito. O `Rascunho_sprints.md` descreve o PLANEJADO, nao o REAL.

## Referencias

- `docs/sprint25.md`
- `apps/web/src/components/interact/interact-panel.tsx`
- `services/study-helper-api/src/main/java/com/studyhelper/api/config/WebConfig.java`
- `docs/Rascunho_sprints.md` (linhas 55-92)
