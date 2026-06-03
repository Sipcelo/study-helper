import type { ProgrammingLessonContent } from '@/types/programming-content';

export const JAVA_ESSENTIAL_LESSONS: ProgrammingLessonContent[] = [
  // ── Lição 1: tipos-e-variaveis ─────────────────────────────────────────────
  {
    id: 'je-l-tipos',
    trackSlug: 'java-essencial',
    topicSlug: 'tipos-e-variaveis',
    title: 'Tipos e Variáveis em Java',
    summary: 'Aprenda como Java declara e armazena dados. Primitivos, wrappers, autoboxing e a diferença entre int e Integer.',
    explanation:
      'Em Java, toda variável tem um tipo declarado em tempo de compilação. O compilador usa o tipo para saber quanto espaço reservar na memória e quais operações são válidas. Isso é diferente de JavaScript, onde o tipo é descoberto em tempo de execução. Entender tipos é o primeiro passo para escrever código Java correto e eficiente.',
    estimatedMinutes: 25,
    order: 1,
    sections: [
      {
        title: 'Tipos primitivos',
        content:
          'Java tem 8 tipos primitivos. São os mais eficientes em memória porque armazenam o valor diretamente, sem criar um objeto.\n\n' +
          '• int — números inteiros (-2 bilhões a +2 bilhões). O mais usado.\n' +
          '• long — inteiros maiores (use quando int não cabe). Termine com L: 10000000000L\n' +
          '• double — números decimais. Use para preços, coordenadas, etc.\n' +
          '• float — decimal menor precisão. Termine com f: 3.14f\n' +
          '• boolean — true ou false. Essencial para condicionais.\n' +
          '• char — um único caractere. Use aspas simples: \'A\'\n' +
          '• byte — inteiro muito pequeno (-128 a 127). Raro em código de negócio.\n' +
          '• short — inteiro médio. Igualmente raro.',
      },
      {
        title: 'Wrappers — o lado objeto dos primitivos',
        content:
          'Para cada primitivo existe uma classe wrapper: Integer, Long, Double, Float, Boolean, Character, Byte, Short.\n\n' +
          'Use wrappers quando precisar de null (primitivo não pode ser null), usar em coleções (List<Integer>, não List<int>), ou chamar métodos como Integer.parseInt().\n\n' +
          'Autoboxing: Java converte automaticamente entre primitivo e wrapper quando necessário. Mas tome cuidado com NullPointerException ao desembalar um wrapper null.',
      },
      {
        title: 'Declarando variáveis',
        content:
          'Sintaxe: tipo nomeDaVariavel = valor;\n\n' +
          'Convenção de nomes: camelCase (começa minúsculo). Não use abreviações obscuras.\n\n' +
          'Constantes: use final para valores que não mudam. Por convenção, UPPER_SNAKE_CASE.\n\n' +
          'Desde Java 10, você pode usar var para inferência de tipo local — útil mas use com moderação para não perder clareza.',
      },
    ],
    codeExamples: [
      {
        title: 'Declaração de variáveis',
        language: 'java',
        code: `// Primitivos
int idade = 25;
double salario = 4500.50;
boolean ativo = true;
char inicial = 'A';

// Wrappers (podem ser null)
Integer idadeObj = 25;
Double salarioObj = null; // válido

// Constante
final int MAIORIDADE = 18;

// Inferência de tipo (Java 10+)
var nome = "João"; // Java infere String`,
        explanation: 'Primitivos não podem ser null. Wrappers sim. Use final para valores que não devem mudar.',
      },
      {
        title: 'Autoboxing e NullPointerException',
        language: 'java',
        code: `// Autoboxing: Java converte automaticamente
int primitivo = 42;
Integer wrapper = primitivo; // boxing automático

// Unboxing automático
Integer wrapperValor = 100;
int resultado = wrapperValor; // unboxing automático

// PERIGO: NPE ao desembalar null
Integer semValor = null;
int tentativa = semValor; // NullPointerException!

// Como evitar:
if (semValor != null) {
    int seguro = semValor;
}`,
        explanation: 'O autoboxing é conveniente mas pode causar NullPointerException inesperado. Sempre verifique se o wrapper pode ser null antes de desembalar.',
      },
      {
        title: 'int vs Integer na prática',
        language: 'java',
        code: `// int: use quando o valor sempre existe
int quantidade = 0;

// Integer: use quando o valor pode não existir
Integer idUsuario = null; // usuário não identificado ainda

// Em coleções, sempre use wrappers
List<Integer> numeros = new ArrayList<>();
numeros.add(42);

// Comparação: NUNCA use == para comparar Integer
Integer a = 200;
Integer b = 200;
System.out.println(a == b);      // false! (objetos diferentes)
System.out.println(a.equals(b)); // true (compara valor)`,
        explanation: 'Use int para lógica interna. Use Integer quando null é possível ou ao usar coleções. Sempre compare Integer com equals(), nunca com ==.',
      },
    ],
    commonMistakes: [
      {
        title: 'Comparar Integer com ==',
        wrong: 'Integer a = 200; Integer b = 200; if (a == b) { ... }',
        correct: 'Integer a = 200; Integer b = 200; if (a.equals(b)) { ... }',
        explanation: 'Java faz cache de Integer entre -128 e 127. Para valores fora desse range, == compara referências de objeto, não valores. Sempre use equals().',
      },
      {
        title: 'Dividir inteiros e esperar decimal',
        wrong: 'double resultado = 10 / 3; // resultado é 3.0, não 3.33',
        correct: 'double resultado = 10.0 / 3; // resultado é 3.33',
        explanation: 'Divisão entre dois int sempre produz int (truncado). Para obter double, pelo menos um operando deve ser double.',
      },
      {
        title: 'Desembalar wrapper null',
        wrong: 'Integer valor = null; int numero = valor; // NullPointerException',
        correct: 'Integer valor = null; int numero = (valor != null) ? valor : 0;',
        explanation: 'Desembalar um Integer null causa NullPointerException. Verifique null antes ou use um valor padrão.',
      },
    ],
    practiceChallenge: {
      title: 'Calculadora de IMC',
      description:
        'Declare variáveis para peso (double) e altura (double). Calcule o IMC (peso / altura²). Imprima se o resultado é menor que 18.5 (abaixo do peso), entre 18.5 e 24.9 (normal) ou maior (acima).',
      hints: [
        'Use double para peso e altura, pois terão casas decimais.',
        'Para elevar ao quadrado: altura * altura',
        'Math.pow(altura, 2) também funciona',
        'Use if/else if/else para classificar',
      ],
      solution: `double peso = 70.0;
double altura = 1.75;
double imc = peso / (altura * altura);

if (imc < 18.5) {
    System.out.println("Abaixo do peso: " + imc);
} else if (imc <= 24.9) {
    System.out.println("Peso normal: " + imc);
} else {
    System.out.println("Acima do peso: " + imc);
}`,
    },
    interviewQuestions: [
      {
        question: 'Qual a diferença entre int e Integer em Java?',
        answer:
          'int é um tipo primitivo que armazena o valor diretamente na memória stack. Integer é um objeto da classe wrapper que encapsula um int no heap. Integer pode ser null, pode ser usado em coleções genéricas (List<Integer>) e tem métodos úteis como Integer.parseInt(). Primitivos são mais eficientes em memória. Java faz autoboxing automático entre os dois.',
        difficulty: 'easy',
      },
      {
        question: 'Por que não se deve usar == para comparar Integer?',
        answer:
          'Em Java, Integer é um objeto, então == compara referências de memória, não valores. Java faz cache de instâncias Integer entre -128 e 127, então para esses valores == pode funcionar por acidente. Para valores maiores, dois Integer com o mesmo valor são objetos diferentes e == retorna false. Sempre use equals() para comparar Integer.',
        difficulty: 'medium',
      },
      {
        question: 'O que é autoboxing e quando pode ser perigoso?',
        answer:
          'Autoboxing é a conversão automática do Java entre tipo primitivo e seu wrapper correspondente (ex: int → Integer). É perigoso quando um wrapper pode ser null: desembalar (unbox) um Integer null causa NullPointerException. Também pode impactar performance em loops que criam muitos objetos temporários.',
        difficulty: 'medium',
      },
    ],
    nextSteps: [
      { title: 'Strings e manipulação de texto', slug: 'strings', reason: 'String é o tipo mais usado em APIs. Aprenda a manipulá-la antes de passar para estruturas de controle.' },
      { title: 'Condicionais e loops', slug: 'condicionais-e-loops', reason: 'Com os tipos na cabeça, o próximo passo é controlar o fluxo do programa.' },
    ],
  },

  // ── Lição 2: strings ───────────────────────────────────────────────────────
  {
    id: 'je-l-strings',
    trackSlug: 'java-essencial',
    topicSlug: 'strings',
    title: 'Strings e Manipulação de Texto',
    summary: 'String é o tipo mais usado em APIs. Aprenda imutabilidade, métodos essenciais, comparação correta e StringBuilder.',
    explanation:
      'Em APIs REST, quase tudo que chega pelo HTTP é texto: o corpo da requisição, cabeçalhos, parâmetros de URL. String é a ponte entre o mundo externo e sua aplicação. Entender como String funciona internamente — principalmente sua imutabilidade — evita bugs difíceis de encontrar e código ineficiente.',
    estimatedMinutes: 30,
    order: 2,
    sections: [
      {
        title: 'String é imutável',
        content:
          'Uma vez criado, um objeto String nunca muda. Toda "modificação" cria um novo objeto.\n\n' +
          'Por isso, concatenar Strings em loop com + é ineficiente: cada iteração cria um objeto novo na memória.\n\n' +
          'Para construção dinâmica de texto, use StringBuilder — ele modifica o mesmo objeto internamente.',
      },
      {
        title: 'Métodos essenciais',
        content:
          '• length() — tamanho da string\n' +
          '• charAt(i) — caractere na posição i\n' +
          '• substring(inicio, fim) — extrai trecho\n' +
          '• toLowerCase() / toUpperCase() — muda capitalização\n' +
          '• trim() — remove espaços nas bordas\n' +
          '• strip() — igual trim() mas suporta Unicode (prefira este)\n' +
          '• contains("texto") — verifica se contém\n' +
          '• startsWith() / endsWith() — verifica bordas\n' +
          '• replace("a", "b") — substitui ocorrências\n' +
          '• split(",") — divide em array\n' +
          '• isEmpty() / isBlank() — verifica se vazia\n' +
          '• String.format() — formata com placeholders',
      },
      {
        title: 'Comparação: equals vs ==',
        content:
          'REGRA DE OURO: sempre compare Strings com equals(), nunca com ==.\n\n' +
          '== compara se são o mesmo objeto na memória. Dois Strings com o mesmo texto podem ser objetos diferentes.\n\n' +
          'String pool: Java pode reutilizar instâncias de strings literais, fazendo == funcionar por acidente. Mas com strings criadas por código (substring, input do usuário), == vai falhar.',
      },
    ],
    codeExamples: [
      {
        title: 'Métodos de String na prática',
        language: 'java',
        code: `String email = "  Usuario@EXAMPLE.com  ";

// Normalizar email
String normalizado = email.strip().toLowerCase();
// → "usuario@example.com"

// Verificar domínio
boolean isGmail = normalizado.endsWith("@gmail.com");

// Extrair usuário
int arroba = normalizado.indexOf("@");
String usuario = normalizado.substring(0, arroba);
// → "usuario@example"

// Dividir partes
String[] partes = normalizado.split("@");
// partes[0] = "usuario", partes[1] = "example.com"

// Formatar mensagem
String msg = String.format("Bem-vindo, %s!", usuario);`,
        explanation: 'Normalização de email é um caso real: sempre use strip() antes de salvar, toLowerCase() para comparar.',
      },
      {
        title: 'StringBuilder para construção dinâmica',
        language: 'java',
        code: `// RUIM: cria N objetos String no loop
String resultado = "";
for (int i = 1; i <= 1000; i++) {
    resultado += i + ", "; // novo objeto a cada iteração
}

// BOM: usa um único objeto mutável
StringBuilder sb = new StringBuilder();
for (int i = 1; i <= 1000; i++) {
    sb.append(i).append(", ");
}
String resultado2 = sb.toString();

// Para uma query SQL dinâmica
StringBuilder query = new StringBuilder("SELECT * FROM usuarios WHERE 1=1");
if (nome != null) query.append(" AND nome = '").append(nome).append("'");
if (ativo) query.append(" AND ativo = true");`,
        explanation: 'Use StringBuilder quando construindo strings em loops ou concatenando muitos pedaços dinamicamente.',
      },
      {
        title: 'Comparação correta de Strings',
        language: 'java',
        code: `String a = new String("java");
String b = new String("java");

// ERRADO: compara referências
System.out.println(a == b);          // false

// CORRETO: compara conteúdo
System.out.println(a.equals(b));     // true

// Ignorar case
System.out.println(a.equalsIgnoreCase("JAVA")); // true

// Verificar null antes de chamar equals
String input = null;
// SEGURO: coloca o literal à esquerda
if ("esperado".equals(input)) { ... }  // não lança NPE

// PERIGOSO:
if (input.equals("esperado")) { ... } // NPE se input for null`,
        explanation: 'Colocar a string literal à esquerda do equals() é uma prática defensiva que evita NullPointerException quando a variável pode ser null.',
      },
    ],
    commonMistakes: [
      {
        title: 'Usar == para comparar Strings',
        wrong: 'if (status == "ativo") { ... }',
        correct: 'if ("ativo".equals(status)) { ... }',
        explanation: '== compara referências de objeto, não conteúdo. Use equals(). Coloque o literal à esquerda para segurança contra null.',
      },
      {
        title: 'Concatenar em loop com +',
        wrong: 'for (String item : lista) { resultado += item + ","; }',
        correct: 'StringBuilder sb = new StringBuilder(); for (String item : lista) { sb.append(item).append(","); }',
        explanation: 'Cada += cria um novo objeto String. Para muitas iterações, use StringBuilder.',
      },
      {
        title: 'Não verificar isBlank() antes de processar',
        wrong: 'String nome = input.trim(); processar(nome); // e se vier vazio?',
        correct: 'String nome = input.strip(); if (!nome.isBlank()) { processar(nome); }',
        explanation: 'isBlank() verifica se é vazia ou só espaços. É mais robusto que isEmpty() pois considera tabs e outros caracteres invisíveis.',
      },
    ],
    practiceChallenge: {
      title: 'Validador de CPF simples',
      description:
        'Receba um CPF como string (pode vir formatado "123.456.789-09" ou só números "12345678909"). Remova pontos e traços, verifique se tem 11 dígitos e imprima "CPF válido" ou "CPF inválido".',
      hints: [
        'Use replace() para remover caracteres especiais',
        'length() para contar dígitos',
        'matches("\\\\d+") para verificar se são só números',
      ],
      solution: `String cpf = "123.456.789-09";

// Remover formatação
String soNumeros = cpf.replace(".", "").replace("-", "");

// Validar
if (soNumeros.length() == 11 && soNumeros.matches("\\d+")) {
    System.out.println("CPF válido: " + soNumeros);
} else {
    System.out.println("CPF inválido");
}`,
    },
    interviewQuestions: [
      {
        question: 'Por que String é imutável em Java?',
        answer:
          'String é imutável por design para segurança, performance e thread-safety. Segurança: uma string usada como chave em HashMap não pode ser modificada por acidente. Performance: Java mantém um pool de strings literais — imutabilidade permite reutilizá-las. Thread-safety: múltiplas threads podem compartilhar a mesma String sem risco de condição de corrida.',
        difficulty: 'medium',
      },
      {
        question: 'Quando usar StringBuilder ao invés de concatenação com +?',
        answer:
          'Use StringBuilder quando concatenar strings em loops ou quando o número de concatenações é grande (>3-4). Cada + cria um novo objeto String, o que gera pressão no garbage collector. StringBuilder modifica o mesmo buffer interno, sendo muito mais eficiente. O compilador Java otimiza concatenações simples fora de loops, mas não dentro.',
        difficulty: 'easy',
      },
    ],
    nextSteps: [
      { title: 'Condicionais e loops', slug: 'condicionais-e-loops', reason: 'Com tipos e strings dominados, é hora de controlar o fluxo do programa.' },
      { title: 'Arrays e coleções', slug: 'arrays-e-colecoes', reason: 'APIs frequentemente retornam listas de strings — aprenda a trabalhar com elas.' },
    ],
  },

  // ── Lição 3: condicionais-e-loops ─────────────────────────────────────────
  {
    id: 'je-l-condicionais',
    trackSlug: 'java-essencial',
    topicSlug: 'condicionais-e-loops',
    title: 'Condicionais e Loops',
    summary: 'Controle o fluxo do seu programa com if/else, switch, for, while e for-each. A base de qualquer algoritmo.',
    explanation:
      'Condicionais e loops são o que transformam um script linear em um programa inteligente. Em APIs backend, você usa condicionais para validar entradas, verificar permissões e tratar casos de erro. Usa loops para processar listas de registros, calcular totais e transformar dados. Dominar esses blocos é fundamental antes de qualquer framework.',
    estimatedMinutes: 30,
    order: 3,
    sections: [
      {
        title: 'Condicionais: if / else if / else',
        content:
          'A estrutura if avalia uma expressão booleana e executa um bloco se for true.\n\n' +
          'Boas práticas:\n' +
          '• Prefira retorno antecipado (early return) a if/else aninhados profundos\n' +
          '• Não compare boolean com == true/false — use diretamente\n' +
          '• Coloque o caso mais provável primeiro no if para performance',
      },
      {
        title: 'Switch: quando há muitos casos',
        content:
          'Use switch quando uma variável tem muitos valores possíveis discretos.\n\n' +
          'Switch tradicional (Java 1+): use break em cada case para não "cair" no próximo.\n\n' +
          'Switch expression (Java 14+): mais limpo, retorna valor, sem break necessário. Prefira quando disponível.\n\n' +
          'Switch funciona com int, String, char, enum. Não funciona com long, double, float.',
      },
      {
        title: 'Loops: for, while, for-each',
        content:
          'for clássico: use quando sabe quantas iterações vai fazer.\n\n' +
          'while: use quando a condição de parada não é baseada em um contador.\n\n' +
          'do-while: executa pelo menos uma vez. Raro em código moderno.\n\n' +
          'for-each (enhanced for): sempre prefira para iterar coleções e arrays. Mais legível e menos propenso a erros de índice.',
      },
    ],
    codeExamples: [
      {
        title: 'Early return — evitando else aninhado',
        language: 'java',
        code: `// RUIM: aninhamento profundo
public String classificarNota(int nota) {
    if (nota >= 0) {
        if (nota <= 100) {
            if (nota >= 90) {
                return "A";
            } else if (nota >= 70) {
                return "B";
            } else {
                return "C";
            }
        } else {
            return "inválida";
        }
    } else {
        return "inválida";
    }
}

// BOM: early return para casos inválidos
public String classificarNota(int nota) {
    if (nota < 0 || nota > 100) return "inválida";
    if (nota >= 90) return "A";
    if (nota >= 70) return "B";
    return "C";
}`,
        explanation: 'Early return elimina o else e reduz o aninhamento. O código fica mais fácil de ler de cima para baixo.',
      },
      {
        title: 'Switch expression (Java 14+)',
        language: 'java',
        code: `// Switch tradicional (verboso, propenso a esquecer break)
String resultado;
switch (diaDaSemana) {
    case "SEGUNDA":
    case "TERCA":
    case "QUARTA":
    case "QUINTA":
    case "SEXTA":
        resultado = "dia útil";
        break;
    default:
        resultado = "fim de semana";
}

// Switch expression (moderno, preferido)
String resultado2 = switch (diaDaSemana) {
    case "SEGUNDA", "TERCA", "QUARTA", "QUINTA", "SEXTA" -> "dia útil";
    default -> "fim de semana";
};`,
        explanation: 'Switch expression é mais seguro (sem fall-through acidental) e retorna valor diretamente. Use quando o target Java for 14+.',
      },
      {
        title: 'Loops na prática de API',
        language: 'java',
        code: `List<Pedido> pedidos = buscarPedidos();
double totalVendas = 0;
List<Pedido> pendentes = new ArrayList<>();

// for-each: sempre prefira para coleções
for (Pedido pedido : pedidos) {
    totalVendas += pedido.getValor();
    if (pedido.getStatus().equals("PENDENTE")) {
        pendentes.add(pedido);
    }
}

// for clássico: quando o índice importa
String[] itens = {"a", "b", "c"};
for (int i = 0; i < itens.length; i++) {
    System.out.println(i + ": " + itens[i]);
}

// break e continue
for (Pedido pedido : pedidos) {
    if (pedido == null) continue;     // pula null
    if (pedido.isCancelado()) break;  // para loop
    processar(pedido);
}`,
        explanation: 'for-each é mais legível e não expõe o índice (menos chance de erro). Use for clássico só quando o índice for necessário.',
      },
    ],
    commonMistakes: [
      {
        title: 'Usar = ao invés de == em condicionais',
        wrong: 'if (x = 5) { ... } // atribuição, não comparação',
        correct: 'if (x == 5) { ... }',
        explanation: 'Em Java isso é um erro de compilação para primitivos (pois o resultado de x = 5 é int, não boolean). Para boolean, o compilador aceita e é um bug silencioso.',
      },
      {
        title: 'Esquecer break no switch tradicional',
        wrong: 'case "A": resultado = 1; case "B": resultado = 2; // sempre cai em B',
        correct: 'case "A": resultado = 1; break; case "B": resultado = 2; break;',
        explanation: 'Sem break, o switch continua executando os casos seguintes (fall-through). Use switch expression para evitar esse problema.',
      },
      {
        title: 'Modificar coleção durante for-each',
        wrong: 'for (String item : lista) { lista.remove(item); } // ConcurrentModificationException',
        correct: 'lista.removeIf(item -> condicao(item));',
        explanation: 'Não modifique uma coleção enquanto itera com for-each. Use removeIf(), Iterator.remove(), ou colete em lista separada.',
      },
    ],
    practiceChallenge: {
      title: 'FizzBuzz',
      description:
        'Imprima números de 1 a 30. Para múltiplos de 3, imprima "Fizz". Para múltiplos de 5, "Buzz". Para múltiplos de ambos, "FizzBuzz".',
      hints: [
        'Use o operador módulo % para verificar divisibilidade',
        'Verifique FizzBuzz antes de Fizz e Buzz separados',
        'Use for clássico de 1 a 30',
      ],
      solution: `for (int i = 1; i <= 30; i++) {
    if (i % 15 == 0) {
        System.out.println("FizzBuzz");
    } else if (i % 3 == 0) {
        System.out.println("Fizz");
    } else if (i % 5 == 0) {
        System.out.println("Buzz");
    } else {
        System.out.println(i);
    }
}`,
    },
    interviewQuestions: [
      {
        question: 'Qual a diferença entre break e continue em loops Java?',
        answer:
          'break termina completamente o loop e passa a execução para a linha após o loop. continue pula o restante da iteração atual e vai direto para a próxima iteração. Em loops aninhados, ambos afetam apenas o loop mais interno por padrão.',
        difficulty: 'easy',
      },
      {
        question: 'O que é early return e por que é preferido?',
        answer:
          'Early return é retornar de um método assim que um caso especial (erro, inválido) é detectado, sem usar else. Isso reduz o aninhamento do código, torna o fluxo principal mais legível (os casos normais aparecem sem indentação extra) e facilita manutenção.',
        difficulty: 'easy',
      },
    ],
    nextSteps: [
      { title: 'Arrays e coleções', slug: 'arrays-e-colecoes', reason: 'Loops e coleções andam juntos — agora aprenda onde os dados são armazenados.' },
      { title: 'Orientação a Objetos', slug: 'oop', reason: 'Com fluxo de controle dominado, o próximo passo é organizar o código em classes.' },
    ],
  },

  // ── Lição 4: arrays-e-colecoes ────────────────────────────────────────────
  {
    id: 'je-l-colecoes',
    trackSlug: 'java-essencial',
    topicSlug: 'arrays-e-colecoes',
    title: 'Arrays e Coleções',
    summary: 'APIs retornam listas. Aprenda arrays, ArrayList, HashMap e HashSet — quando usar cada um e por que.',
    explanation:
      'Toda API backend trabalha com conjuntos de dados: listar usuários, processar pedidos, agrupar resultados. Em Java, o framework Collections oferece estruturas de dados prontas e otimizadas. Saber escolher a estrutura certa é uma habilidade valorizada em entrevistas: ArrayList tem acesso por índice rápido, LinkedList tem inserção rápida, HashMap tem busca por chave em O(1).',
    estimatedMinutes: 35,
    order: 4,
    sections: [
      {
        title: 'Array — simples mas limitado',
        content:
          'Array é uma sequência de tamanho fixo. Uma vez criado, não cresce.\n\n' +
          'Sintaxe: tipo[] nome = new tipo[tamanho];\n' +
          'Ou com valores: String[] dias = {"seg", "ter", "qua"};\n\n' +
          'Acesso por índice: dias[0] retorna "seg" (índice começa em 0).\n\n' +
          'Use arrays quando o tamanho é fixo e conhecido. Na maioria dos casos de API, prefira ArrayList.',
      },
      {
        title: 'ArrayList — a lista mais usada',
        content:
          'ArrayList é um array dinâmico que cresce automaticamente. É a implementação de List mais usada.\n\n' +
          'Principais métodos: add(), get(i), remove(i), size(), contains(), isEmpty(), clear()\n\n' +
          'Itere sempre com for-each. Acesso por índice é O(1). Inserção no meio é O(n).\n\n' +
          'Use List<Tipo> como tipo da variável (interface, não implementação): List<String> nomes = new ArrayList<>();',
      },
      {
        title: 'HashMap — chave e valor',
        content:
          'HashMap armazena pares chave-valor. Busca por chave é O(1) em média.\n\n' +
          'Métodos: put(chave, valor), get(chave), containsKey(), remove(), entrySet(), keySet()\n\n' +
          'Não garante ordem de inserção. Use LinkedHashMap se precisar de ordem.\n\n' +
          'HashSet: como HashMap mas só chaves (valores únicos). Útil para verificar duplicatas.',
      },
    ],
    codeExamples: [
      {
        title: 'ArrayList — operações básicas',
        language: 'java',
        code: `// Declarar (interface List, não ArrayList diretamente)
List<String> emails = new ArrayList<>();

// Adicionar
emails.add("alice@ex.com");
emails.add("bob@ex.com");
emails.add("charlie@ex.com");

// Acessar
String primeiro = emails.get(0); // "alice@ex.com"
int total = emails.size();       // 3

// Verificar
boolean temBob = emails.contains("bob@ex.com"); // true

// Remover por valor
emails.remove("bob@ex.com");

// Iterar
for (String email : emails) {
    System.out.println("Enviando para: " + email);
}

// Filtrar com removeIf (Java 8+)
emails.removeIf(e -> e.endsWith("@spam.com"));`,
        explanation: 'Sempre declare como List<T>, não ArrayList<T>. Isso facilita trocar a implementação depois sem mudar o código que usa.',
      },
      {
        title: 'HashMap — agrupamento e contagem',
        language: 'java',
        code: `// Contar ocorrências
List<String> categorias = List.of("Java", "Spring", "Java", "SQL", "Spring", "Java");
Map<String, Integer> contagem = new HashMap<>();

for (String cat : categorias) {
    // getOrDefault: retorna 0 se chave não existe
    contagem.put(cat, contagem.getOrDefault(cat, 0) + 1);
}
// contagem = {Java=3, Spring=2, SQL=1}

// Iterar sobre entries
for (Map.Entry<String, Integer> entry : contagem.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue() + " vezes");
}

// Busca rápida por chave
int totalJava = contagem.getOrDefault("Java", 0); // 3`,
        explanation: 'HashMap é perfeito para agrupamento e contagem. getOrDefault() evita verificar containsKey() antes de cada acesso.',
      },
      {
        title: 'HashSet — garantindo unicidade',
        language: 'java',
        code: `// Remover duplicatas de uma lista
List<String> comDuplicatas = List.of("alice", "bob", "alice", "charlie", "bob");
Set<String> unicos = new HashSet<>(comDuplicatas);
// unicos = {alice, bob, charlie} (sem ordem garantida)

// Verificar se já existe (mais rápido que List.contains)
Set<String> emailsCadastrados = new HashSet<>();
emailsCadastrados.add("alice@ex.com");

String novoEmail = "alice@ex.com";
if (emailsCadastrados.contains(novoEmail)) {
    System.out.println("Email já cadastrado");
} else {
    emailsCadastrados.add(novoEmail);
}`,
        explanation: 'contains() em Set é O(1). Em List é O(n). Para verificações frequentes de existência, prefira Set.',
      },
    ],
    commonMistakes: [
      {
        title: 'Declarar como ArrayList em vez de List',
        wrong: 'ArrayList<String> lista = new ArrayList<>();',
        correct: 'List<String> lista = new ArrayList<>();',
        explanation: 'Programar para a interface (List) permite trocar a implementação (ArrayList → LinkedList) sem alterar o restante do código. É o princípio de inversão de dependência.',
      },
      {
        title: 'Usar List.contains() frequentemente',
        wrong: 'if (listaGrande.contains(item)) { ... } // O(n) a cada chamada',
        correct: 'Set<String> conjunto = new HashSet<>(listaGrande); if (conjunto.contains(item)) { ... }',
        explanation: 'List.contains() percorre toda a lista. Se você faz essa verificação muitas vezes, converta para HashSet antes. Set.contains() é O(1).',
      },
      {
        title: 'ArrayIndexOutOfBoundsException',
        wrong: 'String[] arr = {"a", "b"}; arr[2]; // índice 2 não existe',
        correct: 'if (i < arr.length) { arr[i]; }',
        explanation: 'Arrays e listas começam no índice 0. O último elemento está em length-1. Sempre valide o índice antes de acessar.',
      },
    ],
    practiceChallenge: {
      title: 'Frequência de palavras',
      description:
        'Dada uma frase como "java é bom e java é rápido", conte quantas vezes cada palavra aparece e imprima o resultado.',
      hints: [
        'Use split(" ") para dividir em palavras',
        'Use HashMap<String, Integer> para contar',
        'getOrDefault(palavra, 0) + 1 para incrementar',
      ],
      solution: `String frase = "java é bom e java é rápido";
String[] palavras = frase.split(" ");
Map<String, Integer> frequencia = new HashMap<>();

for (String palavra : palavras) {
    frequencia.put(palavra, frequencia.getOrDefault(palavra, 0) + 1);
}

for (Map.Entry<String, Integer> entry : frequencia.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue() + "x");
}`,
    },
    interviewQuestions: [
      {
        question: 'Qual a diferença entre ArrayList e LinkedList?',
        answer:
          'ArrayList usa um array internamente. Acesso por índice é O(1), mas inserção/remoção no meio é O(n) pois desloca elementos. LinkedList usa nós encadeados. Inserção/remoção em qualquer posição é O(1) se você já tem o nó, mas acesso por índice é O(n). Na prática, ArrayList é mais eficiente para a maioria dos casos de uso, pois acesso aleatório é mais comum que inserção no meio.',
        difficulty: 'medium',
      },
      {
        question: 'Quando usar HashMap vs HashSet?',
        answer:
          'Use HashMap quando precisar associar uma chave a um valor (id → usuário, palavra → contagem). Use HashSet quando precisar apenas verificar se um elemento existe ou garantir unicidade. HashSet é implementado internamente como um HashMap onde os valores são um objeto dummy constante.',
        difficulty: 'easy',
      },
    ],
    nextSteps: [
      { title: 'Orientação a Objetos', slug: 'oop', reason: 'Coleções guardam objetos. Aprenda a criar seus próprios tipos.' },
      { title: 'Exceções', slug: 'excecoes', reason: 'APIs que retornam listas precisam tratar erros quando a busca falha.' },
    ],
  },

  // ── Lição 5: oop ──────────────────────────────────────────────────────────
  {
    id: 'je-l-oop',
    trackSlug: 'java-essencial',
    topicSlug: 'oop',
    title: 'Orientação a Objetos',
    summary: 'Classes, objetos, construtores, encapsulamento e getters/setters. A base de toda aplicação Java empresarial.',
    explanation:
      'Java é orientado a objetos por design. Em Spring Boot, cada Controller, Service e Repository é uma classe. Entidades JPA são classes. DTOs são classes. Sem entender OOP, você não consegue ler código Java real — só vai copiar sem entender. Esta lição cobre o essencial para trabalhar com Spring Boot: criar classes, encapsular dados e definir comportamentos.',
    estimatedMinutes: 40,
    order: 5,
    sections: [
      {
        title: 'Classe e objeto',
        content:
          'Classe é um molde. Objeto é a instância criada a partir do molde.\n\n' +
          'Analogia: Classe é a planta baixa de uma casa. Objeto é a casa construída a partir dela. Você pode construir várias casas (objetos) a partir da mesma planta (classe).\n\n' +
          'Uma classe define: atributos (o que o objeto tem) e métodos (o que o objeto faz).',
      },
      {
        title: 'Encapsulamento e modificadores de acesso',
        content:
          'Encapsulamento = controlar quem pode acessar e modificar os dados de um objeto.\n\n' +
          '• private: só a própria classe acessa\n' +
          '• protected: a classe e subclasses\n' +
          '• public: qualquer um acessa\n' +
          '• (padrão): só classes do mesmo pacote\n\n' +
          'Regra geral: atributos são private. Acesso é feito via getters/setters públicos.\n\n' +
          'Por que? Permite validar dados antes de aceitar, mudar a representação interna sem quebrar quem usa a classe, e tornar a classe thread-safe.',
      },
      {
        title: 'Construtores',
        content:
          'Construtor é um método especial chamado com new. Tem o mesmo nome da classe, sem tipo de retorno.\n\n' +
          'Construtor padrão (sem parâmetros): criado automaticamente se você não declarar nenhum.\n\n' +
          'Construtor com parâmetros: permite inicializar o objeto com valores.\n\n' +
          'this(): chama outro construtor da mesma classe (constructor chaining).',
      },
    ],
    codeExamples: [
      {
        title: 'Criando uma classe do zero',
        language: 'java',
        code: `public class Usuario {
    // Atributos privados (encapsulados)
    private Long id;
    private String nome;
    private String email;
    private boolean ativo;

    // Construtor
    public Usuario(Long id, String nome, String email) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.ativo = true; // padrão
    }

    // Getters
    public Long getId() { return id; }
    public String getNome() { return nome; }
    public String getEmail() { return email; }
    public boolean isAtivo() { return ativo; }

    // Setter com validação
    public void setEmail(String email) {
        if (email == null || !email.contains("@")) {
            throw new IllegalArgumentException("Email inválido");
        }
        this.email = email;
    }

    // Método de negócio
    public void desativar() {
        this.ativo = false;
    }

    @Override
    public String toString() {
        return "Usuario{id=" + id + ", nome='" + nome + "'}";
    }
}`,
        explanation: 'Esta é a estrutura base de uma entidade Java. Em Spring Boot, você vai adicionar @Entity e @Id em cima disso.',
      },
      {
        title: 'Usando a classe',
        language: 'java',
        code: `// Criando objetos (instâncias)
Usuario alice = new Usuario(1L, "Alice", "alice@ex.com");
Usuario bob = new Usuario(2L, "Bob", "bob@ex.com");

// Acessando via getters
System.out.println(alice.getNome()); // "Alice"
System.out.println(alice.isAtivo()); // true

// Modificando via método
alice.desativar();
System.out.println(alice.isAtivo()); // false

// Setter com validação
try {
    alice.setEmail("email-invalido"); // lança exceção
} catch (IllegalArgumentException e) {
    System.out.println("Erro: " + e.getMessage());
}

// Coleção de objetos
List<Usuario> usuarios = new ArrayList<>();
usuarios.add(alice);
usuarios.add(bob);

for (Usuario u : usuarios) {
    System.out.println(u.getId() + ": " + u.getNome());
}`,
        explanation: 'Perceba como o setter protege o estado do objeto. Sem encapsulamento, qualquer código poderia colocar um email inválido diretamente.',
      },
      {
        title: 'Variáveis estáticas vs de instância',
        language: 'java',
        code: `public class Pedido {
    // Estático: compartilhado entre TODAS as instâncias
    private static int totalPedidos = 0;

    // De instância: cada pedido tem o seu
    private int numero;
    private String produto;
    private double valor;

    public Pedido(String produto, double valor) {
        totalPedidos++;           // incrementa o contador global
        this.numero = totalPedidos;
        this.produto = produto;
        this.valor = valor;
    }

    // Método estático: acessa só membros estáticos
    public static int getTotalPedidos() {
        return totalPedidos;
    }

    public int getNumero() { return numero; }
}

// Usando:
Pedido p1 = new Pedido("Livro Java", 89.90);
Pedido p2 = new Pedido("Curso Spring", 299.00);

System.out.println(Pedido.getTotalPedidos()); // 2
System.out.println(p1.getNumero());           // 1
System.out.println(p2.getNumero());           // 2`,
        explanation: 'Membros estáticos pertencem à classe, não a cada objeto. Útil para contadores, constantes e métodos utilitários.',
      },
    ],
    commonMistakes: [
      {
        title: 'Atributos públicos (sem encapsulamento)',
        wrong: 'public String nome; // qualquer código pode mudar',
        correct: 'private String nome; public String getNome() { return nome; }',
        explanation: 'Atributos públicos não podem ser validados, não notificam mudanças e expõem a implementação. Use encapsulamento sempre.',
      },
      {
        title: 'Confundir this com a classe',
        wrong: 'public void setNome(String nome) { nome = nome; } // não faz nada',
        correct: 'public void setNome(String nome) { this.nome = nome; }',
        explanation: 'Sem this, a atribuição é do parâmetro para ele mesmo. this.nome refere-se ao atributo do objeto, nome ao parâmetro.',
      },
      {
        title: 'Não implementar toString()',
        wrong: 'System.out.println(usuario); // imprime "com.exemplo.Usuario@1a2b3c"',
        correct: '@Override public String toString() { return "Usuario{id=" + id + "}"; }',
        explanation: 'Sem toString(), imprimir um objeto mostra o hashCode em hexadecimal. Sempre implemente toString() para facilitar debug.',
      },
    ],
    practiceChallenge: {
      title: 'Classe ContaBancária',
      description:
        'Crie uma classe ContaBancaria com: número, titular (String), saldo (double). Métodos: depositar(valor), sacar(valor) que valida se há saldo suficiente, e getSaldo(). Crie 2 contas e faça algumas operações.',
      hints: [
        'saldo deve ser private',
        'depositar() não aceita valor negativo',
        'sacar() lança IllegalStateException se saldo insuficiente',
      ],
      solution: `public class ContaBancaria {
    private String numero;
    private String titular;
    private double saldo;

    public ContaBancaria(String numero, String titular, double saldoInicial) {
        this.numero = numero;
        this.titular = titular;
        this.saldo = saldoInicial;
    }

    public void depositar(double valor) {
        if (valor <= 0) throw new IllegalArgumentException("Valor inválido");
        this.saldo += valor;
    }

    public void sacar(double valor) {
        if (valor <= 0) throw new IllegalArgumentException("Valor inválido");
        if (valor > saldo) throw new IllegalStateException("Saldo insuficiente");
        this.saldo -= valor;
    }

    public double getSaldo() { return saldo; }
    public String getTitular() { return titular; }
}`,
    },
    interviewQuestions: [
      {
        question: 'O que é encapsulamento e por que é importante?',
        answer:
          'Encapsulamento é o princípio de esconder os detalhes internos de uma classe e expor apenas o necessário via interface pública (métodos). É importante porque: (1) protege o estado interno de modificações inválidas, (2) permite mudar a implementação sem quebrar quem usa a classe, (3) torna o código mais fácil de testar, e (4) é a base para thread-safety.',
        difficulty: 'easy',
      },
      {
        question: 'Qual a diferença entre variável de instância e variável estática?',
        answer:
          'Variável de instância: cada objeto tem a sua própria cópia. Modificar em um objeto não afeta os outros. Variável estática: existe uma única cópia compartilhada por todos os objetos da classe. Modificar em qualquer ponto afeta todos. Variáveis estáticas são acessadas pela classe (Classe.variavel), não pelo objeto.',
        difficulty: 'easy',
      },
    ],
    nextSteps: [
      { title: 'Exceções', slug: 'excecoes', reason: 'Seus métodos de negócio precisam lançar e tratar erros corretamente.' },
      { title: 'Herança e polimorfismo', slug: 'heranca-e-polimorfismo', reason: 'Com classes dominadas, o próximo passo é reutilizar código via herança.' },
    ],
  },

  // ── Lição 6: excecoes ─────────────────────────────────────────────────────
  {
    id: 'je-l-excecoes',
    trackSlug: 'java-essencial',
    topicSlug: 'excecoes',
    title: 'Exceções em Java',
    summary: 'Em APIs reais, erros acontecem. Aprenda try/catch, checked vs unchecked, e como criar exceções de negócio.',
    explanation:
      'Em APIs de produção, erros não são exceção — são rotina. O usuário envia um CPF inválido, o banco de dados fica indisponível, um recurso não é encontrado. Java usa exceções para modelar e comunicar esses estados. Em Spring Boot, @ExceptionHandler e @ControllerAdvice usam o mecanismo de exceções para retornar respostas HTTP de erro corretas. Entender exceções é pré-requisito para construir APIs profissionais.',
    estimatedMinutes: 35,
    order: 6,
    sections: [
      {
        title: 'Hierarquia de exceções',
        content:
          'Throwable\n' +
          '├── Error — problemas da JVM (OutOfMemoryError). Não capture.\n' +
          '└── Exception\n' +
          '    ├── IOException, SQLException (checked) — compiler obriga a tratar\n' +
          '    └── RuntimeException (unchecked) — não obriga tratamento\n' +
          '        ├── NullPointerException\n' +
          '        ├── IllegalArgumentException\n' +
          '        ├── ArrayIndexOutOfBoundsException\n' +
          '        └── IllegalStateException\n\n' +
          'Em APIs, prefira unchecked (RuntimeException) para exceções de negócio. É mais limpo e não polui as assinaturas dos métodos.',
      },
      {
        title: 'try / catch / finally',
        content:
          'try: bloco que pode lançar exceção.\n' +
          'catch(TipoExcecao e): captura e trata a exceção. Pode ter múltiplos catch.\n' +
          'finally: executa sempre, com ou sem exceção. Use para fechar recursos.\n\n' +
          'try-with-resources (Java 7+): fecha recursos automaticamente. Preferido para Closeable (streams, conexões).\n\n' +
          'Capture sempre do mais específico para o mais genérico.',
      },
      {
        title: 'Criando exceções de negócio',
        content:
          'Em Spring Boot, cada caso de erro tem sua exceção: ResourceNotFoundException, BusinessException, ValidationException.\n\n' +
          'Padrão: estenda RuntimeException. Passe uma mensagem clara. O @ControllerAdvice captura e converte para HTTP 404, 400, etc.\n\n' +
          'Nunca lance Exception genérica — seja específico para que o handler correto capture.',
      },
    ],
    codeExamples: [
      {
        title: 'try/catch básico',
        language: 'java',
        code: `// Múltiplos catch — do mais específico ao mais genérico
public Usuario buscarUsuario(String idStr) {
    try {
        Long id = Long.parseLong(idStr);   // pode lançar NumberFormatException
        Usuario usuario = repository.findById(id); // pode lançar SQLException
        if (usuario == null) {
            throw new RuntimeException("Usuário não encontrado: " + id);
        }
        return usuario;

    } catch (NumberFormatException e) {
        throw new IllegalArgumentException("ID inválido: " + idStr, e);

    } catch (SQLException e) {
        // Logar o erro técnico, lançar uma exceção de negócio
        log.error("Erro ao buscar usuário {}", idStr, e);
        throw new RuntimeException("Erro de banco de dados", e);
    }
}`,
        explanation: 'Capture o mais específico primeiro. Sempre passe a exceção original como causa (segundo parâmetro do construtor) para preservar o stack trace.',
      },
      {
        title: 'Exceções de negócio em Spring Boot',
        language: 'java',
        code: `// 1. Criar exceção customizada
public class UsuarioNaoEncontradoException extends RuntimeException {
    public UsuarioNaoEncontradoException(Long id) {
        super("Usuário não encontrado com id: " + id);
    }
}

// 2. Lançar no Service
public Usuario buscar(Long id) {
    return repository.findById(id)
        .orElseThrow(() -> new UsuarioNaoEncontradoException(id));
}

// 3. Capturar no @ControllerAdvice (Spring Boot)
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UsuarioNaoEncontradoException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(UsuarioNaoEncontradoException ex) {
        ErrorResponse erro = new ErrorResponse(404, ex.getMessage());
        return ResponseEntity.status(404).body(erro);
    }
}`,
        explanation: 'Este é o padrão real usado em Spring Boot. A exceção sobe pelo Service, Spring a captura no @ControllerAdvice e retorna a resposta HTTP correta.',
      },
      {
        title: 'try-with-resources',
        language: 'java',
        code: `// SEM try-with-resources: fácil de esquecer o close()
BufferedReader reader = null;
try {
    reader = new BufferedReader(new FileReader("arquivo.txt"));
    String linha = reader.readLine();
} catch (IOException e) {
    e.printStackTrace();
} finally {
    if (reader != null) {
        try { reader.close(); } catch (IOException e) { }
    }
}

// COM try-with-resources: automático e mais limpo
try (BufferedReader reader = new BufferedReader(new FileReader("arquivo.txt"))) {
    String linha = reader.readLine();
    // reader.close() é chamado automaticamente
} catch (IOException e) {
    e.printStackTrace();
}`,
        explanation: 'try-with-resources funciona com qualquer classe que implemente AutoCloseable. Prefira sempre que trabalhar com streams, conexões ou arquivos.',
      },
    ],
    commonMistakes: [
      {
        title: 'Capturar Exception genérica',
        wrong: 'catch (Exception e) { System.out.println("Erro"); }',
        correct: 'catch (NumberFormatException e) { ... } catch (IOException e) { ... }',
        explanation: 'Capturar Exception genérica esconde bugs — você pode estar silenciando NullPointerException ou OutOfMemoryError sem perceber. Seja específico.',
      },
      {
        title: 'Swallow exception (engolir silenciosamente)',
        wrong: 'catch (Exception e) { } // bloco vazio',
        correct: 'catch (Exception e) { log.error("Erro ao processar", e); throw new RuntimeException("Processamento falhou", e); }',
        explanation: 'Um catch vazio faz a exceção desaparecer silenciosamente. Sempre logue ou re-lance. Em código de produção isso pode esconder falhas críticas.',
      },
      {
        title: 'Lançar exceção genérica',
        wrong: 'throw new Exception("usuário não encontrado");',
        correct: 'throw new UsuarioNaoEncontradoException(id);',
        explanation: 'Exception genérica force quem chama a declarar throws Exception em tudo. Use exceções específicas para que o handler correto capture.',
      },
    ],
    practiceChallenge: {
      title: 'Divisão Segura',
      description:
        'Crie um método dividir(int a, int b) que: retorna a divisão inteira, lança IllegalArgumentException se b for zero, e imprime a mensagem de erro com catch na chamada. Teste com b=0 e com b=5.',
      hints: [
        'Verifique b == 0 antes da divisão',
        'Lance com new IllegalArgumentException("mensagem")',
        'O caller usa try/catch para imprimir o erro',
      ],
      solution: `public static int dividir(int a, int b) {
    if (b == 0) {
        throw new IllegalArgumentException("Divisão por zero não é permitida");
    }
    return a / b;
}

// Chamada
try {
    System.out.println(dividir(10, 2)); // 5
    System.out.println(dividir(10, 0)); // lança exceção
} catch (IllegalArgumentException e) {
    System.out.println("Erro: " + e.getMessage());
}`,
    },
    interviewQuestions: [
      {
        question: 'Qual a diferença entre checked e unchecked exceptions?',
        answer:
          'Checked exceptions: herdam de Exception (mas não de RuntimeException). O compilador obriga a declarar no throws da assinatura ou capturar com try/catch. Exemplos: IOException, SQLException. Unchecked exceptions: herdam de RuntimeException. Não obrigam declaração. Exemplos: NullPointerException, IllegalArgumentException. Em Spring Boot, preferimos unchecked para exceções de negócio — não poluem as assinaturas dos métodos.',
        difficulty: 'medium',
      },
      {
        question: 'O que acontece se um catch estiver vazio?',
        answer:
          'A exceção é silenciada — o fluxo continua como se nada tivesse acontecido. Isso é chamado de "exception swallowing" e é considerado um anti-padrão grave. O sistema continua rodando em estado potencialmente inválido, e não há como saber que algo deu errado. Sempre logue a exceção ou re-lance.',
        difficulty: 'easy',
      },
    ],
    nextSteps: [
      { title: 'Herança e polimorfismo', slug: 'heranca-e-polimorfismo', reason: 'Hierarquias de exceção usam herança. É hora de aprender esse mecanismo.' },
    ],
  },
];

// Índice para lookup O(1)
export const JAVA_ESSENTIAL_LESSON_MAP: Record<string, ProgrammingLessonContent> =
  Object.fromEntries(JAVA_ESSENTIAL_LESSONS.map((l) => [l.topicSlug, l]));
