package com.volkswagen.internal_stackoverflow.controller;

import com.volkswagen.internal_stackoverflow.entity.Comment;
import com.volkswagen.internal_stackoverflow.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    // POST /comments/{answer_id} - Add a comment to an answer
    @PostMapping("/{answer_id}")
    public ResponseEntity<Comment> addComment(@PathVariable Long answer_id, @RequestBody Comment comment) {
        return ResponseEntity.status(201).body(commentService.addComment(answer_id, comment));
    }

    // PUT /comments/{id} - Edit an existing comment
    @PutMapping("/{id}")
    public ResponseEntity<Comment> editComment(@PathVariable Long id, @RequestBody Comment comment) {
        return ResponseEntity.ok(commentService.editComment(id, comment));
    }

    // GET /comments/{answer_id} - Get all comments for a particular answer
    @GetMapping("/{answer_id}")
    public List<Comment> getCommentsForAnswer(@PathVariable Long answer_id) {
        return commentService.getCommentsForAnswer(answer_id);
    }

    // DELETE /comments/{id} - Delete a comment
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
        return ResponseEntity.noContent().build();
    }
}
