package com.volkswagen.internal_stackoverflow.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class AnswerDto {
    private Long id;
    private LocalDate dateAnswered;
    private String body;
    private int votes;
    private Long questionId;
    private Long userId;
    private String answeredBy;
    private List<CodeSnippetDTO> codeSnippets;
    private List<String> attachments;

    @Data
    public static class CodeSnippetDTO {
        private String language;
        private String code;
    }
}