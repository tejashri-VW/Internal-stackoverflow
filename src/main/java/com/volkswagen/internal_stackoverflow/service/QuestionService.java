package com.volkswagen.internal_stackoverflow.service;

import com.volkswagen.internal_stackoverflow.entity.Question;
import com.volkswagen.internal_stackoverflow.repository.QuestionRepository;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    // Create a new question
    public Question createQuestion(Question question) {
        return questionRepository.save(question);
    }

    // Get all questions with pagination
    public Page<Question> getAllQuestions(PageRequest pageRequest) {
        return questionRepository.findAll(pageRequest);
    }

    // Get questions by tag with pagination
    public Page<Question> getQuestionsByTag(String tag, PageRequest pageRequest) {
        return questionRepository.findByTagName(tag, pageRequest);  // Assuming this method queries by tag name
    }

    // Get question by id
    public Question getQuestionById(Long id) {
        return questionRepository.findById(id).orElseThrow(() -> new RuntimeException("Question not found"));
    }

    // Update an existing question
    public Question updateQuestion(Long id, Question question) {
        question.setId(id);
        return questionRepository.save(question);
    }

    // Delete a question
    public boolean deleteQuestion(Long id) {
        Optional<Question> question = questionRepository.findById(id);
        if (question.isPresent()) {
            questionRepository.deleteById(id); // Delete the question
            return true;  // Successfully deleted
        } else {
            return false;  // Question not found
        }
    }

}
