# 41 — Wireframe Conceitual — Módulo Programação

Classificação: [PROGRAMACAO] [CARREIRA]

Todos os wireframes são textuais. Não representa código ou componentes finais.

---

## /programacao — Hub do Módulo

```
┌─────────────────────────────────────────────────────┐
│  HEADER — Study Helper  [Início] [Ativos] [Programação]│
├─────────────────────────────────────────────────────┤
│                                                     │
│  🗺️  MAPA DE TRILHAS                               │
│  Escolha seu caminho de aprendizado                 │
│                                                     │
│  ┌─────────────────────────────────────────────┐  │
│  │  TRILHA RECOMENDADA: Java Junior             │  │
│  │  Fundamentos → Java → Spring → REST → Deploy │  │
│  │  ████████░░░░░░░  4 de 10 trilhas            │  │
│  │  [Continuar trilha]                          │  │
│  └─────────────────────────────────────────────┘  │
│                                                     │
│  TRILHAS DISPONÍVEIS                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────┐ │
│  │ ☕ Java      │  │ 🍃 Spring    │  │ 🔗 REST  │ │
│  │ Essencial    │  │ Boot         │  │ APIs     │ │
│  │ Iniciante    │  │ Intermediário│  │ Inter.   │ │
│  │ 12 tópicos   │  │ 11 tópicos   │  │ 10 tóp.  │ │
│  │ [Acessar]    │  │ [Acessar]    │  │ [Acessar]│ │
│  └──────────────┘  └──────────────┘  └──────────┘ │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────┐ │
│  │ 🗄️ Banco    │  │ 🏗️ Arquit.  │  │ 🧪 Testes│ │
│  │ de Dados     │  │ Camadas      │  │          │ │
│  │ Iniciante    │  │ Inter.       │  │ Inter.   │ │
│  │ 11 tópicos   │  │ 10 tópicos   │  │ 11 tóp.  │ │
│  │ [Acessar]    │  │ [Acessar]    │  │ [Acessar]│ │
│  └──────────────┘  └──────────────┘  └──────────┘ │
│                                                     │
│  ┌─────────────────────────────────────────────┐  │
│  │  🎯 PREPARAÇÃO PARA ENTREVISTA               │  │
│  │  Perguntas frequentes para junior Java       │  │
│  │  [Ir para entrevista]                        │  │
│  └─────────────────────────────────────────────┘  │
│                                                     │
├─────────────────────────────────────────────────────┤
│  FOOTER                                             │
└─────────────────────────────────────────────────────┘
```

---

## /programacao/java — Trilha Java Essencial

```
┌─────────────────────────────────────────────────────┐
│  HEADER                                             │
├─────────────────────────────────────────────────────┤
│  ← Voltar para Programação                          │
│                                                     │
│  ☕ JAVA ESSENCIAL                                  │
│  A base da linguagem antes do framework             │
│                                                     │
│  Nível: Iniciante  •  12 tópicos  •  ~8h estimadas  │
│  ████████████░░  10 de 12 concluídos               │
│                                                     │
│  ┌─────────────────────┐  ┌──────────────────────┐ │
│  │ TÓPICOS              │  │ SOBRE ESTA TRILHA    │ │
│  │                      │  │                      │ │
│  │ ✅ 1. Por que Java?  │  │ Java é a linguagem   │ │
│  │ ✅ 2. Tipos e vars   │  │ mais cobrada em      │ │
│  │ ✅ 3. Strings        │  │ entrevistas de       │ │
│  │ ✅ 4. Condicionais   │  │ backend no Brasil.   │ │
│  │ ✅ 5. Loops          │  │                      │ │
│  │ ✅ 6. Arrays         │  │ Após esta trilha     │ │
│  │ ✅ 7. Coleções       │  │ você terá base para  │ │
│  │ ✅ 8. OOP            │  │ o Spring Boot.       │ │
│  │ ✅ 9. Herança        │  │                      │ │
│  │ ✅ 10. Interfaces    │  │ PRÓXIMA TRILHA       │ │
│  │ ▶  11. Exceções      │  │ 🍃 Spring Boot       │ │
│  │    12. Streams       │  │ [Acessar]            │ │
│  └─────────────────────┘  └──────────────────────┘ │
│                                                     │
│  [▶ Acessar tópico atual: Exceções]                 │
│                                                     │
├─────────────────────────────────────────────────────┤
│  FOOTER                                             │
└─────────────────────────────────────────────────────┘
```

