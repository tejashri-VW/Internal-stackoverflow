package com.volkswagen.internal_stackoverflow.controller;

import java.util.List;

import com.volkswagen.internal_stackoverflow.dto.QuestionDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.volkswagen.internal_stackoverflow.entity.Question;
import com.volkswagen.internal_stackoverflow.service.QuestionService;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @PostMapping
    public ResponseEntity<QuestionDto> createQuestion(@RequestBody QuestionDto questionDto) throws Exception {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(questionService.create(questionDto));
    }

    @GetMapping
    public ResponseEntity<Page<QuestionDto>> getAllQuestions(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String tag) {
        PageRequest pageRequest = PageRequest.of(page, size);
        Page<QuestionDto> questions = tag != null ?
                questionService.findByTag(tag, pageRequest) :
                questionService.findAll(pageRequest);
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuestionDto> getQuestion(@PathVariable Long id) {
        return ResponseEntity.ok(questionService.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<QuestionDto> updateQuestion(
            @PathVariable Long id,
            @RequestBody QuestionDto questionDto) {
        return ResponseEntity.ok(questionService.update(id, questionDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        questionService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
