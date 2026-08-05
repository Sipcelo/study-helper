# Sprint 25 — Voz no Interact

## Status

**CONCLUIDA**

## Fonte da verdade

Codigo validado no estado atual do projeto (03/06/2026).

## Entregas confirmadas

1. **Hook de voz** — `apps/web/src/hooks/use-web-speech.ts` (123 linhas):
   - Encapsula `window.SpeechRecognition || window.webkitSpeechRecognition`
   - Tipos inline para evitar dependencia de `@types/webrtc`
   - Idioma fixo pt-BR
   - Estados: transcript, isListening, isSupported, error
   - Funcoes: startListening, stopListening
   - Cleanup no unmount (aborta reconhecimento pendente)

2. **Painel Interact com microfone** — `apps/web/src/components/interact/interact-panel.tsx` (181 linhas):
   - Botao de microfone com icone SVG (absolute, canto inferior direito do textarea)
   - Estado de gravacao: botao vermelho pulsante quando ouvindo
   - Transcricao automatica preenche o textarea
   - Auto-submit apos transcricao chegar
   - Fallback: navegador sem suporte exibe aviso textual
   - loading desabilita microfone e botao de submit

3. **CORS localhost:8888** — `WebConfig.java` ja incluia (pre-existente da sprint 25.1)

## Cleanup tecnico

- `textareaRef` removido — era declarado mas nunca lido (.current nunca acessado)
- `eslint-disable react-hooks/exhaustive-deps` removido — `handleVoiceSubmit` convertido para `useCallback([domain])` e adicionado as dependencias
- `prevTranscriptRef` mantido como guard para evitar submit duplicado
- Auto-submit preservado

## Arquivos principais

| Arquivo | Funcao |
|---------|--------|
| `apps/web/src/hooks/use-web-speech.ts` | Hook de captura de voz via Web Speech API |
| `apps/web/src/components/interact/interact-panel.tsx` | Painel com microfone, transcricao e auto-submit |
| `services/study-helper-api/.../config/WebConfig.java` | CORS com localhost:3000, 3001, 8888 |

## Validacoes

| Validacao | Resultado |
|-----------|-----------|
| `npx tsc --noEmit` em `apps/web` | 0 erros |
| Hook sem dependencias externas | OK — zero deps |
| Fluxo de voz (hook → painel → API) | Preservado |
| Submit manual (textarea + botao) | Preservado |
| Navegadores suportados | Chrome, Edge (nativo), Safari iOS 14.5+ (parcial), Firefox (requer flag) |

## Observacoes tecnicas

- A sprint 25 nao cria endpoint de audio. Voz fica no browser, so texto vai pro backend.
- `docs/61_SPEECH_TO_TEXT_WEB.md` documenta a implementacao em detalhe.

## Proximo passo

Sprint 26 — Interact Actions UX (alinhar renderizacao de actions no front com as actions que o backend retorna).