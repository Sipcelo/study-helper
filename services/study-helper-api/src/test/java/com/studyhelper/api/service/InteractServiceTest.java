package com.studyhelper.api.service;

import com.studyhelper.api.dto.InteractRequest;
import com.studyhelper.api.dto.InteractResponse;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class InteractServiceTest {

    private final ResourceCatalogService catalog     = new ResourceCatalogService();
    private final ResourceResolverService resResolver = new ResourceResolverService(catalog);
    private final IntentClassifierService classifier  = new IntentClassifierService();
    private final InteractActionResolverService resolver = new InteractActionResolverService(resResolver);
    private final InteractService service = new InteractService(classifier, resolver, resResolver);

    @Test
    void shouldResolveRestToRealPath() {
        var request = new InteractRequest("me explica o que e REST", "programming");
        InteractResponse response = service.processText(request);

        assertThat(response.intent()).isEqualTo("EXPLAIN_CONCEPT");
        assertThat(response.transcript()).isEqualTo("me explica o que e REST");
        assertThat(response.domain()).isEqualTo("programming");
        assertThat(response.action().type()).isEqualTo("SHOW_EXPLANATION");
        assertThat(response.action().target()).isEqualTo("/programacao/rest-api");
    }

    @Test
    void shouldResolveSpringBootStudyPlanToPlanejar() {
        var request = new InteractRequest("quero estudar Spring Boot", "programming");
        InteractResponse response = service.processText(request);

        assertThat(response.intent()).isEqualTo("GENERATE_STUDY_PLAN");
        assertThat(response.action().type()).isEqualTo("START_STUDY_PLAN");
        assertThat(response.action().target()).isEqualTo("/planejar-estudos");
    }

    @Test
    void shouldResolveInterviewJavaJuniorToRealPath() {
        var request = new InteractRequest("simula entrevista Java Junior", "programming");
        InteractResponse response = service.processText(request);

        assertThat(response.intent()).isEqualTo("SIMULATE_INTERVIEW");
        assertThat(response.action().type()).isEqualTo("START_INTERVIEW");
        assertThat(response.action().target()).isEqualTo("/programacao/entrevista-java-junior");
    }

    @Test
    void shouldResolveSelicToAtivoPage() {
        var request = new InteractRequest("me explica Selic", "finance");
        InteractResponse response = service.processText(request);

        assertThat(response.intent()).isEqualTo("EXPLAIN_CONCEPT");
        assertThat(response.action().target()).isEqualTo("/ativo/selic");
    }

    @Test
    void shouldResolveInflacaoToGlossario() {
        var request = new InteractRequest("o que e inflação", "finance");
        InteractResponse response = service.processText(request);

        assertThat(response.intent()).isEqualTo("EXPLAIN_CONCEPT");
        assertThat(response.action().target()).isEqualTo("/glossario?search=inflação");
    }

    @Test
    void shouldResolveCompareStocksToAtivos() {
        var request = new InteractRequest("comparar NVDA e TSLA", "finance");
        InteractResponse response = service.processText(request);

        assertThat(response.intent()).isEqualTo("COMPARE_CONCEPTS");
        assertThat(response.action().target()).isEqualTo("/ativos");
    }

    @Test
    void shouldReturnUnknownWithNoneActionForGibberish() {
        var request = new InteractRequest("banana azul", "programming");
        InteractResponse response = service.processText(request);

        assertThat(response.intent()).isEqualTo("UNKNOWN");
        assertThat(response.action().type()).isEqualTo("NONE");
        assertThat(response.action().target()).isNull();
    }

    @Test
    void shouldHandleNullDomain() {
        var request = new InteractRequest("explica polimorfismo", null);
        InteractResponse response = service.processText(request);

        assertThat(response.domain()).isEqualTo("general");
        assertThat(response.intent()).isEqualTo("EXPLAIN_CONCEPT");
    }

    @Test
    void shouldReturnEnrichedAnswerWhenResourceMatched() {
        var request = new InteractRequest("me explica REST", "programming");
        InteractResponse response = service.processText(request);

        assertThat(response.answer()).contains("APIs REST");
        assertThat(response.answer()).startsWith("Encontrei");
    }
}
