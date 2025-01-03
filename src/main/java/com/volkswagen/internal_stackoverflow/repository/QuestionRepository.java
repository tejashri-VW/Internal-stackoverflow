package com.volkswagen.internal_stackoverflow.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.volkswagen.internal_stackoverflow.entity.Question;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

    // Find questions by title containing a keyword
    Page<Question> findByTitleContaining(String title, PageRequest pageRequest);

    // Find questions by tag name
    Page<Question> findByTagsName(String tagName, Pageable pageable);

    // Find questions by title containing a keyword and a tag
    Page<Question> findByTitleContainingAndTagsName(String title, String tag, PageRequest pageRequest);
}
