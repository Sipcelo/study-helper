import type { StudyPlan } from '@/types/study-plan';

// ─── Plano GRC 30 dias ────────────────────────────────────────────────────────

export const GRC_30_DAY_PLAN: StudyPlan = {
  id: 'plan-grc-30d',
  title: 'GRC em 30 Dias: Governança, Risco e Conformidade',
  description:
    'Plano estruturado para profissionais que querem entrar na área de Governança de TI, Gestão de Riscos e Compliance. Ideal para quem já atua em TI e quer migrar para uma área estratégica e bem remunerada.',
  area: 'seguranca',
  targetRole: 'Analista de GRC / Compliance Officer',
  difficulty: 'intermediario',
  durationDays: 30,
  totalHours: 60,
  tags: ['grc', 'governanca', 'riscos', 'compliance', 'iso27001', 'cobit', 'nist', 'lgpd'],
  status: 'rascunho',
  createdAt: '2026-05-27',

  weeks: [
    // ── Semana 1: Fundamentos de GRC ─────────────────────────────────────────
    {
      weekNumber: 1,
      theme: 'Fundamentos de GRC',
      objective: 'Entender o que é GRC, por que existe e como se relaciona com o negócio.',
      days: [
        {
          dayNumber: 1,
          title: 'O que é GRC?',
          objective: 'Compreender a definição, os pilares e o mercado de GRC.',
          estimatedMinutes: 120,
          tasks: [
            { id: 'grc-1-1', title: 'Ler introdução ao GRC — conceito e pilares', type: 'leitura', durationMinutes: 30, completed: false },
            { id: 'grc-1-2', title: 'Assistir: GRC Overview (ISACA)', type: 'video', durationMinutes: 45, completed: false },
            { id: 'grc-1-3', title: 'Mapear diferenças: Governança vs Risco vs Compliance', type: 'pratica', durationMinutes: 30, completed: false },
            { id: 'grc-1-4', title: 'Quiz: Conceitos básicos GRC', type: 'quiz', durationMinutes: 15, completed: false },
          ],
          materials: [
            { title: 'ISACA — What is GRC?', type: 'artigo', description: 'Definição oficial de GRC pela ISACA com exemplos de aplicação.' },
            { title: 'GRC Explained in 5 minutes', type: 'video', description: 'Visão executiva de GRC — ideal para contextualizar o papel na empresa.' },
          ],
          artifact: {
            title: 'Mapa mental: Os 3 pilares do GRC',
            type: 'diagrama',
            description: 'Desenhe as relações entre Governança, Risco e Conformidade. Inclua exemplos reais do seu contexto.',
            template: 'Centro: GRC | Ramo 1: Governança (quem decide, políticas, diretrizes) | Ramo 2: Risco (identificação, avaliação, mitigação) | Ramo 3: Conformidade (leis, normas, auditorias)',
          },
          reviewQuestions: [
            { question: 'O que diferencia Governança de Gerenciamento?', difficulty: 'facil' },
            { question: 'Por que uma empresa precisaria de um programa GRC integrado?', difficulty: 'medio' },
          ],
        },
        {
          dayNumber: 2,
          title: 'Governança de TI',
          objective: 'Entender como decisões de TI são estruturadas e quem tem responsabilidade.',
          estimatedMinutes: 120,
          tasks: [
            { id: 'grc-2-1', title: 'Ler sobre estruturas de governança de TI', type: 'leitura', durationMinutes: 40, completed: false },
            { id: 'grc-2-2', title: 'Comparar modelos de governança: centralizado vs federado', type: 'pesquisa', durationMinutes: 30, completed: false },
            { id: 'grc-2-3', title: 'Praticar: Identificar papéis em um organograma de TI real', type: 'pratica', durationMinutes: 30, completed: false },
            { id: 'grc-2-4', title: 'Revisar conceitos do dia anterior', type: 'revisao', durationMinutes: 20, completed: false },
          ],
          materials: [
            { title: 'IT Governance Institute — Frameworks Overview', type: 'documentacao', description: 'Visão geral dos frameworks de governança de TI.' },
            { title: 'Governança de TI na prática — blog ISACA Brasil', type: 'artigo', description: 'Casos reais de implementação de governança em empresas brasileiras.' },
          ],
          artifact: {
            title: 'Tabela: Responsabilidades de Governança de TI',
            type: 'planilha',
            description: 'Crie uma tabela com papéis (CIO, CISO, Comitê de TI, Áreas de negócio) e suas responsabilidades de governança.',
            template: 'Papel | Responsabilidade principal | Decisões que toma | Quem reporta para',
          },
          reviewQuestions: [
            { question: 'Qual a diferença entre governança de TI e gestão de TI?', difficulty: 'facil' },
            { question: 'Como um Comitê de TI melhora a tomada de decisão?', difficulty: 'medio' },
          ],
        },
        {
          dayNumber: 3,
          title: 'Gestão de Riscos — Conceitos Fundamentais',
          objective: 'Aprender o ciclo de vida do risco: identificar, avaliar, tratar, monitorar.',
          estimatedMinutes: 120,
          tasks: [
            { id: 'grc-3-1', title: 'Ler: Ciclo de vida do risco (ISO 31000)', type: 'leitura', durationMinutes: 45, completed: false },
            { id: 'grc-3-2', title: 'Montar uma matriz de risco 5x5', type: 'pratica', durationMinutes: 45, completed: false },
            { id: 'grc-3-3', title: 'Quiz: Probabilidade × Impacto', type: 'quiz', durationMinutes: 20, completed: false },
            { id: 'grc-3-4', title: 'Revisar e anotar dúvidas', type: 'revisao', durationMinutes: 10, completed: false },
          ],
          materials: [
            { title: 'ISO 31000 — Risk Management Guidelines (resumo)', type: 'documentacao', description: 'Resumo dos princípios e processo da ISO 31000.' },
            { title: 'Matriz de Risco: como construir e usar', type: 'artigo', description: 'Guia prático para criar e interpretar matrizes de risco.' },
          ],
          artifact: {
            title: 'Matriz de Risco: Meu contexto',
            type: 'planilha',
            description: 'Identifique 5 riscos reais (trabalho, projeto pessoal ou hipotético). Classifique probabilidade e impacto. Defina o tratamento para cada um.',
            template: 'Risco | Categoria | Probabilidade (1-5) | Impacto (1-5) | Nível | Tratamento (aceitar/mitigar/transferir/evitar)',
          },
          reviewQuestions: [
            { question: 'Quais são as 4 estratégias de tratamento de risco?', difficulty: 'facil' },
            { question: 'Como calcular o risco residual após aplicar controles?', difficulty: 'medio' },
          ],
        },
        {
          dayNumber: 4,
          title: 'Conformidade e Regulamentações',
          objective: 'Entender os tipos de conformidade e o papel do profissional de compliance.',
          estimatedMinutes: 120,
          tasks: [
            { id: 'grc-4-1', title: 'Ler sobre tipos de conformidade: regulatória, contratual, interna', type: 'leitura', durationMinutes: 30, completed: false },
            { id: 'grc-4-2', title: 'Pesquisar: principais regulamentações no Brasil (LGPD, Bacen, CVM)', type: 'pesquisa', durationMinutes: 40, completed: false },
            { id: 'grc-4-3', title: 'Mapear obrigações de conformidade para uma empresa fictícia', type: 'pratica', durationMinutes: 30, completed: false },
            { id: 'grc-4-4', title: 'Revisar semana 1 até agora', type: 'revisao', durationMinutes: 20, completed: false },
          ],
          materials: [
            { title: 'LGPD — Lei Geral de Proteção de Dados (texto oficial)', type: 'documentacao', description: 'Lei 13.709/2018 — obrigações, direitos dos titulares, penalidades.' },
            { title: 'Compliance no setor financeiro — Banco Central', type: 'artigo', description: 'Circular BACEN 3.978 e obrigações de compliance para instituições financeiras.' },
          ],
          artifact: {
            title: 'Mapa de Obrigações Regulatórias',
            type: 'documento',
            description: 'Para uma empresa fictícia (ex: fintech de crédito), liste as regulamentações aplicáveis, o que cada uma exige e quem é responsável.',
            template: 'Regulamentação | Órgão regulador | O que exige | Responsável interno | Periodicidade',
          },
          reviewQuestions: [
            { question: 'Qual a diferença entre conformidade regulatória e conformidade interna?', difficulty: 'facil' },
            { question: 'O que acontece com uma empresa que descumpre a LGPD?', difficulty: 'medio' },
          ],
        },
        {
          dayNumber: 5,
          title: 'Revisão da Semana 1 + Consolidação',
          objective: 'Consolidar os conceitos da semana e preparar base para os frameworks.',
          estimatedMinutes: 90,
          tasks: [
            { id: 'grc-5-1', title: 'Revisar todos os artefatos criados na semana', type: 'revisao', durationMinutes: 30, completed: false },
            { id: 'grc-5-2', title: 'Quiz de revisão: semana 1', type: 'quiz', durationMinutes: 30, completed: false },
            { id: 'grc-5-3', title: 'Atualizar mapa mental com conexões entre os 3 pilares', type: 'pratica', durationMinutes: 30, completed: false },
          ],
          materials: [],
          reviewQuestions: [
            { question: 'Como os 3 pilares do GRC se relacionam na prática?', difficulty: 'medio' },
            { question: 'Cite um exemplo onde falha de governança levou a um risco materializado.', difficulty: 'dificil' },
          ],
        },
      ],
    },

    // ── Semana 2: Frameworks ──────────────────────────────────────────────────
    {
      weekNumber: 2,
      theme: 'Frameworks de GRC',
      objective: 'Conhecer COBIT, ISO 27001 e NIST — os frameworks mais cobrados em entrevistas e certificações.',
      days: [
        {
          dayNumber: 6,
          title: 'COBIT — Governança e Gerenciamento de TI',
          objective: 'Entender a estrutura do COBIT e como ele mapeia processos de TI.',
          estimatedMinutes: 120,
          tasks: [
            { id: 'grc-6-1', title: 'Ler: COBIT 2019 — visão geral e domínios', type: 'leitura', durationMinutes: 45, completed: false },
            { id: 'grc-6-2', title: 'Mapear os 5 domínios do COBIT', type: 'pratica', durationMinutes: 30, completed: false },
            { id: 'grc-6-3', title: 'Identificar processos críticos do COBIT para PMEs', type: 'pesquisa', durationMinutes: 30, completed: false },
            { id: 'grc-6-4', title: 'Quiz COBIT básico', type: 'quiz', durationMinutes: 15, completed: false },
          ],
          materials: [
            { title: 'COBIT 2019 Framework — ISACA (resumo gratuito)', type: 'documentacao', description: 'Introdução oficial ao COBIT 2019 com domínios e objetivos de governança.' },
            { title: 'COBIT vs ITIL — quando usar cada um', type: 'artigo', description: 'Comparativo prático entre os dois frameworks mais usados em governança de TI.' },
          ],
          artifact: {
            title: 'Diagrama: Domínios do COBIT 2019',
            type: 'diagrama',
            description: 'Desenhe os 5 domínios do COBIT com exemplos de processos em cada um. Destaque quais processos são mais relevantes para GRC.',
            template: 'EDM (Evaluate, Direct, Monitor) | APO (Align, Plan, Organize) | BAI (Build, Acquire, Implement) | DSS (Deliver, Service, Support) | MEA (Monitor, Evaluate, Assess)',
          },
          reviewQuestions: [
            { question: 'Qual domínio do COBIT lida com avaliação e direcionamento estratégico?', difficulty: 'facil' },
            { question: 'Como o COBIT se diferencia de outros frameworks como ITIL?', difficulty: 'medio' },
          ],
        },
        {
          dayNumber: 7,
          title: 'ISO 27001 — Segurança da Informação',
          objective: 'Compreender a estrutura da ISO 27001 e o ISMS (Information Security Management System).',
          estimatedMinutes: 120,
          tasks: [
            { id: 'grc-7-1', title: 'Ler: Estrutura ISO 27001:2022 — cláusulas e Anexo A', type: 'leitura', durationMinutes: 50, completed: false },
            { id: 'grc-7-2', title: 'Mapear controles do Anexo A por categoria', type: 'pratica', durationMinutes: 40, completed: false },
            { id: 'grc-7-3', title: 'Quiz ISO 27001', type: 'quiz', durationMinutes: 20, completed: false },
            { id: 'grc-7-4', title: 'Revisar e consolidar', type: 'revisao', durationMinutes: 10, completed: false },
          ],
          materials: [
            { title: 'ISO 27001:2022 — Introduction and Overview', type: 'documentacao', description: 'Visão geral da norma, estrutura de alto nível e principais mudanças de 2013 para 2022.' },
            { title: 'Implementando ISO 27001 em pequenas empresas', type: 'artigo', description: 'Guia prático com passos para iniciar um ISMS mesmo sem grandes recursos.' },
          ],
          artifact: {
            title: 'Checklist: Controles ISO 27001 — Avaliação inicial',
            type: 'planilha',
            description: 'Selecione 10 controles do Anexo A. Para cada um: está implementado? Parcialmente? Ausente? Justifique a prioridade.',
            template: 'Controle | Categoria | Status (Implementado/Parcial/Ausente) | Prioridade | Ação necessária',
          },
          reviewQuestions: [
            { question: 'Quantas cláusulas tem a ISO 27001 (excluindo o Anexo A)?', difficulty: 'facil' },
            { question: 'O que é uma Declaração de Aplicabilidade (SoA)?', difficulty: 'medio' },
          ],
        },
        {
          dayNumber: 8,
          title: 'NIST Cybersecurity Framework',
          objective: 'Aprender o NIST CSF — o framework mais usado nos EUA e crescendo no Brasil.',
          estimatedMinutes: 120,
          tasks: [
            { id: 'grc-8-1', title: 'Ler: NIST CSF 2.0 — funções e categorias', type: 'leitura', durationMinutes: 45, completed: false },
            { id: 'grc-8-2', title: 'Mapear as 6 funções do NIST CSF 2.0', type: 'pratica', durationMinutes: 30, completed: false },
            { id: 'grc-8-3', title: 'Comparar NIST CSF com ISO 27001', type: 'pesquisa', durationMinutes: 30, completed: false },
            { id: 'grc-8-4', title: 'Quiz NIST', type: 'quiz', durationMinutes: 15, completed: false },
          ],
          materials: [
            { title: 'NIST CSF 2.0 — Official Document (NIST)', type: 'documentacao', description: 'Framework oficial com as 6 funções: Govern, Identify, Protect, Detect, Respond, Recover.' },
            { title: 'NIST vs ISO 27001 — Side by Side', type: 'artigo', description: 'Comparativo prático para quem precisa escolher ou combinar os dois frameworks.' },
          ],
          artifact: {
            title: 'Diagrama: NIST CSF 2.0 — As 6 Funções',
            type: 'diagrama',
            description: 'Crie um diagrama circular com as 6 funções do NIST CSF 2.0. Para cada função, escreva 2 exemplos de subcategorias aplicáveis ao seu contexto.',
          },
          reviewQuestions: [
            { question: 'Quais são as 6 funções do NIST CSF 2.0?', difficulty: 'facil' },
            { question: 'Por que o NIST CSF foi atualizado de 5 para 6 funções em 2024?', difficulty: 'medio' },
          ],
        },
        {
          dayNumber: 9,
          title: 'LGPD e Privacidade de Dados',
          objective: 'Entender as obrigações da LGPD e como o DPO se relaciona com GRC.',
          estimatedMinutes: 120,
          tasks: [
            { id: 'grc-9-1', title: 'Ler: LGPD — artigos essenciais (1-20, 41-56)', type: 'leitura', durationMinutes: 50, completed: false },
            { id: 'grc-9-2', title: 'Mapear bases legais de tratamento de dados', type: 'pratica', durationMinutes: 30, completed: false },
            { id: 'grc-9-3', title: 'Criar lista de verificação LGPD para uma empresa fictícia', type: 'pratica', durationMinutes: 30, completed: false },
            { id: 'grc-9-4', title: 'Revisar semana 2 até agora', type: 'revisao', durationMinutes: 10, completed: false },
          ],
          materials: [
            { title: 'LGPD — Lei 13.709/2018 (texto oficial)', type: 'documentacao', description: 'Lei completa com todas as obrigações, prazos e penalidades.' },
            { title: 'Guia ANPD para pequenas empresas', type: 'artigo', description: 'Guia prático da Autoridade Nacional de Proteção de Dados para conformidade.' },
          ],
          artifact: {
            title: 'Mapeamento de dados pessoais',
            type: 'planilha',
            description: 'Para uma empresa fictícia (e-commerce), identifique 8 tipos de dados pessoais coletados, a base legal de tratamento e o responsável pelo tratamento.',
            template: 'Dado pessoal | Finalidade | Base legal | Tempo de retenção | Compartilhado com quem | Responsável',
          },
          reviewQuestions: [
            { question: 'O que é uma base legal para tratamento de dados segundo a LGPD?', difficulty: 'facil' },
            { question: 'Quais são as responsabilidades do DPO (Encarregado) segundo a LGPD?', difficulty: 'medio' },
          ],
        },
        {
          dayNumber: 10,
          title: 'Revisão da Semana 2 + Comparativo de Frameworks',
          objective: 'Consolidar o conhecimento dos frameworks e saber quando usar cada um.',
          estimatedMinutes: 90,
          tasks: [
            { id: 'grc-10-1', title: 'Criar tabela comparativa: COBIT × ISO 27001 × NIST × LGPD', type: 'pratica', durationMinutes: 40, completed: false },
            { id: 'grc-10-2', title: 'Quiz de revisão: frameworks', type: 'quiz', durationMinutes: 30, completed: false },
            { id: 'grc-10-3', title: 'Revisar todos os artefatos da semana', type: 'revisao', durationMinutes: 20, completed: false },
          ],
          materials: [],
          artifact: {
            title: 'Tabela comparativa de frameworks GRC',
            type: 'planilha',
            description: 'Compare COBIT, ISO 27001, NIST CSF e LGPD em: foco, mandatório/voluntário, certificação disponível, quando usar.',
            template: 'Framework | Foco principal | Mandatório? | Certificação | Ideal para | Limitações',
          },
          reviewQuestions: [
            { question: 'Um banco brasileiro deve priorizar qual framework? Por quê?', difficulty: 'dificil' },
            { question: 'COBIT e ISO 27001 se complementam ou se excluem?', difficulty: 'medio' },
          ],
        },
      ],
    },

    // ── Semana 3: Implementação Prática ──────────────────────────────────────
    {
      weekNumber: 3,
      theme: 'Implementando GRC na Prática',
      objective: 'Aprender a fazer análise de risco, auditorias internas e criar políticas.',
      days: [
        {
          dayNumber: 11,
          title: 'Análise de Risco na Prática',
          objective: 'Executar uma análise de risco completa usando metodologia reconhecida.',
          estimatedMinutes: 120,
          tasks: [
            { id: 'grc-11-1', title: 'Ler: metodologias de análise de risco (OCTAVE, FAIR)', type: 'leitura', durationMinutes: 40, completed: false },
            { id: 'grc-11-2', title: 'Executar análise de risco para um ativo fictício', type: 'pratica', durationMinutes: 50, completed: false },
            { id: 'grc-11-3', title: 'Documentar plano de tratamento de riscos', type: 'projeto', durationMinutes: 30, completed: false },
          ],
          materials: [
            { title: 'FAIR — Factor Analysis of Information Risk', type: 'artigo', description: 'Metodologia quantitativa para análise de risco em segurança da informação.' },
            { title: 'OCTAVE Allegro — guia simplificado', type: 'documentacao', description: 'Metodologia para análise de risco focada em ativos de informação.' },
          ],
          artifact: {
            title: 'Relatório de Análise de Risco',
            type: 'documento',
            description: 'Documente uma análise de risco completa para um cenário fictício (ex: vazamento de dados de clientes). Inclua ativo, ameaças, vulnerabilidades, probabilidade, impacto e tratamento.',
            template: 'Ativo | Ameaça | Vulnerabilidade | Probabilidade | Impacto | Risco (P×I) | Controles existentes | Tratamento proposto | Risco residual',
          },
          reviewQuestions: [
            { question: 'O que diferencia risco inerente de risco residual?', difficulty: 'medio' },
            { question: 'Quando usar análise quantitativa vs qualitativa de riscos?', difficulty: 'dificil' },
          ],
        },
        {
          dayNumber: 12,
          title: 'Políticas e Procedimentos de Segurança',
          objective: 'Criar e estruturar políticas de segurança da informação.',
          estimatedMinutes: 120,
          tasks: [
            { id: 'grc-12-1', title: 'Ler: hierarquia de documentos de segurança (Política > Norma > Procedimento)', type: 'leitura', durationMinutes: 30, completed: false },
            { id: 'grc-12-2', title: 'Analisar exemplos de PSI (Política de Segurança da Informação)', type: 'leitura', durationMinutes: 30, completed: false },
            { id: 'grc-12-3', title: 'Escrever seção de PSI para uso aceitável de recursos', type: 'projeto', durationMinutes: 45, completed: false },
            { id: 'grc-12-4', title: 'Revisar e ajustar com base em boas práticas', type: 'revisao', durationMinutes: 15, completed: false },
          ],
          materials: [
            { title: 'SANS Security Policy Templates', type: 'ferramenta', description: 'Modelos gratuitos de políticas de segurança do SANS Institute.' },
            { title: 'Como escrever uma PSI eficaz', type: 'artigo', description: 'Guia prático para criar políticas que as pessoas realmente leem e seguem.' },
          ],
          artifact: {
            title: 'Política de Uso Aceitável de Recursos de TI',
            type: 'documento',
            description: 'Escreva uma política de 1-2 páginas cobrindo: objetivo, escopo, responsabilidades, uso aceitável, uso proibido, consequências e revisão.',
          },
          reviewQuestions: [
            { question: 'Qual a diferença entre política, norma e procedimento?', difficulty: 'facil' },
            { question: 'Como garantir que os colaboradores realmente conheçam as políticas?', difficulty: 'medio' },
          ],
        },
        {
          dayNumber: 13,
          title: 'Auditorias Internas',
          objective: 'Entender o processo de auditoria interna e como conduzir uma.',
          estimatedMinutes: 120,
          tasks: [
            { id: 'grc-13-1', title: 'Ler: processo de auditoria interna (planejamento, execução, relatório)', type: 'leitura', durationMinutes: 40, completed: false },
            { id: 'grc-13-2', title: 'Criar checklist de auditoria para controle de acesso', type: 'pratica', durationMinutes: 40, completed: false },
            { id: 'grc-13-3', title: 'Simular entrevista de auditoria — perguntas e respostas', type: 'pratica', durationMinutes: 30, completed: false },
            { id: 'grc-13-4', title: 'Revisar semana 3 até agora', type: 'revisao', durationMinutes: 10, completed: false },
          ],
          materials: [
            { title: 'IIA — Institute of Internal Auditors — Standards', type: 'documentacao', description: 'Padrões internacionais de auditoria interna.' },
            { title: 'Como conduzir uma auditoria de controle de acesso', type: 'artigo', description: 'Passo a passo para auditar o gerenciamento de identidades e acessos.' },
          ],
          artifact: {
            title: 'Checklist de Auditoria: Controle de Acesso',
            type: 'planilha',
            description: 'Crie um checklist de 15+ itens para auditar o controle de acesso de uma empresa. Inclua: item a verificar, evidência esperada, resultado (conforme/não conforme), observações.',
            template: 'Item | Critério (norma/política) | Evidência esperada | Resultado | Observações',
          },
          reviewQuestions: [
            { question: 'Quais são as fases de uma auditoria interna?', difficulty: 'facil' },
            { question: 'Como tratar uma não conformidade encontrada em auditoria?', difficulty: 'medio' },
          ],
        },
        {
          dayNumber: 14,
          title: 'Indicadores e Métricas de GRC',
          objective: 'Aprender a medir a efetividade do programa GRC com KPIs e KRIs.',
          estimatedMinutes: 120,
          tasks: [
            { id: 'grc-14-1', title: 'Ler: KPIs vs KRIs em GRC', type: 'leitura', durationMinutes: 30, completed: false },
            { id: 'grc-14-2', title: 'Criar dashboard de métricas de GRC (design em papel/ferramenta)', type: 'pratica', durationMinutes: 45, completed: false },
            { id: 'grc-14-3', title: 'Pesquisar: métricas mais usadas em programas GRC maduros', type: 'pesquisa', durationMinutes: 30, completed: false },
            { id: 'grc-14-4', title: 'Revisar semana completa', type: 'revisao', durationMinutes: 15, completed: false },
          ],
          materials: [
            { title: 'GRC Metrics that Matter', type: 'artigo', description: 'As 20 métricas mais importantes para um programa GRC segundo o Gartner.' },
            { title: 'ISACA — IT Risk Metrics', type: 'documentacao', description: 'Catálogo de métricas de risco de TI recomendadas pela ISACA.' },
          ],
          artifact: {
            title: 'Dashboard de Métricas GRC',
            type: 'planilha',
            description: 'Crie uma planilha com 10 KPIs e 5 KRIs para um programa GRC. Inclua: nome, fórmula, fonte dos dados, frequência, meta e limiar de alerta.',
            template: 'Indicador | Tipo (KPI/KRI) | Fórmula | Fonte | Frequência | Meta | Alerta | Ação se alertado',
          },
          reviewQuestions: [
            { question: 'O que é um KRI (Key Risk Indicator)?', difficulty: 'facil' },
            { question: 'Como escolher métricas que o board da empresa realmente entenda?', difficulty: 'dificil' },
          ],
        },
        {
          dayNumber: 15,
          title: 'Revisão Semana 3 + Simulado de Entrevista',
          objective: 'Consolidar a semana e praticar as perguntas mais comuns em entrevistas de GRC.',
          estimatedMinutes: 90,
          tasks: [
            { id: 'grc-15-1', title: 'Revisar todos os artefatos da semana 3', type: 'revisao', durationMinutes: 20, completed: false },
            { id: 'grc-15-2', title: 'Simulado: 10 perguntas de entrevista GRC', type: 'quiz', durationMinutes: 40, completed: false },
            { id: 'grc-15-3', title: 'Refinar respostas com base no feedback', type: 'pratica', durationMinutes: 30, completed: false },
          ],
          materials: [
            { title: '50 perguntas de entrevista GRC mais comuns', type: 'artigo', description: 'Banco de perguntas com respostas modelo para entrevistas na área de GRC.' },
          ],
          reviewQuestions: [
            { question: 'Como você explicaria GRC para um executivo de negócios?', difficulty: 'medio' },
            { question: 'Descreva uma situação onde risco e conformidade entraram em conflito.', difficulty: 'dificil' },
          ],
        },
      ],
    },

    // ── Semana 4: Carreira e Certificações ────────────────────────────────────
    {
      weekNumber: 4,
      theme: 'Carreira em GRC e Certificações',
      objective: 'Entender o mercado de trabalho, certificações e como se posicionar para a área.',
      days: [
        {
          dayNumber: 16,
          title: 'Mercado de Trabalho em GRC',
          objective: 'Mapear oportunidades, salários e empresas que contratam para GRC.',
          estimatedMinutes: 90,
          tasks: [
            { id: 'grc-16-1', title: 'Pesquisar vagas de GRC no LinkedIn e Glassdoor', type: 'pesquisa', durationMinutes: 30, completed: false },
            { id: 'grc-16-2', title: 'Mapear habilidades mais exigidas nas vagas', type: 'pratica', durationMinutes: 30, completed: false },
            { id: 'grc-16-3', title: 'Identificar 5 empresas alvo para se candidatar', type: 'pratica', durationMinutes: 30, completed: false },
          ],
          materials: [
            { title: 'Guia salarial: área de GRC Brasil 2024', type: 'artigo', description: 'Dados de remuneração por nível de experiência e tipo de empresa.' },
          ],
          artifact: {
            title: 'Mapa de Empresas Alvo',
            type: 'planilha',
            description: 'Liste 5 empresas alvo com: setor, porte, por que quer trabalhar lá, contatos LinkedIn, próxima ação.',
            template: 'Empresa | Setor | Porte | Por que quero | Contato no LinkedIn | Próxima ação | Status',
          },
          reviewQuestions: [
            { question: 'Quais setores mais contratam profissionais de GRC no Brasil?', difficulty: 'facil' },
          ],
        },
        {
          dayNumber: 17,
          title: 'Roadmap de Certificações',
          objective: 'Entender quais certificações valem a pena e criar um plano.',
          estimatedMinutes: 120,
          tasks: [
            { id: 'grc-17-1', title: 'Pesquisar certificações: CRISC, CISM, CISA, ISO 27001 Lead Auditor', type: 'pesquisa', durationMinutes: 40, completed: false },
            { id: 'grc-17-2', title: 'Calcular custo-benefício de cada certificação', type: 'pratica', durationMinutes: 30, completed: false },
            { id: 'grc-17-3', title: 'Criar roadmap pessoal de certificações (12-24 meses)', type: 'projeto', durationMinutes: 40, completed: false },
            { id: 'grc-17-4', title: 'Revisar e ajustar o plano', type: 'revisao', durationMinutes: 10, completed: false },
          ],
          materials: [
            { title: 'ISACA Certifications Overview', type: 'documentacao', description: 'CISA, CISM, CRISC, CGEIT — pré-requisitos, custos e valor de mercado.' },
            { title: 'Vale a pena a ISO 27001 Lead Auditor?', type: 'artigo', description: 'Análise custo-benefício da certificação Lead Auditor para profissionais no Brasil.' },
          ],
          artifact: {
            title: 'Roadmap de Certificações GRC',
            type: 'documento',
            description: 'Crie seu roadmap pessoal: certificação 1 (6 meses), certificação 2 (12 meses), certificação 3 (24 meses). Inclua custo estimado, horas de estudo e como financiar.',
          },
          reviewQuestions: [
            { question: 'Qual a diferença entre CISM e CISA?', difficulty: 'medio' },
          ],
        },
        {
          dayNumber: 18,
          title: 'LinkedIn e Portfólio para GRC',
          objective: 'Posicionar o perfil profissional e criar portfólio de artefatos GRC.',
          estimatedMinutes: 120,
          tasks: [
            { id: 'grc-18-1', title: 'Otimizar headline e resumo do LinkedIn para GRC', type: 'projeto', durationMinutes: 40, completed: false },
            { id: 'grc-18-2', title: 'Selecionar 5 artefatos criados nas semanas anteriores para portfólio', type: 'pratica', durationMinutes: 30, completed: false },
            { id: 'grc-18-3', title: 'Publicar primeiro artigo ou post técnico sobre GRC', type: 'projeto', durationMinutes: 40, completed: false },
            { id: 'grc-18-4', title: 'Conectar com 10 profissionais da área', type: 'pratica', durationMinutes: 10, completed: false },
          ],
          materials: [
            { title: 'LinkedIn para profissionais de segurança e GRC', type: 'artigo', description: 'Como construir presença digital na área de GRC e segurança da informação.' },
          ],
          artifact: {
            title: 'Portfólio GRC — Seleção de artefatos',
            type: 'portfolio',
            description: 'Selecione e organize seus 5 melhores artefatos das semanas anteriores. Para cada um: título, contexto, o que você aprendeu e como aplicaria no trabalho.',
          },
          reviewQuestions: [
            { question: 'Como você descreveria sua experiência em GRC em 3 frases no LinkedIn?', difficulty: 'medio' },
          ],
        },
        {
          dayNumber: 19,
          title: 'Simulado Final de Entrevista',
          objective: 'Praticar as 20 perguntas mais comuns em entrevistas de GRC.',
          estimatedMinutes: 120,
          tasks: [
            { id: 'grc-19-1', title: 'Responder 20 perguntas técnicas de GRC (cronometrado)', type: 'quiz', durationMinutes: 60, completed: false },
            { id: 'grc-19-2', title: 'Auto-avaliar respostas com gabarito', type: 'revisao', durationMinutes: 30, completed: false },
            { id: 'grc-19-3', title: 'Praticar resposta STAR para perguntas comportamentais', type: 'pratica', durationMinutes: 30, completed: false },
          ],
          materials: [
            { title: 'GRC Interview Questions — Top 30', type: 'artigo', description: 'As 30 perguntas mais comuns com análise do que o entrevistador quer saber.' },
          ],
          reviewQuestions: [
            { question: 'Descreva como você implementaria um programa GRC em uma empresa sem nenhum controle.', difficulty: 'dificil' },
          ],
        },
        {
          dayNumber: 20,
          title: 'Revisão Semana 4 + Planejamento Final',
          objective: 'Consolidar a semana e preparar o projeto final.',
          estimatedMinutes: 90,
          tasks: [
            { id: 'grc-20-1', title: 'Revisar todos os artefatos do curso', type: 'revisao', durationMinutes: 30, completed: false },
            { id: 'grc-20-2', title: 'Definir escopo do projeto final', type: 'projeto', durationMinutes: 30, completed: false },
            { id: 'grc-20-3', title: 'Criar estrutura inicial do projeto final', type: 'projeto', durationMinutes: 30, completed: false },
          ],
          materials: [],
          reviewQuestions: [
            { question: 'Quais são as 3 principais habilidades que você desenvolveu neste plano?', difficulty: 'facil' },
          ],
        },
      ],
    },

    // ── Semana 5 (parcial): Projeto Final ────────────────────────────────────
    {
      weekNumber: 5,
      theme: 'Projeto Final: Programa GRC Simplificado',
      objective: 'Integrar todo o aprendizado em um programa GRC documentado para uma empresa fictícia.',
      days: [
        {
          dayNumber: 21,
          title: 'Desenvolvimento do Projeto Final — Parte 1',
          objective: 'Construir as seções de Governança e Risco do programa GRC.',
          estimatedMinutes: 180,
          tasks: [
            { id: 'grc-21-1', title: 'Definir empresa fictícia: setor, porte, contexto', type: 'projeto', durationMinutes: 20, completed: false },
            { id: 'grc-21-2', title: 'Documentar estrutura de governança de TI', type: 'projeto', durationMinutes: 60, completed: false },
            { id: 'grc-21-3', title: 'Executar análise de risco completa (10 riscos)', type: 'projeto', durationMinutes: 80, completed: false },
            { id: 'grc-21-4', title: 'Revisar e consolidar parte 1', type: 'revisao', durationMinutes: 20, completed: false },
          ],
          materials: [],
          reviewQuestions: [],
        },
        {
          dayNumber: 22,
          title: 'Desenvolvimento do Projeto Final — Parte 2',
          objective: 'Construir as seções de Conformidade e Políticas do programa GRC.',
          estimatedMinutes: 180,
          tasks: [
            { id: 'grc-22-1', title: 'Mapear obrigações regulatórias da empresa fictícia', type: 'projeto', durationMinutes: 50, completed: false },
            { id: 'grc-22-2', title: 'Escrever 2 políticas de segurança completas', type: 'projeto', durationMinutes: 80, completed: false },
            { id: 'grc-22-3', title: 'Criar checklist de auditoria para os principais controles', type: 'projeto', durationMinutes: 40, completed: false },
            { id: 'grc-22-4', title: 'Consolidar e revisar projeto completo', type: 'revisao', durationMinutes: 10, completed: false },
          ],
          materials: [],
          reviewQuestions: [],
        },
      ],
    },
  ],

  finalProject: {
    title: 'Programa GRC Simplificado: Empresa Fictícia',
    description:
      'Desenvolva um programa GRC completo para uma empresa fictícia de sua escolha (fintech, hospital, e-commerce, indústria). O programa deve ser documentado e apresentável como portfólio.',
    deliverables: [
      'Apresentação executiva (10 slides): contexto da empresa, situação atual, maturidade GRC',
      'Relatório de análise de risco com 10 riscos identificados, avaliados e com plano de tratamento',
      'Mapa de conformidade: regulamentações aplicáveis e status de aderência',
      'Duas políticas de segurança completas (PSI e Política de Controle de Acesso)',
      'Checklist de auditoria para os 3 controles mais críticos',
      'Dashboard de métricas GRC com 10 indicadores e metas',
      'Roadmap de implementação do programa GRC (0-12 meses)',
    ],
    estimatedHours: 20,
  },
};

export const STUDY_PLAN_EXAMPLES: StudyPlan[] = [GRC_30_DAY_PLAN];
