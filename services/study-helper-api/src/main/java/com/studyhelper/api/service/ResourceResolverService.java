package com.studyhelper.api.service;

import com.studyhelper.api.domain.Domain;
import com.studyhelper.api.domain.Intent;
import com.studyhelper.api.domain.ResourceEntry;
import com.studyhelper.api.dto.ResourceMatchResult;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResourceResolverService {

    private static final List<String> STRIP_PREFIXES = List.of(
        "me explica o que e o ", "me explica o que e a ", "me explica o que e ",
        "me explique o que e ", "o que e o ", "o que e a ", "o que sao os ", "o que sao as ",
        "o que sao ", "o que e ", "como funciona o ", "como funciona a ", "como funciona ",
        "me explica ", "me explique ", "explica ", "explique ",
        "me fala sobre ", "me conta sobre ", "define ", "definir ",
        "quero estudar ", "quero aprender ", "como aprender ", "como estudar ",
        "me ensina sobre ", "me ensina ", "ensina ",
        "simule entrevista de ", "simule entrevista ", "simula entrevista de ", "simula entrevista ",
        "simule ", "simula ",
        "treinar entrevista ", "preparar entrevista ",
        "me faca um quiz sobre ", "me faz um quiz sobre ", "quiz sobre ", "quiz de ",
        "comparar ", "compare ", "compara ",
        "buscar sobre ", "buscar ", "busque sobre ", "busque ",
        "procurar ", "treinar ", "praticar sobre ", "praticar "
    );

    private final ResourceCatalogService catalog;

    public ResourceResolverService(ResourceCatalogService catalog) {
        this.catalog = catalog;
    }

    public ResourceMatchResult resolve(String input, Domain domain, Intent intent) {
        if (input == null || input.isBlank()) return ResourceMatchResult.noMatch();
        if (intent == Intent.UNKNOWN || intent == Intent.COMPARE_CONCEPTS) return ResourceMatchResult.noMatch();

        String normalized = normalize(input);
        String stripped = stripIntentPrefixes(normalized);

        return findBestMatch(stripped);
    }

    private ResourceMatchResult findBestMatch(String stripped) {
        ResourceEntry bestEntry = null;
        String bestAlias = null;
        double bestConfidence = 0.0;

        for (ResourceEntry entry : catalog.all()) {
            for (String alias : entry.aliases()) {
                String normalizedAlias = normalize(alias);
                if (stripped.contains(normalizedAlias)) {
                    double confidence = (double) normalizedAlias.length() / Math.max(stripped.length(), 1);
                    if (confidence > bestConfidence) {
                        bestConfidence = confidence;
                        bestEntry = entry;
                        bestAlias = alias;
                    }
                }
            }
        }

        if (bestEntry == null) return ResourceMatchResult.noMatch();

        return new ResourceMatchResult(
            true,
            bestEntry.id(),
            bestEntry.title(),
            bestEntry.targetPath(),
            bestConfidence,
            "matched alias: " + bestAlias,
            bestEntry.description()
        );
    }

    private String stripIntentPrefixes(String normalized) {
        for (String prefix : STRIP_PREFIXES) {
            if (normalized.startsWith(prefix)) {
                String stripped = normalized.substring(prefix.length()).trim();
                if (!stripped.isBlank()) return stripped;
            }
        }
        return normalized;
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
