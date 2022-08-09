package com.medikart.patient.service;

import com.medikart.patient.entity.Recommendation;

import java.util.List;

public interface RecommendationService {
    Recommendation save(Recommendation recommendation);

    Recommendation findByCondition(String condition);

    List<Recommendation> findAll();
}
