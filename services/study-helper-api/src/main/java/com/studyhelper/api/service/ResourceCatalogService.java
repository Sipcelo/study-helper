package com.studyhelper.api.service;

import com.studyhelper.api.domain.Domain;
import com.studyhelper.api.domain.ResourceEntry;
import com.studyhelper.api.domain.ResourceType;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResourceCatalogService {

    private static final List<ResourceEntry> CATALOG = List.of(

        // ── Programação: conceitos e trilhas ──────────────────────────────────
        new ResourceEntry("rest-api", "APIs REST", List.of(
                "rest", "api rest", "rest api", "restful", "restful api", "http api"),
            Domain.PROGRAMMING, ResourceType.STUDY_TRACK, "/programacao/rest-api",
            "APIs REST organizam recursos em rotas HTTP usando GET, POST, PUT e DELETE para comunicação entre sistemas."
        ),
        new ResourceEntry("spring-boot", "Spring Boot", List.of(
                "spring boot", "springboot", "spring framework", "spring"),
            Domain.PROGRAMMING, ResourceType.STUDY_TRACK, "/programacao/spring-boot",
            "Spring Boot simplifica o desenvolvimento Java com configuração automática, servidor embutido e ecossistema Spring completo."
        ),
        new ResourceEntry("java-essencial", "Java Essencial", List.of(
                "java essencial", "java basico", "java oop", "java iniciante"),
            Domain.PROGRAMMING, ResourceType.STUDY_TRACK, "/programacao/java-essencial",
            "Trilha Java essencial: sintaxe, POO, coleções, streams e boas práticas para iniciantes e juniors."
        ),
        new ResourceEntry("dto-validacao", "DTO e Validação", List.of(
                "dto", "data transfer object", "dto validacao", "dto validação", "bean validation"),
            Domain.PROGRAMMING, ResourceType.STUDY_LESSON, "/programacao/dto-validacao",
            "DTOs (Data Transfer Objects) encapsulam dados entre camadas. Use records Java para DTOs imutáveis e concisos."
        ),
        new ResourceEntry("rest-controller", "REST Controller", List.of(
                "controller", "controllers", "rest controller", "restcontroller", "endpoint"),
            Domain.PROGRAMMING, ResourceType.STUDY_LESSON, "/programacao/spring-boot",
            "Controllers Spring Boot mapeiam requisições HTTP para métodos Java usando @RestController e @RequestMapping."
        ),
        new ResourceEntry("service-layer", "Camada de Serviço", List.of(
                "service layer", "camada de servico", "camada de serviço", "service class"),
            Domain.PROGRAMMING, ResourceType.STUDY_LESSON, "/programacao/spring-boot",
            "A camada de serviço centraliza a lógica de negócio, separando-a do controller e do repositório."
        ),
        new ResourceEntry("repository-layer", "Repository JPA", List.of(
                "repository", "repositorio", "repositório", "jpa repository", "spring data"),
            Domain.PROGRAMMING, ResourceType.STUDY_LESSON, "/programacao/spring-boot",
            "Spring Data JPA gera automaticamente queries SQL a partir de interfaces Repository, sem boilerplate."
        ),
        new ResourceEntry("java-lang", "Java", List.of("java"),
            Domain.PROGRAMMING, ResourceType.STUDY_TRACK, "/programacao/java-essencial",
            "Linguagem Java: fortemente tipada, orientada a objetos, com enorme ecossistema e alta demanda no mercado."
        ),

        // ── Carreira ──────────────────────────────────────────────────────────
        new ResourceEntry("entrevista-java-junior", "Entrevista Java Junior", List.of(
                "entrevista java junior", "java junior", "entrevista java", "entrevista junior",
                "entrevista tecnica java", "entrevista técnica java"),
            Domain.CAREER, ResourceType.INTERVIEW, "/programacao/entrevista-java-junior",
            "Simulação de entrevista técnica Java Junior: OOP, Spring, JPA, SQL e perguntas comportamentais."
        ),
        new ResourceEntry("carreira-junior", "Carreira Junior", List.of(
                "curriculo", "currículo", "linkedin", "perfil linkedin", "carreira junior",
                "portfolio", "portfólio", "primeira vaga"),
            Domain.CAREER, ResourceType.STUDY_TRACK, "/programacao/carreira-junior",
            "Guia de carreira junior: currículo, LinkedIn e estratégias para conquistar sua primeira vaga em tecnologia."
        ),

        // ── Study Planner ─────────────────────────────────────────────────────
        new ResourceEntry("planejar-estudos", "Planejar Estudos", List.of(
                "plano de estudos", "planejar estudos", "criar plano", "cronograma estudos",
                "plano semanal", "meta de estudos", "estudos"),
            Domain.STUDY, ResourceType.STUDY_PLANNER, "/planejar-estudos",
            "Crie um plano de estudos personalizado com metas semanais, cronograma e acompanhamento de progresso."
        ),

        // ── Finanças: ativos ─────────────────────────────────────────────────
        new ResourceEntry("selic", "Taxa Selic", List.of(
                "selic", "taxa selic", "juros selic"),
            Domain.FINANCE, ResourceType.ASSET_PAGE, "/ativo/selic",
            "Taxa Selic é a taxa básica de juros definida pelo Banco Central. Influencia crédito, investimentos e inflação."
        ),
        new ResourceEntry("ipca", "IPCA", List.of(
                "ipca", "inflacao ipca", "inflação ipca", "indice precos", "índice de preços"),
            Domain.FINANCE, ResourceType.ASSET_PAGE, "/ativo/ipca",
            "IPCA é o índice oficial de inflação do Brasil, calculado mensalmente pelo IBGE com base na cesta de consumo."
        ),
        new ResourceEntry("dxy", "DXY — Dollar Index", List.of(
                "dxy", "dollar index", "dolar index", "índice dólar", "indice dolar"),
            Domain.FINANCE, ResourceType.ASSET_PAGE, "/ativo/dxy",
            "DXY mede a força do dólar americano frente a uma cesta de moedas (Euro, Iene, Libra, Franco Suíço e outros)."
        ),
        new ResourceEntry("nvda", "NVDA — Nvidia", List.of(
                "nvda", "nvidia", "nvidia stock", "nvidia acao", "nvidia ação"),
            Domain.FINANCE, ResourceType.ASSET_PAGE, "/ativo/nvda",
            "Nvidia (NVDA) é líder global em GPUs e chips para IA, com forte crescimento impulsionado pela computação acelerada."
        ),
        new ResourceEntry("tsla", "TSLA — Tesla", List.of(
                "tsla", "tesla", "tesla stock", "tesla acao", "tesla ação"),
            Domain.FINANCE, ResourceType.ASSET_PAGE, "/ativo/tsla",
            "Tesla (TSLA) é a maior fabricante de veículos elétricos do mundo, com atuação em energia solar e armazenamento."
        ),
        new ResourceEntry("ibov", "Ibovespa", List.of(
                "ibovespa", "ibov", "indice bovespa", "índice bovespa", "bolsa brasileira", "b3"),
            Domain.FINANCE, ResourceType.ASSET_PAGE, "/ativo/ibov",
            "Ibovespa (IBOV) é o principal índice da Bolsa brasileira, composto pelas ações mais negociadas na B3."
        ),

        // ── Finanças: glossário ───────────────────────────────────────────────
        new ResourceEntry("inflacao", "Inflação", List.of(
                "inflacao", "inflação", "alta de precos", "alta de preços"),
            Domain.FINANCE, ResourceType.GLOSSARY_CONCEPT, "/glossario?search=inflação",
            "Inflação é o aumento generalizado e contínuo dos preços, que reduz o poder de compra da moeda ao longo do tempo."
        ),
        new ResourceEntry("dividendos", "Dividendos", List.of(
                "dividendos", "dividendo", "dividend yield", "yield", "distribuicao de lucros"),
            Domain.FINANCE, ResourceType.GLOSSARY_CONCEPT, "/glossario?search=dividendos",
            "Dividendos são parte do lucro distribuído pelas empresas aos acionistas, geralmente trimestral ou semestralmente."
        )
    );

    public List<ResourceEntry> all() {
        return CATALOG;
    }
}
