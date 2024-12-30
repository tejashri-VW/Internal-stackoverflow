package com.volkswagen.internal_stackoverflow.service;

import com.volkswagen.internal_stackoverflow.entity.Answer;
import com.volkswagen.internal_stackoverflow.repository.AnswerRepository;
import com.volkswagen.internal_stackoverflow.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnswerService {

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private QuestionRepository questionRepository;

    // Create a new answer
    public Answer createAnswer(Answer answer) {
        return answerRepository.save(answer);
    }

    // Get all answers for a particular question
    public List<Answer> getAnswersForQuestion(Long questionId) {
        return answerRepository.findByQuestionId(questionId);
    }

    // Update an existing answer
    public Answer updateAnswer(Long id, Answer answer) {
        answer.setId(id);
        return answerRepository.save(answer);
    }

    // Delete an answer
    public void deleteAnswer(Long id) {
        answerRepository.deleteById(id);
    }

    // Approve an answer
    public Answer approveAnswer(Long id) {
        Answer answer = answerRepository.findById(id).orElseThrow(() -> new RuntimeException("Answer not found"));
        answer.setIsApproved(true);
        return answerRepository.save(answer);
    }
}
