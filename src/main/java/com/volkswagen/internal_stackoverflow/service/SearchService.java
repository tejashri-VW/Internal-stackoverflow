package com.volkswagen.internal_stackoverflow.service;

import com.volkswagen.internal_stackoverflow.entity.Question;
import com.volkswagen.internal_stackoverflow.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class SearchService {

    @Autowired
    private QuestionRepository questionRepository;

    // Search questions based on keywords and tags
    public Page<Question> searchQuestions(String keyword, String tag, PageRequest pageRequest) {
        if (tag != null) {
            return questionRepository.findByTitleContainingAndTagsName(keyword, tag, pageRequest);
        }
        return questionRepository.findByTitleContaining(keyword, pageRequest);
    }
}
