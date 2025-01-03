package com.volkswagen.internal_stackoverflow.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class QuestionDto {
    private Long id;
    private String title;
    private String description;
    private Long userId;
    private List<String> tags;
}