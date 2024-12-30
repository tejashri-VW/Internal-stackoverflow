package com.volkswagen.internal_stackoverflow.controller;

import com.volkswagen.internal_stackoverflow.entity.Answer;
import com.volkswagen.internal_stackoverflow.entity.Question;
import com.volkswagen.internal_stackoverflow.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/answers")
public class AnswerController {

    @Autowired
    private AnswerService answerService;

    // POST /answers/{questionId} - Create a new answer for a particular question
    @PostMapping("/{questionId}")
    public ResponseEntity<Answer> createAnswer(@PathVariable Long questionId, @RequestBody Answer answer) {
        answer.setQuestion(new Question());
        answer.getQuestion().setId(questionId);
        return ResponseEntity.status(201).body(answerService.createAnswer(answer));
    }

    // PUT /answers/{id} - Edit an existing answer
    @PutMapping("/{id}")
    public ResponseEntity<Answer> updateAnswer(@PathVariable Long id, @RequestBody Answer answer) {
        answer.setId(id); // Ensure the ID is passed correctly
        return ResponseEntity.ok(answerService.createAnswer(answer));
    }

    // DELETE /answers/{id} - Delete an answer
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnswer(@PathVariable Long id) {
        answerService.deleteAnswer(id);
        return ResponseEntity.noContent().build();
    }

    // POST /answers/{id}/approve - Approve an answer
    @PostMapping("/{id}/approve")
    public ResponseEntity<Answer> approveAnswer(@PathVariable Long id) {
        return ResponseEntity.ok(answerService.approveAnswer(id));
    }

    // GET /answers/{question_id} - Get all the answers for a particular question
    @GetMapping("/{question_id}")
    public List<Answer> getAnswersForQuestion(@PathVariable Long question_id) {
        return answerService.getAnswersForQuestion(question_id);
    }
}
