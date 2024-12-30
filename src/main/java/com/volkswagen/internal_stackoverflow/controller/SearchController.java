package com.volkswagen.internal_stackoverflow.controller;

import com.volkswagen.internal_stackoverflow.entity.Question;
import com.volkswagen.internal_stackoverflow.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/search")
public class SearchController {

    @Autowired
    private SearchService searchService;

    // GET /search - Search for questions based on keywords and tags
    @GetMapping
    public Page<Question> search(
            @RequestParam String keyword,
            @RequestParam(required = false) String tag,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        return searchService.searchQuestions(keyword, tag, PageRequest.of(page, size));
    }
}
