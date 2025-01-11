package com.volkswagen.internal_stackoverflow.service;

import com.volkswagen.internal_stackoverflow.dto.AnswerDto;
import com.volkswagen.internal_stackoverflow.dto.AnswerResponseDto;
import com.volkswagen.internal_stackoverflow.dto.QuestionDto;
import com.volkswagen.internal_stackoverflow.dto.UserDto;
import com.volkswagen.internal_stackoverflow.entity.Answer;
import com.volkswagen.internal_stackoverflow.entity.Question;
import com.volkswagen.internal_stackoverflow.entity.User;
import com.volkswagen.internal_stackoverflow.exception.ResourceNotFoundException;
import com.volkswagen.internal_stackoverflow.repository.AnswerRepository;
import com.volkswagen.internal_stackoverflow.repository.QuestionRepository;
import com.volkswagen.internal_stackoverflow.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class AnswerService {

    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;

    public AnswerService(AnswerRepository answerRepository, QuestionRepository questionRepository, UserRepository userRepository) {
        this.answerRepository = answerRepository;
        this.questionRepository = questionRepository;
        this.userRepository = userRepository;
    }

    public AnswerResponseDto findByQuestionId(Long questionId) {
        // Fetch the answers by question ID
        List<Answer> answers = answerRepository.findByQuestionId(questionId);

        if (answers.isEmpty()) {
            QuestionDto questionDto = questionRepository.findById(questionId).map(this::mapToQuestionDto).get();
            // Return an empty map if no answers are found
            return AnswerResponseDto.builder().question(questionDto).answers(new ArrayList<>()).build();
        }

        // Map the first answer's question to QuestionDto
        QuestionDto questionDto = mapToQuestionDto(answers.get(0).getQuestion());

        // Map all answers to AnswerDto
        List<AnswerDto> answerDtoList = answers.stream()
                .map(this::mapToAnswerDto)
                .toList();

       return AnswerResponseDto.builder().question(questionDto).answers(answerDtoList).build();
    }

    public AnswerDto saveAnswer(AnswerDto answerDto) {
        Answer answer = mapToEntity(answerDto);
        Answer savedAnswer = answerRepository.save(answer);
        return mapToAnswerDto(savedAnswer);
    }

    public AnswerDto updateAnswerById(Long id, AnswerDto answerDto) {
//        Answer answer = answerRepository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Answer not found"));
//        updateEntity(answerDto, answer);
//        setTimestamps(answer, false);
//        return convertToDto(answerRepository.save(answer));
        return null;
    }

    public void deleteAnswerById(Long id) {
        answerRepository.deleteById(id);
    }

    public AnswerDto approveAnswerById(Long id) {
//        Answer answer = answerRepository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Answer not found"));
//        answer.setIsApproved(true);
//        setTimestamps(answer, false);
//        return convertToDto(answerRepository.save(answer));
        return null;
    }

    // Helper Methods
    private void setTimestamps(Answer answer, boolean isNew) {
//        LocalDateTime now = LocalDateTime.now();
//        if (isNew) {
//            answer.setCreatedAt(now);
//        }
//        answer.setUpdatedAt(now);
    }

    private Answer mapToEntity(AnswerDto dto) {
        Answer answer = new Answer();

        answer.setBody(dto.getBody());
        answer.setVotes(dto.getVotes());
        answer.setDateAnswered(dto.getDateAnswered() != null ? dto.getDateAnswered() : LocalDate.now());

        // Set question
        Optional<Question> questionOpt = questionRepository.findById(dto.getQuestionId());
        if (questionOpt.isPresent()) {
            answer.setQuestion(questionOpt.get());
        } else {
            throw new IllegalArgumentException("Invalid question ID: " + dto.getQuestionId());
        }

        // Set user
        Optional<User> userOpt = userRepository.findById(dto.getUserId());
        if (userOpt.isPresent()) {
            answer.setUser(userOpt.get());
        } else {
            throw new IllegalArgumentException("Invalid User: " + dto.getUserId());
        }

        // Set code snippets
        if (dto.getCodeSnippets() != null) {
            answer.setCodeSnippets(dto.getCodeSnippets().stream().map(snippetDTO -> {
                Answer.CodeSnippet snippet = new Answer.CodeSnippet();
                snippet.setLanguage(snippetDTO.getLanguage());
                snippet.setCode(snippetDTO.getCode());
                return snippet;
            }).collect(Collectors.toList()));
        }

        // Set attachments
        answer.setAttachments(dto.getAttachments());

        return answer;
    }

    private QuestionDto mapToQuestionDto(Question question) {
        QuestionDto questionDto = new QuestionDto();
        questionDto.setId(question.getId());
        questionDto.setTitle(question.getTitle());
        questionDto.setDescription(question.getDescription());
        questionDto.setTags(question.getTags());
        questionDto.setPostedOn(question.getCreatedAt());
        questionDto.setUserName(question.getUser().getUsername());
        questionDto.setUserId(question.getUser().getId());
        return questionDto;
    }

    private AnswerDto mapToAnswerDto(Answer answer) {
        AnswerDto dto = new AnswerDto();
        dto.setId(answer.getId());
        dto.setBody(answer.getBody());
        dto.setVotes(answer.getVotes());
        dto.setDateAnswered(answer.getDateAnswered());
        dto.setQuestionId(answer.getQuestion().getId());
        dto.setAnsweredBy(answer.getUser().getUsername());

        if (answer.getCodeSnippets() != null) {
            dto.setCodeSnippets(answer.getCodeSnippets().stream()
                    .map(snippet -> {
                        AnswerDto.CodeSnippetDTO snippetDTO = new AnswerDto.CodeSnippetDTO();
                        snippetDTO.setLanguage(snippet.getLanguage());
                        snippetDTO.setCode(snippet.getCode());
                        return snippetDTO;
                    })
                    .collect(Collectors.toList()));
        }

        dto.setAttachments(answer.getAttachments());
        return dto;
    }

//    private void updateEntity(AnswerDto dto, Answer answer) {
//        answer.setContent(dto.getContent());
//        if (dto.getQuestionId() != null) {
//            answer.setQuestion(mapQuestionToEntity(dto.getQuestionId()));
//        }
//    }

//    private UserDto mapUserToDto(User user) {
//        UserDto userDto = new UserDto();
//        userDto.setId(user.getId());
//        userDto.setUsername(user.getUsername());
//        userDto.setEmail(user.getEmail());
//        userDto.setRewardPoints(user.getRewardPoints());
//        userDto.setCreatedAt(user.getCreatedAt());
//        userDto.setUpdatedAt(user.getUpdatedAt());
//        return userDto;
//    }
//
//    private User mapDtoToUser(UserDto userDto) {
//        User user = new User();
//        user.setId(userDto.getId());
//        user.setUsername(userDto.getUsername());
//        user.setEmail(userDto.getEmail());
//        user.setRewardPoints(userDto.getRewardPoints());
//        user.setCreatedAt(userDto.getCreatedAt());
//        user.setUpdatedAt(userDto.getUpdatedAt());
//        return user;
//    }
//    private Question mapQuestionToEntity(Long questionId) {
//        if (questionId == null) return null;
//        Question question = new Question();
//        question.setId(questionId);
//        return question;
//    }
}
