package com.volkswagen.internal_stackoverflow.repository;

import com.volkswagen.internal_stackoverflow.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    // Find comments by answer ID
    List<Comment> findByAnswerId(Long answerId);
}
