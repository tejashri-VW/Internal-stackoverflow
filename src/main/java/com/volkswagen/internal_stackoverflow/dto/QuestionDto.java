package com.volkswagen.internal_stackoverflow.dto;

import com.volkswagen.internal_stackoverflow.entity.Tag;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class QuestionDto {
    private Long id;
    private String title;
    private String description;
    private Long userId;
    private String userName;
    private LocalDateTime postedOn;
    private List<Tag> tags;
}