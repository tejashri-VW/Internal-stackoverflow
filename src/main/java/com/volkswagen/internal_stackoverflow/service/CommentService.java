package com.volkswagen.internal_stackoverflow.service;

import com.volkswagen.internal_stackoverflow.entity.Comment;
import com.volkswagen.internal_stackoverflow.entity.Answer;  // Import the Answer entity
import com.volkswagen.internal_stackoverflow.repository.CommentRepository;
import com.volkswagen.internal_stackoverflow.repository.AnswerRepository;  // Import the Answer repository
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private AnswerRepository answerRepository;  // Inject AnswerRepository to retrieve the Answer entity

    // Add a comment to an answer
    public Comment addComment(Long answerId, Comment comment) {
        Answer answer = answerRepository.findById(answerId).orElseThrow(() -> new RuntimeException("Answer not found"));
        comment.setAnswer(answer);  // Set the actual Answer entity to the Comment
        return commentRepository.save(comment);
    }

    // Get all comments for a particular answer
    public List<Comment> getCommentsForAnswer(Long answerId) {
        return commentRepository.findByAnswerId(answerId);
    }

    // Edit a comment
    public Comment editComment(Long id, Comment comment) {
        comment.setId(id);
        return commentRepository.save(comment);
    }

    // Delete a comment
    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }
}
