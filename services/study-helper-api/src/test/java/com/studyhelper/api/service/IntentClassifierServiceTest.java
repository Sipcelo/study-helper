package com.studyhelper.api.service;

import com.studyhelper.api.domain.Intent;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class IntentClassifierServiceTest {

    private final IntentClassifierService classifier = new IntentClassifierService();

    @Test
    void shouldClassifyExplainConceptForRest() {
        assertThat(classifier.classify("me explica o que e REST")).isEqualTo(Intent.EXPLAIN_CONCEPT);
    }

    @Test
    void shouldClassifyExplainConceptForSelic() {
        assertThat(classifier.classify("me explica Selic")).isEqualTo(Intent.EXPLAIN_CONCEPT);
    }

    @Test
    void shouldClassifyGenerateStudyPlanForSpringBoot() {
        assertThat(classifier.classify("quero estudar Spring Boot")).isEqualTo(Intent.GENERATE_STUDY_PLAN);
    }

    @Test
    void shouldClassifyGenerateStudyPlanForQuiz() {
        assertThat(classifier.classify("me faca um quiz sobre Java")).isEqualTo(Intent.GENERATE_STUDY_PLAN);
    }

    @Test
    void shouldClassifySimulateInterviewForJavaJunior() {
        assertThat(classifier.classify("simula entrevista Java Junior")).isEqualTo(Intent.SIMULATE_INTERVIEW);
    }

    @Test
    void shouldClassifySimulateInterviewForKeyword() {
        assertThat(classifier.classify("quero treinar entrevista tecnica")).isEqualTo(Intent.SIMULATE_INTERVIEW);
    }

    @Test
    void shouldClassifyCompareConceptsForStocks() {
        assertThat(classifier.classify("comparar NVDA e TSLA")).isEqualTo(Intent.COMPARE_CONCEPTS);
    }

    @Test
    void shouldClassifyCompareConceptsForVs() {
        assertThat(classifier.classify("Java vs Kotlin qual melhor")).isEqualTo(Intent.COMPARE_CONCEPTS);
    }

    @Test
    void shouldClassifyReviewAnswer() {
        assertThat(classifier.classify("revisa minha resposta")).isEqualTo(Intent.REVIEW_ANSWER);
    }

    @Test
    void shouldReturnUnknownForUnrecognizedInput() {
        assertThat(classifier.classify("banana azul")).isEqualTo(Intent.UNKNOWN);
    }

    @Test
    void shouldReturnUnknownForNullInput() {
        assertThat(classifier.classify(null)).isEqualTo(Intent.UNKNOWN);
    }

    @Test
    void shouldReturnUnknownForBlankInput() {
        assertThat(classifier.classify("   ")).isEqualTo(Intent.UNKNOWN);
    }
}
