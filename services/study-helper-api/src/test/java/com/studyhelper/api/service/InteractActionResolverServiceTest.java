package com.studyhelper.api.service;

import com.studyhelper.api.domain.ActionType;
import com.studyhelper.api.domain.Domain;
import com.studyhelper.api.domain.Intent;
import com.studyhelper.api.dto.InteractAction;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class InteractActionResolverServiceTest {

    private final InteractActionResolverService resolver =
            new InteractActionResolverService(new ResourceResolverService(new ResourceCatalogService()));

    @Test
    void shouldResolveExplainConceptInProgrammingDomain() {
        InteractAction action = resolver.resolve("me explica REST", Domain.PROGRAMMING, Intent.EXPLAIN_CONCEPT);

        assertThat(action.type()).isEqualTo(ActionType.SHOW_EXPLANATION.name());
        assertThat(action.target()).startsWith("/programacao/");
    }

    @Test
    void shouldResolveExplainConceptSelicToAtivoPage() {
        InteractAction action = resolver.resolve("me explica Selic", Domain.FINANCE, Intent.EXPLAIN_CONCEPT);

        assertThat(action.type()).isEqualTo(ActionType.SHOW_EXPLANATION.name());
        assertThat(action.target()).isEqualTo("/ativo/selic");
    }

    @Test
    void shouldResolveGenerateStudyPlanAlwaysToPlanejarEstudos() {
        InteractAction action = resolver.resolve("quero estudar Spring Boot", Domain.PROGRAMMING, Intent.GENERATE_STUDY_PLAN);

        assertThat(action.type()).isEqualTo(ActionType.START_STUDY_PLAN.name());
        assertThat(action.target()).isEqualTo("/planejar-estudos");
    }

    @Test
    void shouldResolveSimulateInterviewJavaJunior() {
        InteractAction action = resolver.resolve("simula entrevista Java Junior", Domain.PROGRAMMING, Intent.SIMULATE_INTERVIEW);

        assertThat(action.type()).isEqualTo(ActionType.START_INTERVIEW.name());
        assertThat(action.target()).startsWith("/programacao/entrevista-");
    }

    @Test
    void shouldResolveCompareConceptsInFinanceToAtivos() {
        InteractAction action = resolver.resolve("comparar NVDA e TSLA", Domain.FINANCE, Intent.COMPARE_CONCEPTS);

        assertThat(action.type()).isEqualTo(ActionType.OPEN_RESOURCE.name());
        assertThat(action.target()).isEqualTo("/ativos");
    }

    @Test
    void shouldResolveCompareConceptsInProgrammingToProgramacao() {
        InteractAction action = resolver.resolve("Java vs Kotlin", Domain.PROGRAMMING, Intent.COMPARE_CONCEPTS);

        assertThat(action.type()).isEqualTo(ActionType.OPEN_RESOURCE.name());
        assertThat(action.target()).isEqualTo("/programacao");
    }

    @Test
    void shouldResolveOpenResourceToBasePath() {
        InteractAction action = resolver.resolve("ver carreira", Domain.CAREER, Intent.OPEN_RESOURCE);

        assertThat(action.type()).isEqualTo(ActionType.OPEN_RESOURCE.name());
        assertThat(action.target()).isEqualTo("/carreira");
    }

    @Test
    void shouldResolveUnknownToNone() {
        InteractAction action = resolver.resolve("banana azul", Domain.GENERAL, Intent.UNKNOWN);

        assertThat(action.type()).isEqualTo(ActionType.NONE.name());
        assertThat(action.target()).isNull();
    }

    @Test
    void shouldFallbackToEntrevistaJavaJuniorWhenNoMatch() {
        InteractAction action = resolver.resolve("simula entrevista frontend react", Domain.PROGRAMMING, Intent.SIMULATE_INTERVIEW);

        assertThat(action.type()).isEqualTo(ActionType.START_INTERVIEW.name());
        assertThat(action.target()).isEqualTo("/programacao/entrevista-java-junior");
    }
}
