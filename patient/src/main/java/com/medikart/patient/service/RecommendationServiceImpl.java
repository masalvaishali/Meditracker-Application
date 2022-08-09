package com.medikart.patient.service;

import com.medikart.patient.entity.Recommendation;
import com.medikart.patient.repo.RecommendationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecommendationServiceImpl implements RecommendationService {

    @Autowired
    RecommendationRepository recommendationRepository;

    @Override
    public Recommendation save(Recommendation recommendation) {
        return recommendationRepository.save(recommendation);
    }

    @Override
    public Recommendation findByCondition(String condition) {
        return recommendationRepository.findByCondition(condition);
    }

    @Override
    public List<Recommendation> findAll() {
        return  recommendationRepository.findAll();
    }
}
