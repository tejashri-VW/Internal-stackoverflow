package com.volkswagen.internal_stackoverflow.repository;

import com.volkswagen.internal_stackoverflow.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Long> {
    Tag findByName(String name);
}
