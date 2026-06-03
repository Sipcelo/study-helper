package com.studyhelper.api.service;

import com.studyhelper.api.domain.Intent;
import org.springframework.stereotype.Service;

@Service
public class IntentClassifierService {

    public Intent classify(String input) {
        if (input == null || input.isBlank()) return Intent.UNKNOWN;
        String lower = normalize(input);

        if (matchesCompare(lower))        return Intent.COMPARE_CONCEPTS;
        if (matchesInterview(lower))      return Intent.SIMULATE_INTERVIEW;
        if (matchesStudyPlan(lower))      return Intent.GENERATE_STUDY_PLAN;
        if (matchesReview(lower))         return Intent.REVIEW_ANSWER;
        if (matchesExplain(lower))        return Intent.EXPLAIN_CONCEPT;
        if (matchesOpenResource(lower))   return Intent.OPEN_RESOURCE;
        return Intent.UNKNOWN;
    }

    private boolean matchesExplain(String lower) {
        return lower.matches(".*(explica|explique|o que (e|eh|é)|o que sao|o que são|define|definir" +
                "|conceito|como funciona|me conta sobre|me fala sobre|explana|para que serve).*");
    }

    private boolean matchesStudyPlan(String lower) {
        return lower.matches(".*(quero estudar|plano de estudos|me ajuda a estudar|como aprender" +
                "|como estudar|trilha|roadmap|cronograma|guia de estudos|por onde comecar" +
                "|por onde começar|quero aprender|me ensina|quiz|exercicio|exercício|praticar|treinar).*");
    }

    private boolean matchesInterview(String lower) {
        return lower.matches(".*(entrevista|simula entrevista|perguntas de entrevista|me entrevista" +
                "|preparar entrevista|entrevista tecnica|entrevista técnica|treinar entrevista" +
                "|processo seletivo|simule entrevista).*");
    }

    private boolean matchesReview(String lower) {
        return lower.matches(".*(revisa|revise|corrige|corrija|minha resposta|analisa|analise" +
                "|da feedback|dá feedback|verifica|verifique|ta certo|esta certo|está certo|tá certo).*");
    }

    private boolean matchesOpenResource(String lower) {
        return lower.matches(".*(abrir|abra|navegar|ir para|mostrar|ver|show|abre|acessa|acesse).*");
    }

    private boolean matchesCompare(String lower) {
        return lower.matches(".*(comparar|compare|compara|diferenca entre|diferença entre" +
                "| vs | versus |qual (e |é |o )?melhor).*");
    }

    String normalize(String text) {
        return text.toLowerCase()
                .replace("ã", "a").replace("á", "a").replace("â", "a").replace("à", "a")
                .replace("é", "e").replace("ê", "e").replace("è", "e")
                .replace("í", "i").replace("î", "i")
                .replace("ó", "o").replace("ô", "o").replace("õ", "o")
                .replace("ú", "u").replace("ü", "u")
                .replace("ç", "c")
                .trim();
    }
}