---

## /programacao/java/[topico] — Página de Tópico Individual

```
┌─────────────────────────────────────────────────────┐
│  HEADER                                             │
├─────────────────────────────────────────────────────┤
│  ← Java Essencial  /  Tópico 11: Exceções           │
│                                                     │
│  ☕ Exceções em Java                                │
│  Como lidar com erros sem travar a aplicação        │
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │ POR QUE ISSO EXISTE?                          │  │
│  │ Em aplicações reais, erros acontecem: usuário │  │
│  │ envia dado inválido, banco cai, arquivo não   │  │
│  │ existe. Exceções permitem lidar com isso sem  │  │
│  │ deixar o sistema travar.                      │  │
│  └──────────────────────────────────────────────┘  │
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │ CONCEITO                                      │  │
│  │ try { código arriscado }                      │  │
│  │ catch (Exceção e) { o que fazer se der erro } │  │
│  │ finally { sempre executa }                    │  │
│  └──────────────────────────────────────────────┘  │
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │ EXEMPLO DE CÓDIGO                             │  │
│  │ ┌────────────────────────────────────────┐   │  │
│  │ │ try {                                  │   │  │
│  │ │   int result = 10 / divisor;           │   │  │
│  │ │ } catch (ArithmeticException e) {      │   │  │
│  │ │   System.out.println("Divisão por 0"); │   │  │
│  │ │ }                                      │   │  │
│  │ └────────────────────────────────────────┘   │  │
│  └──────────────────────────────────────────────┘  │
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │ PERGUNTAS DE ENTREVISTA RELACIONADAS          │  │
│  │ • Qual a diferença entre Exception e Error?   │  │
│  │ • O que é uma checked exception?              │  │
│  │ • Quando usar RuntimeException?               │  │
│  └──────────────────────────────────────────────┘  │
│                                                     │
│  [← Tópico anterior]    [Próximo tópico →]          │
│                          Marcar como concluído ✅   │
│                                                     │
├─────────────────────────────────────────────────────┤
│  FOOTER                                             │
└─────────────────────────────────────────────────────┘
```

---

## /programacao/spring-boot — Trilha Spring Boot

```
┌─────────────────────────────────────────────────────┐
│  HEADER                                             │
├─────────────────────────────────────────────────────┤
│  ← Voltar para Programação                          │
│                                                     │
│  🍃 SPRING BOOT                                     │
│  Do zero ao primeiro endpoint em produção           │
│                                                     │
│  Nível: Intermediário  •  11 tópicos  •  ~12h estim.│
│  Pré-requisito: Java Essencial ✅                   │
│                                                     │
│  [lista de tópicos similar à trilha Java]           │
│                                                     │
│  DESTAQUE DO TÓPICO                                 │
│  ┌──────────────────────────────────────────────┐  │
│  │ 🏗️ Arquitetura em Camadas                   │  │
│  │ Controller → Service → Repository             │  │
│  │ O padrão que toda empresa usa                 │  │
│  │ [Ver tópico]                                  │  │
│  └──────────────────────────────────────────────┘  │
│                                                     │
├─────────────────────────────────────────────────────┤
│  FOOTER                                             │
└─────────────────────────────────────────────────────┘
```

---

## /programacao/rest-api — Trilha REST

```
┌─────────────────────────────────────────────────────┐
│  HEADER                                             │
├─────────────────────────────────────────────────────┤
│  ← Voltar para Programação                          │
│                                                     │
│  🔗 APIs REST                                       │
│  Criando APIs que o mundo sabe consumir             │
│                                                     │
│  Nível: Intermediário  •  10 tópicos  •  ~10h estim.│
│                                                     │
│  REFERÊNCIA RÁPIDA                                  │
│  ┌────────────────────────────────────────────┐    │
│  │  GET    /usuarios        → listar todos    │    │
│  │  GET    /usuarios/42     → buscar por id   │    │
│  │  POST   /usuarios        → criar novo      │    │
│  │  PUT    /usuarios/42     → atualizar todo  │    │
│  │  PATCH  /usuarios/42     → atualizar parte │    │
│  │  DELETE /usuarios/42     → remover         │    │
│  └────────────────────────────────────────────┘    │
│                                                     │
│  [lista de tópicos]                                 │
│                                                     │
├─────────────────────────────────────────────────────┤
│  FOOTER                                             │
└─────────────────────────────────────────────────────┘
```

