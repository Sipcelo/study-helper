package com.studyhelper.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record InteractRequest(
    @NotBlank(message = "O campo 'input' é obrigatório")
    @Size(min = 2, max = 500, message = "O input deve ter entre 2 e 500 caracteres")
    String input,

    String domain
) {}
