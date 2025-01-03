package com.volkswagen.internal_stackoverflow.controller;

import com.volkswagen.internal_stackoverflow.dto.AnswerDto;
import com.volkswagen.internal_stackoverflow.service.AnswerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/answers")
public class AnswerController {

    private final AnswerService answerService;

    public AnswerController(AnswerService answerService) {
        this.answerService = answerService;
    }

    @GetMapping("/question/{questionId}")
    public ResponseEntity<List<AnswerDto>> getAnswersByQuestion(@PathVariable Long questionId) {
        return ResponseEntity.ok(answerService.findByQuestionId(questionId));
    }

    @PostMapping
    public ResponseEntity<AnswerDto> createAnswer(@RequestBody AnswerDto answerDto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(answerService.saveAnswer(answerDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AnswerDto> updateAnswer(@PathVariable Long id, @RequestBody AnswerDto answerDto) {
        return ResponseEntity.ok(answerService.updateAnswerById(id, answerDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnswer(@PathVariable Long id) {
        answerService.deleteAnswerById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/approve")
    public ResponseEntity<AnswerDto> approveAnswer(@PathVariable Long id) {
        return ResponseEntity.ok(answerService.approveAnswerById(id));
    }
}
