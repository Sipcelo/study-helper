import type {
  StudyPlan, StudyPlanFormData, StudyPlanArea, StudyPlanDifficulty,
  StudyTask, StudyTaskType, StudyMaterial, StudyArtifact, StudyQuestion,
  StudyDay, StudyWeek, StudyPreferredStyle,
} from '@/types/study-plan';

// ─── Content tables ───────────────────────────────────────────────────────────

interface PhaseContent {
  theme: string;
  objective: string;
  taskTitles: string[];
  taskType: StudyTaskType;
  material: StudyMaterial;
  artifact: StudyArtifact;
  questions: StudyQuestion[];
}

const AREA_PHASES: Record<string, PhaseContent[]> = {
  programacao: [
    {
      theme: 'Fundamentos e sintaxe',
      objective: 'Configurar ambiente, entender estrutura Spring Boot e conceitos Java essenciais',
      taskTitles: ['Configurar JDK 21 e IDE IntelliJ/Eclipse', 'Criar projeto com Spring Initializr', 'Entender estrutura Maven e dependências', 'Escrever primeira classe Java com main()', 'Explorar @SpringBootApplication e @RestController'],
      taskType: 'leitura',
      material: { title: 'Spring Boot Reference Documentation', type: 'documentacao', description: 'Documentação oficial do Spring Boot' },
      artifact: { title: 'Repositório GitHub inicializado', type: 'codigo', description: 'Projeto Spring Boot configurado e publicado no GitHub.' },
      questions: [
        { question: 'O que é inversão de controle (IoC)?', difficulty: 'facil' },
        { question: 'Qual a diferença entre @Component, @Service e @Repository?', difficulty: 'medio' },
        { question: 'O que faz @SpringBootApplication?', difficulty: 'facil' },
      ],
    },
    {
      theme: 'Prática com código',
      objective: 'Criar endpoints REST, configurar persistência e implementar CRUD básico',
      taskTitles: ['Criar endpoint GET /api/items e testar com Postman', 'Implementar POST com @RequestBody e Bean Validation', 'Configurar banco H2 em memória', 'Criar entidade JPA e JpaRepository', 'Mapear erros com @ExceptionHandler global'],
      taskType: 'pratica',
      material: { title: 'Building REST Services with Spring', type: 'documentacao', description: 'Guia oficial de REST com Spring' },
      artifact: { title: 'CRUD funcional documentado', type: 'codigo', description: 'Endpoints CRUD com testes no Postman/Insomnia.' },
      questions: [
        { question: 'O que é REST e quais são os principais verbos HTTP?', difficulty: 'facil' },
        { question: 'Qual a diferença entre PUT e PATCH?', difficulty: 'medio' },
        { question: 'O que é DTO e por que usá-lo?', difficulty: 'medio' },
      ],
    },
    {
      theme: 'Mini projeto',
      objective: 'Desenvolver projeto completo com lógica de negócio, DTOs e tratamento de erros',
      taskTitles: ['Modelar entidades do projeto final', 'Implementar Service com lógica de negócio', 'Criar DTOs e mapear manualmente', 'Adicionar tratamento global de exceções', 'Implementar paginação nos endpoints de listagem'],
      taskType: 'projeto',
      material: { title: 'Spring Data JPA Reference', type: 'documentacao', description: 'Referência completa do Spring Data JPA' },
      artifact: { title: 'API do projeto com endpoints documentados', type: 'codigo', description: 'API REST funcional com documentação Swagger.' },
      questions: [
        { question: 'O que é JPA e qual a relação com Hibernate?', difficulty: 'facil' },
        { question: 'Como funciona o @Transactional?', difficulty: 'medio' },
        { question: 'O que é N+1 query problem e como evitar?', difficulty: 'dificil' },
      ],
    },
    {
      theme: 'Revisão e entrevista técnica',
      objective: 'Escrever testes, documentar projeto e praticar entrevistas técnicas',
      taskTitles: ['Escrever testes unitários com JUnit 5 e Mockito', 'Adicionar documentação Swagger/OpenAPI', 'Preparar README completo com instruções', 'Publicar projeto no GitHub com Actions', 'Simular entrevista técnica Java/Spring Boot'],
      taskType: 'revisao',
      material: { title: 'Testing in Spring Boot', type: 'documentacao', description: 'Guia de testes com Spring Boot Test' },
      artifact: { title: 'Projeto publicado no GitHub com README', type: 'codigo', description: 'Projeto final com documentação, testes e CI.' },
      questions: [
        { question: 'Como testar um controller com MockMvc?', difficulty: 'medio' },
        { question: 'O que é Test-Driven Development (TDD)?', difficulty: 'facil' },
        { question: 'Descreva os princípios SOLID com exemplos em Java.', difficulty: 'dificil' },
      ],
    },
  ],
  carreira: [
    {
      theme: 'Posicionamento pessoal',
      objective: 'Definir objetivo de carreira, mapear gaps e identificar diferenciais',
      taskTitles: ['Definir objetivo de carreira em tecnologia', 'Pesquisar empresas e vagas alvo', 'Mapear habilidades técnicas e gaps', 'Identificar diferenciais pessoais', 'Estudar perfis de profissionais que admira'],
      taskType: 'pesquisa',
      material: { title: 'Guia de Carreira Tech - Roadmap.sh', type: 'artigo', description: 'Trilhas de carreira em tecnologia' },
      artifact: { title: 'Documento de posicionamento de carreira', type: 'documento', description: 'Objetivo, diferenciais e plano de ação documentados.' },
      questions: [
        { question: 'Quais são seus pontos fortes técnicos?', difficulty: 'facil' },
        { question: 'Como você explica uma tecnologia complexa?', difficulty: 'medio' },
        { question: 'Qual é seu diferencial como candidato?', difficulty: 'medio' },
      ],
    },
    {
      theme: 'Currículo e LinkedIn',
      objective: 'Criar currículo ATS-friendly e otimizar perfil LinkedIn para recrutadores',
      taskTitles: ['Criar currículo no formato ATS-friendly', 'Otimizar experiências com métricas e resultados', 'Atualizar foto e headline do LinkedIn', 'Escrever seção Sobre no LinkedIn', 'Solicitar recomendações de colegas'],
      taskType: 'pratica',
      material: { title: 'Resume Tips for Software Developers', type: 'artigo', description: 'Dicas de currículo para desenvolvedores' },
      artifact: { title: 'Currículo atualizado em PDF', type: 'documento', description: 'Currículo revisado e pronto para candidaturas.' },
      questions: [
        { question: 'Como quantificar realizações no currículo?', difficulty: 'medio' },
        { question: 'Quais palavras-chave incluir no LinkedIn?', difficulty: 'facil' },
        { question: 'Como pedir recomendação de forma profissional?', difficulty: 'medio' },
      ],
    },
    {
      theme: 'Portfólio e projetos',
      objective: 'Construir portfólio online com projetos relevantes para vagas alvo',
      taskTitles: ['Selecionar 2-3 projetos para o portfólio', 'Criar README atrativo para cada projeto', 'Publicar portfólio no GitHub Pages ou Vercel', 'Adicionar demonstrações e capturas de tela', 'Registrar contribuições open-source'],
      taskType: 'projeto',
      material: { title: 'Building a Developer Portfolio', type: 'artigo', description: 'Guia para criar portfólio de desenvolvedor' },
      artifact: { title: 'Portfólio online publicado', type: 'portfolio', description: 'Portfólio acessível via URL com projetos documentados.' },
      questions: [
        { question: 'Como escolher projetos para o portfólio?', difficulty: 'facil' },
        { question: 'O que um recrutador procura no GitHub?', difficulty: 'medio' },
        { question: 'Como contribuir com projetos open-source?', difficulty: 'dificil' },
      ],
    },
    {
      theme: 'Simulações de entrevista',
      objective: 'Praticar entrevistas técnicas e comportamentais para vagas junior',
      taskTitles: ['Praticar perguntas comportamentais (método STAR)', 'Simular entrevista técnica com exercícios online', 'Revisar perguntas comuns de Java e Spring', 'Preparar 5 perguntas para fazer ao entrevistador', 'Simular entrevista completa com gravação'],
      taskType: 'revisao',
      material: { title: 'Cracking the Tech Interview', type: 'artigo', description: 'Estratégias para entrevistas em tecnologia' },
      artifact: { title: 'Script de entrevista personalizado', type: 'documento', description: 'Respostas preparadas para perguntas frequentes.' },
      questions: [
        { question: 'O que é o método STAR em entrevistas?', difficulty: 'facil' },
        { question: "Como responder 'Qual seu maior defeito?'", difficulty: 'medio' },
        { question: 'Como negociar salário em tecnologia?', difficulty: 'dificil' },
      ],
    },
  ],
  seguranca: [
    {
      theme: 'Fundamentos técnicos',
      objective: 'Compreender CIA Triad, gestão de riscos e regulamentações de segurança',
      taskTitles: ['Estudar CIA Triad: Confidencialidade, Integridade, Disponibilidade', 'Introdução à gestão de riscos de TI', 'Identificar ameaças e vulnerabilidades comuns', 'Conceitos de autenticação, autorização e auditoria', 'Regulamentações: LGPD e GDPR essencial'],
      taskType: 'leitura',
      material: { title: 'NIST Cybersecurity Framework Overview', type: 'documentacao', description: 'Introdução ao NIST CSF' },
      artifact: { title: 'Glossário de segurança da informação', type: 'documento', description: 'Glossário com os principais termos de segurança e GRC.' },
      questions: [
        { question: 'O que é CIA Triad?', difficulty: 'facil' },
        { question: 'Qual a diferença entre ameaça e vulnerabilidade?', difficulty: 'medio' },
        { question: 'O que é gestão de riscos de segurança?', difficulty: 'facil' },
      ],
    },
    {
      theme: 'Riscos e controles',
      objective: 'Aplicar metodologia de análise de riscos e construir matriz de controles',
      taskTitles: ['Aplicar metodologia de análise de riscos', 'Identificar ativos críticos da organização', 'Avaliar probabilidade e impacto de cada risco', 'Mapear controles existentes e lacunas', 'Construir matriz de riscos 5x5'],
      taskType: 'pratica',
      material: { title: 'ISO 27005 Risk Management', type: 'documentacao', description: 'Guia de gestão de riscos ISO 27005' },
      artifact: { title: 'Matriz de riscos da organização', type: 'planilha', description: 'Matriz 5x5 com riscos identificados e priorizados.' },
      questions: [
        { question: 'O que é risco residual?', difficulty: 'medio' },
        { question: 'Como priorizar riscos por criticidade?', difficulty: 'medio' },
        { question: 'Diferença entre controle preventivo e detectivo?', difficulty: 'facil' },
      ],
    },
    {
      theme: 'Frameworks ISO/NIST/GRC',
      objective: 'Estudar e aplicar ISO 27001, ISO 27002 e NIST CSF no contexto organizacional',
      taskTitles: ['Estudar estrutura e requisitos da ISO 27001', 'Mapear controles da ISO 27002 aplicáveis', 'Explorar as 5 funções do NIST CSF', 'Comparar ISO 27001 com NIST CSF', 'Aplicar framework escolhido ao contexto real'],
      taskType: 'leitura',
      material: { title: 'ISO 27001 Implementation Guide', type: 'documentacao', description: 'Guia de implementação da ISO 27001' },
      artifact: { title: 'Mapeamento de controles implementados', type: 'documento', description: 'Declaração de Aplicabilidade (SoA) simplificada.' },
      questions: [
        { question: 'Quais são os domínios da ISO 27001?', difficulty: 'medio' },
        { question: 'Quais as 5 funções do NIST CSF?', difficulty: 'medio' },
        { question: 'O que é Declaração de Aplicabilidade (SoA)?', difficulty: 'dificil' },
      ],
    },
    {
      theme: 'Relatório e comunicação',
      objective: 'Redigir relatório executivo de GRC e comunicar riscos para alta gestão',
      taskTitles: ['Estruturar relatório executivo de segurança', 'Redigir sumário de riscos e recomendações', 'Criar plano de tratamento de riscos', 'Preparar apresentação para alta gestão', 'Revisar e consolidar todo o material'],
      taskType: 'projeto',
      material: { title: 'Communicating Security to Leadership', type: 'artigo', description: 'Como comunicar segurança para executivos' },
      artifact: { title: 'Relatório final de GRC', type: 'documento', description: 'Relatório executivo com riscos, controles e plano de ação.' },
      questions: [
        { question: 'Como comunicar riscos técnicos para executivos?', difficulty: 'medio' },
        { question: 'O que deve conter um plano de tratamento de riscos?', difficulty: 'dificil' },
        { question: 'O que é apetite ao risco (risk appetite)?', difficulty: 'medio' },
      ],
    },
  ],
  financeiro: [
    {
      theme: 'Conceitos fundamentais',
      objective: 'Compreender tipos de investimento, perfil de risco e funcionamento da bolsa',
      taskTitles: ['Introdução à renda fixa vs renda variável', 'Taxa Selic, CDI e relação com investimentos', 'Inflação, poder de compra e IPCA', 'Perfil de investidor: conservador, moderado, arrojado', 'Como funciona a bolsa de valores'],
      taskType: 'leitura',
      material: { title: 'Guia do Investidor Iniciante', type: 'artigo', description: 'Guia completo para quem está começando a investir' },
      artifact: { title: 'Perfil de investidor documentado', type: 'documento', description: 'Documento com perfil, objetivos e estratégia de investimento.' },
      questions: [
        { question: 'Qual a diferença entre renda fixa e variável?', difficulty: 'facil' },
        { question: 'O que é CDI e como afeta investimentos?', difficulty: 'medio' },
        { question: 'O que é diversificação de portfólio?', difficulty: 'facil' },
      ],
    },
    {
      theme: 'Leitura de indicadores',
      objective: 'Interpretar indicadores fundamentalistas e gráficos de ativos',
      taskTitles: ['Análise de P/L e P/VP de ações', 'Leitura de balanço patrimonial básico', 'Indicadores de renda fixa: yield e duration', 'Gráficos de candlestick: interpretação básica', 'Relatórios de earnings trimestrais'],
      taskType: 'pratica',
      material: { title: 'Fundamentus - Análise Fundamentalista', type: 'ferramenta', description: 'Plataforma gratuita de análise fundamentalista' },
      artifact: { title: 'Planilha de análise de indicadores', type: 'planilha', description: 'Planilha com indicadores dos ativos estudados.' },
      questions: [
        { question: 'O que significa P/L de uma ação?', difficulty: 'facil' },
        { question: 'Como interpretar um balanço patrimonial?', difficulty: 'medio' },
        { question: 'O que é dividend yield?', difficulty: 'facil' },
      ],
    },
    {
      theme: 'Estudo de ativos',
      objective: 'Analisar ações, FIIs e ETFs para composição de carteira diversificada',
      taskTitles: ['Analisar 3 empresas de setores diferentes', 'Comparar 2 FIIs de logística e papel', 'Avaliar ETFs de índice: BOVA11 e IVVB11', 'Simular carteira com alocação inicial', 'Analisar histórico de dividendos dos ativos'],
      taskType: 'pesquisa',
      material: { title: 'Status Invest - Análise de Dividendos', type: 'ferramenta', description: 'Plataforma de análise de dividendos e FIIs' },
      artifact: { title: 'Relatório de análise dos ativos escolhidos', type: 'documento', description: 'Análise fundamentalista dos ativos selecionados.' },
      questions: [
        { question: 'Qual a diferença entre ação e FII?', difficulty: 'facil' },
        { question: 'Por que diversificar entre setores?', difficulty: 'medio' },
        { question: 'O que é rebalanceamento de carteira?', difficulty: 'medio' },
      ],
    },
    {
      theme: 'Análise e carteira final',
      objective: 'Montar carteira diversificada com tese de investimento e plano de aportes',
      taskTitles: ['Montar carteira com tese de investimento', 'Definir percentual de alocação por classe', 'Estabelecer critérios de entrada e saída', 'Revisar todos os ativos estudados', 'Criar plano de aportes mensais'],
      taskType: 'projeto',
      material: { title: 'Teoria Moderna de Portfólio', type: 'artigo', description: 'Fundamentos da diversificação e risco/retorno' },
      artifact: { title: 'Carteira de investimentos simulada', type: 'planilha', description: 'Carteira final com alocação, tese e plano de aportes.' },
      questions: [
        { question: 'Como calcular rentabilidade real descontando inflação?', difficulty: 'dificil' },
        { question: 'Qual a diferença entre gestão ativa e passiva?', difficulty: 'medio' },
        { question: 'O que é risco sistemático vs idiossincrático?', difficulty: 'dificil' },
      ],
    },
  ],
  personalizado: [
    {
      theme: 'Fundamentos',
      objective: 'Definir objetivos, mapear recursos e estudar conceitos essenciais do tema',
      taskTitles: ['Definir objetivos e critérios de sucesso', 'Mapear recursos de aprendizado disponíveis', 'Estudar conceitos fundamentais do tema', 'Criar glossário inicial de termos', 'Explorar materiais de referência'],
      taskType: 'leitura',
      material: { title: 'Recursos de aprendizado selecionados', type: 'artigo', description: 'Materiais iniciais para o tema escolhido' },
      artifact: { title: 'Documento de objetivos e recursos', type: 'documento', description: 'Objetivos claros, recursos mapeados e cronograma inicial.' },
      questions: [
        { question: 'Qual é o objetivo principal deste estudo?', difficulty: 'facil' },
        { question: 'Quais recursos são mais relevantes para o tema?', difficulty: 'medio' },
        { question: 'Como medir progresso neste aprendizado?', difficulty: 'medio' },
      ],
    },
    {
      theme: 'Prática guiada',
      objective: 'Aplicar conceitos estudados em exercícios práticos com feedback',
      taskTitles: ['Aplicar conceito central em exercício prático', 'Resolver problema relacionado ao tema', 'Comparar abordagens diferentes para o mesmo problema', 'Revisar erros e refazer com correções', 'Registrar aprendizados em diário de estudos'],
      taskType: 'pratica',
      material: { title: 'Prática deliberada e feedback', type: 'artigo', description: 'Técnicas de aprendizado ativo e prática deliberada' },
      artifact: { title: 'Registro de exercícios práticos', type: 'documento', description: 'Exercícios realizados com anotações de aprendizado.' },
      questions: [
        { question: 'O que foi mais difícil de aplicar na prática?', difficulty: 'medio' },
        { question: 'Como este conceito se conecta com o objetivo final?', difficulty: 'medio' },
        { question: 'Quais erros foram cometidos e como evitá-los?', difficulty: 'facil' },
      ],
    },
    {
      theme: 'Projeto pessoal',
      objective: 'Desenvolver projeto prático que consolide o aprendizado do tema',
      taskTitles: ['Definir escopo e entregáveis do projeto pessoal', 'Implementar fase 1 do projeto', 'Implementar fase 2 com funcionalidades principais', 'Revisar e ajustar baseado em feedback', 'Preparar documentação do projeto'],
      taskType: 'projeto',
      material: { title: 'Aprendizado baseado em projetos', type: 'artigo', description: 'Técnica de project-based learning' },
      artifact: { title: 'Projeto pessoal entregue', type: 'documento', description: 'Projeto completo documentado e revisado.' },
      questions: [
        { question: 'O projeto atende aos objetivos definidos?', difficulty: 'facil' },
        { question: 'Quais melhorias poderiam ser implementadas?', difficulty: 'medio' },
        { question: 'Como este projeto demonstra o aprendizado adquirido?', difficulty: 'medio' },
      ],
    },
    {
      theme: 'Revisão e consolidação',
      objective: 'Revisar todo o conteúdo, identificar gaps e consolidar aprendizado',
      taskTitles: ['Revisar todo o conteúdo estudado', 'Criar mapas mentais dos conceitos principais', 'Testar conhecimento com exercícios variados', 'Identificar gaps e aprofundar pontos fracos', 'Preparar material de referência final'],
      taskType: 'revisao',
      material: { title: 'Revisão espaçada e consolidação', type: 'artigo', description: 'Técnicas de memorização e revisão ativa' },
      artifact: { title: 'Material de referência consolidado', type: 'documento', description: 'Resumo completo do aprendizado para consulta futura.' },
      questions: [
        { question: 'Quais conceitos ficaram mais sólidos?', difficulty: 'facil' },
        { question: 'O que ainda precisa de mais prática?', difficulty: 'medio' },
        { question: 'Como aplicar este conhecimento no dia a dia?', difficulty: 'medio' },
      ],
    },
  ],
};

