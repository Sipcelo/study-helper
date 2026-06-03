# 57 — Frontend ↔ API Interact: Integração

**Módulo:** `[API-INTERACT]` `[PROGRAMACAO]` `[PLATAFORMA]`  
**Sprint:** 22  
**Status:** Implementado

---

## O que foi feito

Integração do frontend Next.js com o backend Java Spring Boot via `POST /api/interact/text`.

O usuário acessa `/interact`, digita uma pergunta, escolhe o domínio e recebe a resposta classificada da API Java — intenção, resposta educacional e ação sugerida.

---

## Como rodar

### 1. Backend Java

```powershell
# No terminal 1 — a partir da raiz do projeto
cd services/study-helper-api

# Adicionar ao PATH se necessário (ou abrir terminal novo)
$env:PATH += ";C:\Users\Admin\tools\maven\apache-maven-3.9.8\bin;C:\Program Files\Eclipse Adoptium\jdk-17.0.19.10-hotspot\bin"
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.19.10-hotspot"

mvn spring-boot:run
```

Servidor disponível em: `http://localhost:8080`

### 2. Frontend Next.js

```powershell
# No terminal 2
cd apps/web
pnpm dev
```

Frontend disponível em: `http://localhost:3000`

---

## Como testar /interact

1. Abrir `http://localhost:3000/interact`
2. Selecionar domínio: **Programação**
3. Digitar: `me explica o que é REST`
4. Clicar em **Enviar para API Interact**
5. Verificar resposta: intent `EXPLAIN_CONCEPT`, link para abrir recurso

### Testar erro de rede

1. Parar o backend Java (`Ctrl+C`)
2. Enviar qualquer pergunta no frontend
3. Verificar mensagem de erro: "Erro de rede" com instrução para verificar localhost:8080

---

## Configurar URL da API

A URL base é lida de `NEXT_PUBLIC_STUDY_HELPER_API_URL`. Se não definida, usa `http://localhost:8080`.

Para ambiente de produção:

```bash
# apps/web/.env.local ou variável de ambiente no servidor
NEXT_PUBLIC_STUDY_HELPER_API_URL=https://api.studyhelper.com.br
```

Ver `apps/web/.env.example` como referência.

---

## Arquitetura da integração

```
Browser (/interact)
  └─ InteractPanel (client component)
       └─ interactText(input, domain)     ← apps/web/src/lib/api/interact-client.ts
            └─ fetch POST /api/interact/text
                 └─ Java Spring Boot (localhost:8080)
                      └─ InteractService.processText()
                           └─ regex classifier → InteractResponse
  └─ InteractResultCard
       └─ renderiza: transcript, intent, domain, answer, action
       └─ se action.type = OPEN_RESOURCE → Link para target
```

---

## Arquivos da sprint

| Arquivo | Tipo |
|---------|------|
| `apps/web/src/types/interact.ts` | Tipos TypeScript |
| `apps/web/src/lib/api/interact-client.ts` | Client HTTP |
| `apps/web/src/components/interact/interact-panel.tsx` | Form + estado |
| `apps/web/src/components/interact/interact-result-card.tsx` | Exibição do resultado |
| `apps/web/src/app/interact/page.tsx` | Página /interact |
| `apps/web/.env.example` | Exemplo de variáveis de ambiente |

Alterados:
| Arquivo | Mudança |
|---------|---------|
| `apps/web/src/components/layout/header.tsx` | Link "Interact" adicionado |
| `apps/web/src/components/layout/footer.tsx` | Link "Interact" adicionado |

---

## Limitações atuais

- **Sem áudio**: entrada é apenas texto digitado, sem speech-to-text
- **Backend local**: API roda em localhost — não há deploy do Java ainda
- **Classificador mock**: lógica regex no Java, sem IA real
- **Sem histórico**: cada envio é independente, nenhuma sessão persistida
- **Encoding no terminal**: caracteres acentuados aparecem quebrados no PowerShell 5.1, mas chegam corretos no frontend (UTF-8)

---

## Próximos passos

- **Sprint 23 — Speech-to-Text**: Web Speech API no browser captura voz → texto enviado para `/api/interact/text`
- **Sprint futura — Deploy Java**: containerizar com Docker, hospedar no Railway ou Render
- **Sprint futura — IA real**: substituir classificador regex por Claude API

---

## Relacionado

- `docs/37_JAVA_BACKEND_DIRECTION.md` — decisão arquitetural do backend Java
- `docs/38_API_INTERACT_SPEECH_TO_TEXT.md` — visão do produto para voz
- `docs/56_JAVA_BACKEND_BASE.md` — documentação do backend Java
- `services/study-helper-api/README.md` — guia do backend
