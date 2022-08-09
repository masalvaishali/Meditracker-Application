package com.medikart.patient.repo;

import com.medikart.patient.entity.Recommendation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecommendationRepository extends JpaRepository<Recommendation,Long> {
    Recommendation findByCondition(String condition);
}
