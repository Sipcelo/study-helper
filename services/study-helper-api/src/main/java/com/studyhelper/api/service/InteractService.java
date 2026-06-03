package com.studyhelper.api.service;

import com.studyhelper.api.domain.Domain;
import com.studyhelper.api.domain.Intent;
import com.studyhelper.api.dto.InteractAction;
import com.studyhelper.api.dto.InteractRequest;
import com.studyhelper.api.dto.InteractResponse;
import com.studyhelper.api.dto.ResourceMatchResult;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class InteractService {

    private static final Map<String, String> GENERIC_ANSWERS = Map.of(
        "EXPLAIN_CONCEPT",      "Explicação sobre o tema solicitado. Em breve gerada por IA com contexto do seu domínio.",
        "GENERATE_STUDY_PLAN",  "Plano de estudos criado para o tema. Acesse /planejar-estudos para personalizar.",
        "SIMULATE_INTERVIEW",   "Iniciando simulação de entrevista técnica. Responda com calma e mostre seu raciocínio.",
        "REVIEW_ANSWER",        "Análise da sua resposta preparada. Foque nos pontos de melhoria identificados.",
        "OPEN_RESOURCE",        "Abrindo recurso solicitado.",
        "COMPARE_CONCEPTS",     "Comparação entre os conceitos solicitados. Analise diferenças e casos de uso.",
        "UNKNOWN",              "Não entendi. Tente: 'explique X', 'quero estudar X', 'simula entrevista de X', 'compara X e Y'."
    );

    private final IntentClassifierService classifier;
    private final InteractActionResolverService resolver;
    private final ResourceResolverService resourceResolver;

    public InteractService(IntentClassifierService classifier,
                           InteractActionResolverService resolver,
                           ResourceResolverService resourceResolver) {
        this.classifier = classifier;
        this.resolver = resolver;
        this.resourceResolver = resourceResolver;
    }

    public InteractResponse processText(InteractRequest request) {
        Domain domain  = Domain.from(request.domain());
        Intent intent  = classifier.classify(request.input());
        ResourceMatchResult match = resourceResolver.resolve(request.input(), domain, intent);
        String answer  = buildAnswer(intent, match);
        InteractAction action = resolver.resolve(request.input(), domain, intent);

        return new InteractResponse(
            request.input(),
            intent.name(),
            domain.name().toLowerCase(),
            answer,
            action
        );
    }

    private String buildAnswer(Intent intent, ResourceMatchResult match) {
        if (match.matched() && match.description() != null) {
            return "Encontrei " + match.title() + " no Study Helper. " + match.description();
        }
        return GENERIC_ANSWERS.getOrDefault(intent.name(), GENERIC_ANSWERS.get("UNKNOWN"));
    }
}
