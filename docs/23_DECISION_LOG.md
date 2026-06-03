# 23 — Decision Log

Use este arquivo para registrar decisoes importantes.

---

## ADR-0001 — Stack principal

Data: 2026-05-21

Decisao:
Usar TypeScript, Next.js, Tailwind, shadcn/ui, React Three Fiber, NestJS, PostgreSQL, Prisma, Redis/Upstash, Vercel, Neon e GitHub Actions.

Motivo:
Stack moderna, produtiva, com boa comunidade, baixo custo inicial e boa compatibilidade com agentes.

Consequencias:
Boa base para portfolio e produto. Curva maior em 3D/NestJS, mas controlavel.

---

## ADR-0002 — Backend principal migra para Java Spring Boot

Data: 2026-05-26

Contexto:
O criador iniciou o Bootcamp AI Java Backend. O Study Helper deve refletir esse aprendizado no backend.

Opcoes consideradas:
- Manter Node.js/NestJS como unico backend.
- Adicionar Java Spring Boot como backend principal para servicos novos.
- Reescrever tudo em Java.

Decisao:
Java Spring Boot se torna o backend principal para todos os novos servicos. Node.js/NestJS fica como legado/auxiliar ate ser substituido gradualmente.

O primeiro servico Java e a **API Interact** (Speech to Text educacional).

Motivos:
- Alinhamento com bootcamp em andamento (aprendizado real aplicado ao produto);
- Java Spring Boot e mais empregavel no mercado brasileiro;
- Permite demonstrar stack enterprise no portfolio;
- Nao exige reescrever o que ja existe agora.

Consequencias:
- Novos endpoints e servicos serao escritos em Java;
- Front-end Next.js consome ambos via provider pattern;
- Documentacao de API deve distinguir servicos Java vs Node.

Revisar em: fim do Bootcamp AI Java Backend.

---

## ADR-0003 — Study Helper e plataforma de estudos, nao so financas

Data: 2026-05-26

Contexto:
O modulo financeiro foi o primeiro a ser construido e estava sendo tratado como o produto inteiro. Isso criou confusao sobre escopo e direcao.

Decisao:
Study Helper e uma **plataforma de estudos modular** para programacao, carreira e aprendizado guiado em tecnologia. O modulo financeiro e apenas a primeira vertical.

Modulos planejados:
1. Financeiro (atual, MVP em andamento)
2. Programacao (proximo grande modulo)
3. Carreira (futuro)

Motivos:
- Publico principal e estudantes e juniors de tecnologia, nao traders;
- Modulo financeiro foi util para validar o conceito visual, mas nao define o produto;
- Programacao e mais alinhado com o criador, o bootcamp e o publico-alvo;
- Plataforma modular tem mais escopo de portfolio e produto que um app financeiro isolado.

Consequencias:
- README, CLAUDE.md e docs devem refletir essa direcao;
- Proximo sprint apos MVP financeiro planeja o modulo de programacao;
- Java Spring Boot e stack de backend ja alinhada com esse modulo;
- Features financeiras nao devem bloquear a evolucao para programacao.

---

## ADR-0005 — Priorizar modulo de programacao antes de novas features financeiras

Data: 2026-05-26

Contexto:
Com o MVP do modulo financeiro concluido (sprints 1-8), o produto esta em ponto de decisao: expandir o modulo financeiro (comparacoes, watchlist, dados reais) ou iniciar o modulo de programacao.

Opcoes consideradas:
1. Continuar expandindo o modulo financeiro (comparacoes entre ativos, watchlist, dados reais).
2. Pausar financeiro e iniciar modulo de programacao.
3. Desenvolver ambos em paralelo.

Decisao:
**Priorizar o modulo de programacao** apos o MVP financeiro.

O modulo financeiro entra em modo de manutencao — bugs sao corrigidos, mas novas features aguardam.

Motivos:
- Programacao e o modulo central do produto e do publico-alvo;
- O modulo financeiro ja demonstra o conceito visual — objetivo cumprido;
- O bootcamp AI Java Backend esta em andamento — o momento e agora;
- Features financeiras (dados reais, comparacoes) exigem integracao com API paga;
- O modulo de programacao pode ser construido com dados mockados sem custo adicional.

Consequencias:
- Sprint 11 iniciara a implementacao de /programacao com dados mockados;
- Features financeiras novas (comparacoes, watchlist, dados reais) ficam no backlog;
- Backend Java e planejado para suportar o modulo de programacao, nao so financeiro.

Revisar em: conclusao da Fase 3a do modulo de programacao.

---

## ADR-0004 — Sprint 9: Reposicionamento estrategico documentado

Data: 2026-05-26

Contexto:
Mesmo apos ADR-0003, a documentacao ainda tratava o modulo financeiro como identidade principal do produto em alguns trechos. A Sprint 9 formaliza a correcao com documentacao especifica por modulo.

Decisao:
Criar tres documentos novos de direcao estrategica:
- `36_STUDY_PLATFORM_DIRECTION.md` — direcao geral da plataforma
- `37_JAVA_BACKEND_DIRECTION.md` — estrategia de backend Java
- `38_API_INTERACT_SPEECH_TO_TEXT.md` — especificacao da API Interact

Atualizar CLAUDE.md com regra obrigatoria de classificacao de modulo para o agente.

Motivos:
- Agente precisa de instrucao clara sobre escopo de cada modulo;
- API Interact merece documento proprio por ser o projeto final do bootcamp;
- Separar direcao de backend em documento independente reduz confusao futura.

Consequencias:
- Agente deve classificar toda feature proposta por modulo antes de executar;
- Java Spring Boot e a stack obrigatoria para qualquer novo servico de backend;
- Proximo sprint planeja modulo de programacao ou estrutura base da API Interact.

---

## Template

### ADR-XXXX — Titulo

Data:

Contexto:

Opcoes consideradas:

Decisao:

Motivos:

Consequencias:

Revisar em:
