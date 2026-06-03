package com.studyhelper.api.dto;

import java.util.List;

public record InfoResponse(
    String name,
    String description,
    String version,
    List<String> endpoints
) {}
