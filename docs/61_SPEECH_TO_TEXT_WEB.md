# 61 - Speech-to-Text Web no Interact

**Modulo:** `[API-INTERACT]` `[PLATAFORMA]`  
**Sprint:** 25  
**Status:** Implementado no frontend  
**Data:** 2026-05-28

---

## Objetivo

Adicionar entrada por voz ao Interact usando Web Speech API no browser. A fala e transcrita no frontend e enviada como texto para o endpoint existente `POST /api/interact/text`.

Esta sprint nao cria `POST /api/interact/audio`, nao envia arquivo de audio para o backend e nao adiciona dependencia externa de STT.

---

## Arquitetura

```text
Browser (/interact)
  InteractPanel
    useWebSpeechAPI()
      Web Speech API do navegador
      transcript final
    interactText(transcript, domain)
      POST /api/interact/text
        Java Spring Boot
```

O backend Java continua responsavel por classificar intencao, resolver recurso e montar a action.

---

## Arquivos alterados

```text
apps/web/src/hooks/use-web-speech.ts
apps/web/src/components/interact/interact-panel.tsx
```

---

## Hook `useWebSpeechAPI`

Interface publica:

```typescript
{
  startListening: () => void;
  stopListening: () => void;
  transcript: string;
  isListening: boolean;
  error: string | null;
}
```

O hook tambem aceita `onFinalTranscript`, usado pelo `InteractPanel` para submeter automaticamente a transcricao final.

---

## Comportamento

- Botao de microfone fica ao lado do campo "Pergunta".
- Ao iniciar, o estado muda para `Ouvindo...`.
- Quando o navegador retorna uma transcricao final:
  - o input e preenchido;
  - a transcricao e enviada para `interactText()`;
  - o resultado aparece no mesmo card ja existente.
- Se o navegador nao suportar Web Speech API, a UI mostra fallback textual.
- Permissao negada, microfone ausente, fala vazia e interrupcao sao tratados como mensagens de erro do fluxo de voz.

---

## Limitacoes

- Suporte principal: Chrome e Edge.
- Firefox e Safari podem nao suportar ou podem exigir configuracao do navegador.
- Sem transcricao server-side nesta sprint.
- Sem historico de sessoes de voz.

---

## Proximos passos

- Testar manualmente em Chrome/Edge com backend Java rodando.
- Avaliar `POST /api/interact/audio` com STT server-side apenas em sprint futura.
- Conectar o Interact a geracao real de plano quando a decisao de LLM/API estiver congelada.
