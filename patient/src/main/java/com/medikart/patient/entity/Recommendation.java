package com.medikart.patient.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Recommendation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long recommendationId;
    @Column(unique = true)
    String condition;
    String exerciseRecommendation;
    String dietRecommendation;

}
