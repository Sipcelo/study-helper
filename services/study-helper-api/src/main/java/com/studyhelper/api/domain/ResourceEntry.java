package com.studyhelper.api.domain;

import java.util.List;

public record ResourceEntry(
    String id,
    String title,
    List<String> aliases,
    Domain domain,
    ResourceType type,
    String targetPath,
    String description
) {}
