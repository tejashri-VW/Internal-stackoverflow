package com.volkswagen.internal_stackoverflow.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.volkswagen.internal_stackoverflow.entity.Question;
import com.volkswagen.internal_stackoverflow.service.QuestionService;

@RestController
@RequestMapping("/api/questions")  // Adjusted to follow the pattern: /api/questions
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    // POST /api/questions - Create a new question
    @PostMapping
    public ResponseEntity<Question> createQuestion(@RequestBody Question question) {
        return ResponseEntity.status(201).body(questionService.createQuestion(question));
    }

    // GET /api/all-questions - Get a list of all questions with pagination and optional tag filtering
    @GetMapping("/all-questions")  // Modified to match the frontend's pattern
    public Page<Question> getAllQuestions(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "tag", required = false) String tag) {
        if (tag != null) {
            return questionService.getQuestionsByTag(tag, PageRequest.of(page, size));
        }
        return questionService.getAllQuestions(PageRequest.of(page, size));
    }

    // GET /api/questions/{id} - Get details of a specific question
    @GetMapping("/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable Long id) {
        Question question = questionService.getQuestionById(id);
        return question != null ? ResponseEntity.ok(question) : ResponseEntity.notFound().build();
    }

    // PUT /api/questions/{id} - Update an existing question
    @PutMapping("/{id}")
    public ResponseEntity<Question> updateQuestion(@PathVariable Long id, @RequestBody Question question) {
        Question updatedQuestion = questionService.updateQuestion(id, question);
        return updatedQuestion != null ? ResponseEntity.ok(updatedQuestion) : ResponseEntity.notFound().build();
    }

    // DELETE /api/questions/{id} - Delete a question
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        // Try to delete the question
        boolean exists = questionService.deleteQuestion(id);
        if (exists) {
            return ResponseEntity.noContent().build(); // Successfully deleted, return 204 No Content
        } else {
            return ResponseEntity.notFound().build(); // Question not found, return 404 Not Found
        }
    }

    // GET /api/questions/tags/{tag_id} - Get questions by tag_id (no change needed here if it stays as is)
    public Page<Question> getQuestionsByTag(
            @PathVariable String tag_id,  // Expect a Long for tag_id
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        return questionService.getQuestionsByTag(tag_id, PageRequest.of(page, size));
    }

}