---

## /programacao/carreira-junior — Guia de Carreira

```
┌─────────────────────────────────────────────────────┐
│  HEADER                                             │
├─────────────────────────────────────────────────────┤
│  ← Voltar para Programação                          │
│                                                     │
│  🎯 CARREIRA JUNIOR                                 │
│  Do aprendizado para a primeira vaga                │
│                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │ 📋 Roadmap   │  │ 📁 Portfolio │  │ 🎤 Entrev.│ │
│  │ Junior → Pl  │  │ O que ter    │  │ Simulador │ │
│  │ [Ver]        │  │ [Ver]        │  │ [Ver]     │ │
│  └──────────────┘  └──────────────┘  └───────────┘ │
│                                                     │
│  CHECKLIST DE PORTFOLIO                             │
│  ┌──────────────────────────────────────────────┐  │
│  │ ☐ API REST funcionando e documentada          │  │
│  │ ☐ Banco de dados integrado                    │  │
│  │ ☐ Testes unitários escritos                   │  │
│  │ ☐ Deploy público no ar                        │  │
│  │ ☐ README profissional                         │  │
│  │ ☐ GitHub profile com pinned repos             │  │
│  └──────────────────────────────────────────────┘  │
│                                                     │
│  ROADMAP VISUAL: Junior → Pleno → Senior            │
│  ━━━━━━━━━━━○━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━     │
│  Junior     Pleno                          Senior   │
│  (você aqui)                                        │
│                                                     │
├─────────────────────────────────────────────────────┤
│  FOOTER                                             │
└─────────────────────────────────────────────────────┘
```

---

## /programacao/entrevista — Banco de Perguntas

```
┌─────────────────────────────────────────────────────┐
│  HEADER                                             │
├─────────────────────────────────────────────────────┤
│  ← Voltar para Programação                          │
│                                                     │
│  🎤 SIMULADOR DE ENTREVISTA JAVA JUNIOR             │
│  Pratique antes da entrevista real                  │
│                                                     │
│  FILTROS                                            │
│  [Todos] [Java] [Spring] [SQL] [REST] [Comp.]       │
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │ ❓ O que é injeção de dependência?            │  │
│  │ Nível: Médio  •  Tema: Spring Boot            │  │
│  │                                               │  │
│  │ [Ver resposta]                                │  │
│  └──────────────────────────────────────────────┘  │
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │ ❓ Qual a diferença entre @Controller e       │  │
│  │    @RestController?                           │  │
│  │ Nível: Fácil  •  Tema: Spring Boot            │  │
│  │                                               │  │
│  │ [Ver resposta]                                │  │
│  └──────────────────────────────────────────────┘  │
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │ ❓ O que é um DTO e por que usar?             │  │
│  │ Nível: Fácil  •  Tema: Arquitetura           │  │
│  │                                               │  │
│  │ [Ver resposta]                                │  │
│  └──────────────────────────────────────────────┘  │
│                                                     │
│  🎙️  SIMULAR ENTREVISTA POR VOZ (futuro)           │
│  Usando API Interact — responda em voz e receba     │
│  feedback automático                                │
│                                                     │
├─────────────────────────────────────────────────────┤
│  FOOTER                                             │
└─────────────────────────────────────────────────────┘
```

---

## Notas de design

- Manter consistência visual com o módulo financeiro (cores, tipografia, componentes shadcn/ui).
- O estilo deve ser mais técnico que o financeiro: espaço para código, mono fonts, badges de nível.
- Não recriar tudo — reaproveitar o painel lateral e o sistema de cards do módulo financeiro.
- Mobile-first: usuário pode estudar pelo celular entre aulas.
