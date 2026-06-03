package com.studyhelper.api.dto;

public record HealthResponse(
    String status,
    String service,
    String version
) {}
