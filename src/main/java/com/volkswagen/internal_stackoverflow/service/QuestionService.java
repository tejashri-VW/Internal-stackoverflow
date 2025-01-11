package com.volkswagen.internal_stackoverflow.service;

import com.volkswagen.internal_stackoverflow.dto.QuestionDto;
import com.volkswagen.internal_stackoverflow.dto.UserDto;
import com.volkswagen.internal_stackoverflow.entity.Question;
import com.volkswagen.internal_stackoverflow.entity.Tag;
import com.volkswagen.internal_stackoverflow.entity.User;
import com.volkswagen.internal_stackoverflow.exception.ResourceNotFoundException;
import com.volkswagen.internal_stackoverflow.repository.QuestionRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.volkswagen.internal_stackoverflow.repository.TagRepository;
import com.volkswagen.internal_stackoverflow.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final TagRepository tagRepository;
    private final UserRepository userRepository;

    public QuestionService(QuestionRepository questionRepository, TagRepository tagRepository, UserRepository userRepository) {
        this.questionRepository = questionRepository;
        this.tagRepository = tagRepository;
        this.userRepository = userRepository;
    }

    public Page<QuestionDto> findAll(PageRequest pageRequest) {
        return questionRepository.findAll(pageRequest).map(this::convertToDto);
    }

    public Page<QuestionDto> findByTag(String tagName, PageRequest pageRequest) {
        return questionRepository.findByTagsName(tagName, pageRequest).map(this::convertToDto);
    }

    public QuestionDto findById(Long id) {
        return questionRepository.findById(id)
                .map(this::convertToDto)
                .orElseThrow(() -> new ResourceNotFoundException("Question not found"));
    }

    @Transactional
    public QuestionDto create(QuestionDto questionDto) throws Exception {
        Question question = convertToEntity(questionDto);
        question.setCreatedAt(LocalDateTime.now());
        question.setUpdatedAt(LocalDateTime.now());
        return convertToDto(questionRepository.save(question));
    }

    @Transactional
    public QuestionDto update(Long id, QuestionDto questionDto) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Question not found"));
        updateEntity(questionDto, question);
        question.setUpdatedAt(LocalDateTime.now());
        return convertToDto(questionRepository.save(question));
    }

    @Transactional
    public void delete(Long id) {
        questionRepository.deleteById(id);
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

    private Question convertToEntity(QuestionDto dto) throws Exception {
        Question question = new Question();
        question.setTitle(dto.getTitle());
        question.setDescription(dto.getDescription());

        if (dto.getUserId() != null) {
            //need to create userNotFoundException TODO:
            User userPosted = userRepository
                    .findById(dto.getUserId()).orElseThrow(() ->new Exception("User Not Found"));
            question.setUser(userPosted);
        }

        if (dto.getTags() != null) {
            List<Tag> tags = dto.getTags().stream()
                    .map(tagName -> tagRepository.findByName(tagName.getName())
                            .orElseGet(() -> {
                                Tag tag = new Tag();
                                tag.setName(tagName.getName());
                                return tagRepository.save(tag);
                            }))
                    .collect(Collectors.toList());
            question.setTags(tags);
        }

        return question;
    }

    private void updateEntity(QuestionDto dto, Question question) {
        question.setTitle(dto.getTitle());
        question.setDescription(dto.getDescription());

        if (dto.getTags() != null) {
            List<Tag> tags = dto.getTags().stream()
                    .map(tagName -> tagRepository.findByName(tagName.getName())
                            .orElseGet(() -> {
                                Tag tag = new Tag();
                                tag.setName(tagName.getName());
                                return tagRepository.save(tag);
                            }))
                    .collect(Collectors.toList());
            question.setTags(tags);
        }
    }
}

