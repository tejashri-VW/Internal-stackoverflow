package com.volkswagen.internal_stackoverflow.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserDto {
    private Long id;
    private String username;
    private String email;
    private Integer rewardPoints;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}