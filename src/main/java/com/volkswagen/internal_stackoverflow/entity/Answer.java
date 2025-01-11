package com.volkswagen.internal_stackoverflow.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "answers")
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate dateAnswered = LocalDate.now();

    @Lob
    @Column (name = "body", length = 512)
    private String body;
    private int votes;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn (name = "question_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    @ToString.Exclude
    private Question question;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn (name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    @ToString.Exclude
    private User user;

    @ElementCollection
    @CollectionTable(name = "code_snippets", joinColumns = @JoinColumn(name = "answer_id"))
    private List<CodeSnippet> codeSnippets;

    @ElementCollection
    private List<String> attachments;

    // Nested static class for code snippets
    @Embeddable
    @Data
    public static class CodeSnippet {
        private String language;
        @Column(length = 5000) // To handle long code snippets
        private String code;
    }
}
