package com.volkswagen.internal_stackoverflow.service;

import com.volkswagen.internal_stackoverflow.dto.AnswerDto;
import com.volkswagen.internal_stackoverflow.dto.UserDto;
import com.volkswagen.internal_stackoverflow.entity.Answer;
import com.volkswagen.internal_stackoverflow.entity.Question;
import com.volkswagen.internal_stackoverflow.entity.User;
import com.volkswagen.internal_stackoverflow.exception.ResourceNotFoundException;
import com.volkswagen.internal_stackoverflow.repository.AnswerRepository;
import com.volkswagen.internal_stackoverflow.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class AnswerService {

    private final AnswerRepository answerRepository;
    private final UserRepository userRepository;

    public AnswerService(AnswerRepository answerRepository, UserRepository userRepository) {
        this.answerRepository = answerRepository;
        this.userRepository = userRepository;
    }

    public List<AnswerDto> findByQuestionId(Long questionId) {
        return answerRepository.findByQuestionId(questionId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public AnswerDto saveAnswer(AnswerDto answerDto) {
        Answer answer = convertToEntity(answerDto);
        setTimestamps(answer, true);
        answer.setTotalVoteCount(0);
        answer.setIsApproved(false);
        return convertToDto(answerRepository.save(answer));
    }

    public AnswerDto updateAnswerById(Long id, AnswerDto answerDto) {
        Answer answer = answerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Answer not found"));
        updateEntity(answerDto, answer);
        setTimestamps(answer, false);
        return convertToDto(answerRepository.save(answer));
    }

    public void deleteAnswerById(Long id) {
        answerRepository.deleteById(id);
    }

    public AnswerDto approveAnswerById(Long id) {
        Answer answer = answerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Answer not found"));
        answer.setIsApproved(true);
        setTimestamps(answer, false);
        return convertToDto(answerRepository.save(answer));
    }

    // Helper Methods
    private void setTimestamps(Answer answer, boolean isNew) {
        LocalDateTime now = LocalDateTime.now();
        if (isNew) {
            answer.setCreatedAt(now);
        }
        answer.setUpdatedAt(now);
    }

    private AnswerDto convertToDto(Answer answer) {
        AnswerDto dto = new AnswerDto();
        dto.setId(answer.getId());
        dto.setContent(answer.getContent());
        dto.setQuestionId(answer.getQuestion().getId());
        dto.setTotalVoteCount(answer.getTotalVoteCount());
        dto.setIsApproved(answer.getIsApproved());

        if (answer.getUser() != null) {
            dto.setUserId(answer.getUser().getId());
        }
        return dto;
    }

    private Answer convertToEntity(AnswerDto dto) {
        Answer answer = new Answer();
        answer.setContent(dto.getContent());
        answer.setQuestion(mapQuestionToEntity(dto.getQuestionId()));
        if(dto.getUserId() != null){
            User postedUser = userRepository.findById(dto.getUserId()).orElseThrow(()
                    -> new ResourceNotFoundException("User not found"));
            answer.setUser(postedUser);
        }

        return answer;
    }

    private void updateEntity(AnswerDto dto, Answer answer) {
        answer.setContent(dto.getContent());
        if (dto.getQuestionId() != null) {
            answer.setQuestion(mapQuestionToEntity(dto.getQuestionId()));
        }
    }

    private UserDto mapUserToDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());
        userDto.setEmail(user.getEmail());
        userDto.setRewardPoints(user.getRewardPoints());
        userDto.setCreatedAt(user.getCreatedAt());
        userDto.setUpdatedAt(user.getUpdatedAt());
        return userDto;
    }

    private User mapDtoToUser(UserDto userDto) {
        User user = new User();
        user.setId(userDto.getId());
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setRewardPoints(userDto.getRewardPoints());
        user.setCreatedAt(userDto.getCreatedAt());
        user.setUpdatedAt(userDto.getUpdatedAt());
        return user;
    }
    private Question mapQuestionToEntity(Long questionId) {
        if (questionId == null) return null;
        Question question = new Question();
        question.setId(questionId);
        return question;
    }
}
