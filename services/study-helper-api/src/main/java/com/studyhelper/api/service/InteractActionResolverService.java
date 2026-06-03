package com.studyhelper.api.service;

import com.studyhelper.api.domain.ActionType;
import com.studyhelper.api.domain.Domain;
import com.studyhelper.api.domain.Intent;
import com.studyhelper.api.dto.InteractAction;
import com.studyhelper.api.dto.ResourceMatchResult;
import org.springframework.stereotype.Service;

@Service
public class InteractActionResolverService {

    private final ResourceResolverService resourceResolver;

    public InteractActionResolverService(ResourceResolverService resourceResolver) {
        this.resourceResolver = resourceResolver;
    }

    public InteractAction resolve(String input, Domain domain, Intent intent) {
        return switch (intent) {
            case GENERATE_STUDY_PLAN -> new InteractAction(ActionType.START_STUDY_PLAN.name(), "/planejar-estudos");
            case COMPARE_CONCEPTS    -> new InteractAction(ActionType.OPEN_RESOURCE.name(), resolveComparePath(domain));
            case UNKNOWN             -> new InteractAction(ActionType.NONE.name(), null);
            default                  -> resolveWithCatalog(input, domain, intent);
        };
    }

    private InteractAction resolveWithCatalog(String input, Domain domain, Intent intent) {
        ResourceMatchResult match = resourceResolver.resolve(input, domain, intent);
        ActionType actionType = toActionType(intent);
        if (match.matched()) {
            return new InteractAction(actionType.name(), match.targetPath());
        }
        return new InteractAction(actionType.name(), domainFallback(domain, intent));
    }

    private ActionType toActionType(Intent intent) {
        return switch (intent) {
            case EXPLAIN_CONCEPT, REVIEW_ANSWER -> ActionType.SHOW_EXPLANATION;
            case SIMULATE_INTERVIEW             -> ActionType.START_INTERVIEW;
            default                             -> ActionType.OPEN_RESOURCE;
        };
    }

    private String domainFallback(Domain domain, Intent intent) {
        if (intent == Intent.SIMULATE_INTERVIEW) return "/programacao/entrevista-java-junior";
        return domain.basePath();
    }

    private String resolveComparePath(Domain domain) {
        return domain == Domain.FINANCE ? "/ativos" : "/programacao";
    }
}
