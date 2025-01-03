package com.volkswagen.internal_stackoverflow.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AnswerDto {
    private Long id;
    private String content;
    private Long questionId;
    private Long userId;
    private Integer totalVoteCount;
    private Boolean isApproved;
}