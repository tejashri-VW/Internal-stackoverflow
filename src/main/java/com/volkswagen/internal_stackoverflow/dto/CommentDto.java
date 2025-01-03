package com.volkswagen.internal_stackoverflow.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CommentDto {
    private Long id;
    private String content;
    private Long answerId;
    private UserDto user;
    private Integer totalVoteCount;
    private Boolean isApproved;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}