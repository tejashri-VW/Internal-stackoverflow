package com.volkswagen.internal_stackoverflow.service;

import com.volkswagen.internal_stackoverflow.dto.QuestionDto;
import com.volkswagen.internal_stackoverflow.entity.Question;
import com.volkswagen.internal_stackoverflow.entity.Tag;
import com.volkswagen.internal_stackoverflow.repository.QuestionRepository;
import com.volkswagen.internal_stackoverflow.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class SearchService {

    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;

    public SearchService(QuestionRepository questionRepository, UserRepository userRepository) {
        this.questionRepository = questionRepository;
        this.userRepository = userRepository;
    }

    // Search questions based on keywords and tags
    public Page<QuestionDto> searchQuestions(String keyword, String tag, PageRequest pageRequest) {
        if (tag != null) {
            return questionRepository
                    .findByTitleContainingAndTagsName(keyword, tag, pageRequest)
                    .map(this::convertToDto);
        }
        return questionRepository.findByTitleContaining(keyword, pageRequest)
                .map(this::convertToDto);
    }

    private QuestionDto convertToDto(Question question) {
        QuestionDto dto = new QuestionDto();
        dto.setId(question.getId());
        dto.setTitle(question.getTitle());
        dto.setDescription(question.getDescription());
        dto.setPostedOn(question.getCreatedAt());

        if (question.getUser() != null) {
            dto.setUserId(question.getUser().getId());
            dto.setUserName(userRepository.findById(question.getUser().getId()).get().getUsername());
        }

        if (question.getTags() != null) {
            dto.setTags(question.getTags());
        }

        return dto;
    }
}
