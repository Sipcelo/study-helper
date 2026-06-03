package com.studyhelper.api.service;

import com.studyhelper.api.domain.Domain;
import com.studyhelper.api.domain.Intent;
import com.studyhelper.api.dto.ResourceMatchResult;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class ResourceResolverServiceTest {

    private final ResourceResolverService resolver =
            new ResourceResolverService(new ResourceCatalogService());

    @Test
    void shouldMatchRestApiFromExplainInput() {
        ResourceMatchResult result = resolver.resolve("me explica REST", Domain.PROGRAMMING, Intent.EXPLAIN_CONCEPT);

        assertThat(result.matched()).isTrue();
        assertThat(result.targetPath()).isEqualTo("/programacao/rest-api");
        assertThat(result.confidence()).isGreaterThan(0.0);
    }

    @Test
    void shouldMatchSpringBootFromStudyInput() {
        ResourceMatchResult result = resolver.resolve("quero estudar Spring Boot", Domain.PROGRAMMING, Intent.GENERATE_STUDY_PLAN);

        assertThat(result.matched()).isTrue();
        assertThat(result.targetPath()).isEqualTo("/programacao/spring-boot");
    }

    @Test
    void shouldMatchInterviewFromSimulateInput() {
        ResourceMatchResult result = resolver.resolve("simula entrevista Java Junior", Domain.PROGRAMMING, Intent.SIMULATE_INTERVIEW);

        assertThat(result.matched()).isTrue();
        assertThat(result.targetPath()).isEqualTo("/programacao/entrevista-java-junior");
    }

    @Test
    void shouldMatchSelicFromFinanceInput() {
        ResourceMatchResult result = resolver.resolve("me explica Selic", Domain.FINANCE, Intent.EXPLAIN_CONCEPT);

        assertThat(result.matched()).isTrue();
        assertThat(result.targetPath()).isEqualTo("/ativo/selic");
    }

    @Test
    void shouldMatchInflacaoToGlossario() {
        ResourceMatchResult result = resolver.resolve("o que e inflação", Domain.FINANCE, Intent.EXPLAIN_CONCEPT);

        assertThat(result.matched()).isTrue();
        assertThat(result.targetPath()).isEqualTo("/glossario?search=inflação");
    }

    @Test
    void shouldReturnNoMatchForUnknownIntent() {
        ResourceMatchResult result = resolver.resolve("banana azul", Domain.GENERAL, Intent.UNKNOWN);

        assertThat(result.matched()).isFalse();
    }

    @Test
    void shouldReturnNoMatchForCompareIntent() {
        ResourceMatchResult result = resolver.resolve("comparar NVDA e TSLA", Domain.FINANCE, Intent.COMPARE_CONCEPTS);

        assertThat(result.matched()).isFalse();
    }

    @Test
    void shouldReturnNoMatchForUnrecognizedTopic() {
        ResourceMatchResult result = resolver.resolve("banana azul", Domain.PROGRAMMING, Intent.EXPLAIN_CONCEPT);

        assertThat(result.matched()).isFalse();
    }

    @Test
    void shouldMatchDescriptionWhenResourceFound() {
        ResourceMatchResult result = resolver.resolve("me explica REST", Domain.PROGRAMMING, Intent.EXPLAIN_CONCEPT);

        assertThat(result.matched()).isTrue();
        assertThat(result.description()).isNotBlank();
        assertThat(result.title()).isNotBlank();
    }

    @Test
    void shouldMatchNvdaStock() {
        ResourceMatchResult result = resolver.resolve("me explica NVDA", Domain.FINANCE, Intent.EXPLAIN_CONCEPT);

        assertThat(result.matched()).isTrue();
        assertThat(result.targetPath()).isEqualTo("/ativo/nvda");
    }

    @Test
    void shouldPreferLongerAliasMatch() {
        // "entrevista java junior" should match interview page, not plain "java"
        ResourceMatchResult result = resolver.resolve("entrevista java junior", Domain.PROGRAMMING, Intent.SIMULATE_INTERVIEW);

        assertThat(result.matched()).isTrue();
        assertThat(result.targetPath()).isEqualTo("/programacao/entrevista-java-junior");
    }
}
