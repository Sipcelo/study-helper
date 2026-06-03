package com.studyhelper.api.dto;

public record InteractResponse(
    String transcript,
    String intent,
    String domain,
    String answer,
    InteractAction action
) {}