const FINAL_DELIVERABLES: Record<string, string[]> = {
  programacao:   ['Repositório GitHub com projeto completo', 'API REST funcional e documentada', 'Suite de testes automatizados', 'README técnico detalhado'],
  carreira:      ['Currículo atualizado e revisado', 'Portfólio online publicado', 'LinkedIn otimizado', 'Repertório de respostas para entrevistas'],
  seguranca:     ['Relatório executivo de GRC', 'Matriz de riscos documentada', 'Mapeamento de controles aplicados', 'Apresentação para stakeholders'],
  financeiro:    ['Carteira de investimentos simulada', 'Planilha de análise de ativos', 'Plano de aportes mensais', 'Tese de investimento documentada'],
  personalizado: ['Projeto pessoal concluído', 'Material de referência consolidado', 'Portfólio de evidências do aprendizado'],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function resolveTaskType(
  phaseType: StudyTaskType,
  style: StudyPreferredStyle | '',
): StudyTaskType {
  if (!style) return phaseType;
  const MAP: Partial<Record<StudyPreferredStyle, StudyTaskType>> = {
    projeto:    'projeto',
    entrevista: 'revisao',
    revisao:    'revisao',
    intensivo:  'pratica',
  };
  return MAP[style] ?? phaseType;
}

function tasksPerDay(minutesPerDay: number): number {
  if (minutesPerDay < 30) return 2;
  if (minutesPerDay < 75) return 3;
  return 4;
}

function minutesPerTask(minutesPerDay: number, count: number): number {
  return Math.max(10, Math.round(minutesPerDay / count));
}

function phaseForWeek(weekIdx: number, numWeeks: number): number {
  return Math.min(Math.floor((weekIdx / numWeeks) * 4), 3);
}

function buildTasks(
  phase: PhaseContent,
  dayIdx: number,
  tCount: number,
  minsPerTask: number,
  planId: string,
  weekNum: number,
  dayNum: number,
  extraTopics: string[],
  taskTypeOverride?: StudyTaskType,
): StudyTask[] {
  const pool = [...phase.taskTitles, ...extraTopics.map((t) => `Aprofundar em ${t}`)];
  const type = taskTypeOverride ?? phase.taskType;
  const tasks: StudyTask[] = [];
  for (let i = 0; i < tCount; i++) {
    const titleIdx = (dayIdx * tCount + i) % pool.length;
    tasks.push({
      id: `${planId}-w${weekNum}-d${dayNum}-t${i + 1}`,
      title: pool[titleIdx],
      type,
      durationMinutes: minsPerTask,
      completed: false,
    });
  }
  return tasks;
}

function mapDifficulty(level: string): StudyPlanDifficulty {
  if (level === 'intermediario') return 'intermediario';
  return 'iniciante';
}

function mapArea(formArea: string): StudyPlanArea {
  const valid: StudyPlanArea[] = ['programacao', 'carreira', 'financeiro', 'seguranca', 'personalizado'];
  return (valid.includes(formArea as StudyPlanArea) ? formArea : 'personalizado') as StudyPlanArea;
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function generateMockStudyPlan(data: StudyPlanFormData): StudyPlan {
  const planId = `generated-${Date.now()}`;
  const area = data.area || 'personalizado';
  const numWeeks = Math.ceil(data.durationDays / 7);
  const daysPerWeek = Math.min(7, Math.ceil(data.durationDays / numWeeks));
  const tCount = tasksPerDay(data.availableMinutesPerDay);
  const minsPerTask = minutesPerTask(data.availableMinutesPerDay, tCount);
  const phases = AREA_PHASES[area] ?? AREA_PHASES.personalizado;
  const extraTopics = data.topics
    ? data.topics.split(',').map((t) => t.trim()).filter(Boolean).slice(0, 3)
    : [];

  const weeks: StudyWeek[] = [];
  let dayCounter = 1;

  for (let wIdx = 0; wIdx < numWeeks; wIdx++) {
    const phase = phases[phaseForWeek(wIdx, numWeeks)];
    const taskType = resolveTaskType(phase.taskType, data.preferredStyle);
    const days: StudyDay[] = [];

    for (let dIdx = 0; dIdx < daysPerWeek; dIdx++) {
      const tasks = buildTasks(phase, dIdx, tCount, minsPerTask, planId, wIdx + 1, dayCounter, extraTopics, taskType);
      const isLastDay = dIdx === daysPerWeek - 1;

      days.push({
        dayNumber: dayCounter++,
        title: phase.taskTitles[dIdx % phase.taskTitles.length].split(' ').slice(0, 4).join(' '),
        objective: phase.objective,
        tasks,
        materials: [phase.material],
        artifact: isLastDay ? phase.artifact : undefined,
        reviewQuestions: phase.questions,
        estimatedMinutes: tasks.reduce((s, t) => s + t.durationMinutes, 0),
      });
    }

    weeks.push({
      weekNumber: wIdx + 1,
      theme: phase.theme,
      objective: phase.objective,
      days,
    });
  }

  const totalHours = Math.round((data.availableMinutesPerDay * data.durationDays) / 60);

  return {
    id: planId,
    title: data.objective.trim() || `Plano de ${area}`,
    description: `Plano gerado em ${numWeeks} semanas com ${data.availableMinutesPerDay} min/dia. ${data.finalProjectGoal ? `Projeto final: ${data.finalProjectGoal}.` : ''}`.trim(),
    area: mapArea(area),
    targetRole: data.finalProjectGoal || undefined,
    difficulty: mapDifficulty(data.currentLevel),
    durationDays: data.durationDays,
    totalHours,
    tags: extraTopics,
    weeks,
    finalProject: {
      title: data.finalProjectGoal || `Projeto final de ${area}`,
      description: data.finalProjectGoal
        ? `Construir: ${data.finalProjectGoal}`
        : 'Projeto a ser desenvolvido ao longo do plano com entregáveis documentados.',
      deliverables: FINAL_DELIVERABLES[area] ?? FINAL_DELIVERABLES.personalizado,
      estimatedHours: Math.round((data.availableMinutesPerDay * 7) / 60),
    },
    status: 'ativo',
    createdAt: new Date().toISOString(),
  };
}
