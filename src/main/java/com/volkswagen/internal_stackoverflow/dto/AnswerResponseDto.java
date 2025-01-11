package com.volkswagen.internal_stackoverflow.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class AnswerResponseDto {
   private QuestionDto question;
   private List<AnswerDto> answers;
}
