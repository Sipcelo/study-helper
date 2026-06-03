package com.studyhelper.api.dto;

public record ResourceMatchResult(
    boolean matched,
    String resourceId,
    String title,
    String targetPath,
    double confidence,
    String reason,
    String description
) {
    public static ResourceMatchResult noMatch() {
        return new ResourceMatchResult(false, null, null, null, 0.0, "no match found", null);
    }
}
