package com.volkswagen.internal_stackoverflow.initialData;

import com.volkswagen.internal_stackoverflow.entity.Answer;
import com.volkswagen.internal_stackoverflow.entity.Question;
import com.volkswagen.internal_stackoverflow.entity.Tag;
import com.volkswagen.internal_stackoverflow.entity.User;
import com.volkswagen.internal_stackoverflow.repository.AnswerRepository;
import com.volkswagen.internal_stackoverflow.repository.QuestionRepository;
import com.volkswagen.internal_stackoverflow.repository.TagRepository;
import com.volkswagen.internal_stackoverflow.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private TagRepository tagRepository;

    @Override
    @Transactional
    public void run(String... args) {
        // Initialize dummy users
        if (userRepository.count() == 0) {
            User user1 = new User();
            user1.setUsername("Aadil");
            user1.setEmail("john@example.com");
            user1.setRewardPoints(100);

            User user2 = new User();
            user2.setUsername("tejashri");
            user2.setEmail("jane@example.com");
            user2.setRewardPoints(200);

            userRepository.saveAll(Arrays.asList(user1, user2));
            System.out.println("Dummy users initialized.");
        } else {
            System.out.println("Users already exist.");
        }

        // Initialize dummy tags
        if (tagRepository.count() == 0) {
            Tag javaTag = new Tag();
            javaTag.setName("Java");

            Tag springTag = new Tag();
            springTag.setName("Spring");

            tagRepository.saveAll(Arrays.asList(javaTag, springTag));
            System.out.println("Dummy tags initialized.");
        } else {
            System.out.println("Tags already exist.");
        }

        // Fetch existing data for relationships
        User user = userRepository.findAll().get(0); // Get the first user
        List<Tag> tags = tagRepository.findAll();

        // Initialize dummy questions
        if (questionRepository.count() == 0) {
            Question question1 = new Question();
            question1.setTitle("What is Java?");
            question1.setDescription("Can someone explain what Java is?");
            question1.setUser(user);
            question1.setTags(tags);

            Question question2 = new Question();
            question2.setTitle("How does Spring Boot work?");
            question2.setDescription("Need help understanding Spring Boot basics.");
            question2.setUser(user);
            question2.setTags(tags);

            questionRepository.saveAll(Arrays.asList(question1, question2));
            System.out.println("Dummy questions initialized.");
        } else {
            System.out.println("Questions already exist.");
        }

        // Initialize dummy answers
        if (answerRepository.count() == 0) {
            List<Question> questions = questionRepository.findAll();

            Answer answer1 = new Answer();
            answer1.setBody("Java is a high-level programming language.");
            answer1.setVotes(5);
            answer1.setUser(user);
            answer1.setQuestion(questions.get(0));

            Answer answer2 = new Answer();
            answer2.setBody("Spring Boot simplifies Java application development.");
            answer2.setVotes(3);
            answer2.setUser(user);
            answer2.setQuestion(questions.get(1));

            answerRepository.saveAll(Arrays.asList(answer1, answer2));
            System.out.println("Dummy answers initialized.");
        } else {
            System.out.println("Answers already exist.");
        }
    }
}