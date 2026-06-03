package com.studyhelper.api.domain;

public enum Domain {
    PROGRAMMING,
    CAREER,
    FINANCE,
    STUDY,
    GENERAL;

    public static Domain from(String raw) {
        if (raw == null || raw.isBlank()) return GENERAL;
        return switch (raw.toLowerCase().trim()) {
            case "programming", "programacao", "programação" -> PROGRAMMING;
            case "career", "carreira" -> CAREER;
            case "finance", "financeiro", "financas", "finanças" -> FINANCE;
            case "study", "estudos" -> STUDY;
            default -> GENERAL;
        };
    }

    public String basePath() {
        return switch (this) {
            case PROGRAMMING -> "/programacao";
            case CAREER -> "/carreira";
            case FINANCE -> "/ativos";
            case STUDY -> "/planejar-estudos";
            case GENERAL -> "/programacao";
        };
    }
}
