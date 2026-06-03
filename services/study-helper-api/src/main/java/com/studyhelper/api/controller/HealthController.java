package com.studyhelper.api.controller;

import com.studyhelper.api.dto.HealthResponse;
import com.studyhelper.api.dto.InfoResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class HealthController {

    @GetMapping("/health")
    public ResponseEntity<HealthResponse> health() {
        return ResponseEntity.ok(new HealthResponse(
            "UP",
            "study-helper-api",
            "0.0.1"
        ));
    }

    @GetMapping("/info")
    public ResponseEntity<InfoResponse> info() {
        return ResponseEntity.ok(new InfoResponse(
            "Study Helper API",
            "Backend do Study Helper — serviço Java Spring Boot de interação educacional",
            "0.0.1",
            List.of(
                "GET  /api/health",
                "GET  /api/info",
                "POST /api/interact/text"
            )
        ));
    }
}
