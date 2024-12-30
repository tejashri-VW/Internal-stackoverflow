package com.volkswagen.internal_stackoverflow.repository;

import com.volkswagen.internal_stackoverflow.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {

    // Find answers by question ID
    List<Answer> findByQuestionId(Long questionId);
}
