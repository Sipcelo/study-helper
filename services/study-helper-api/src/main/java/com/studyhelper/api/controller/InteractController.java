package com.studyhelper.api.controller;

import com.studyhelper.api.dto.InteractRequest;
import com.studyhelper.api.dto.InteractResponse;
import com.studyhelper.api.service.InteractService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/interact")
public class InteractController {

    private final InteractService interactService;

    public InteractController(InteractService interactService) {
        this.interactService = interactService;
    }

    @PostMapping("/text")
    public ResponseEntity<InteractResponse> processText(@Valid @RequestBody InteractRequest request) {
        return ResponseEntity.ok(interactService.processText(request));
    }
}
