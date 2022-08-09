package com.medikart.patient.controller;

import com.medikart.patient.entity.Recommendation;
import com.medikart.patient.service.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Locale;


@RestController
@RequestMapping("/recommendation")
public class DietExerciseRecommendationController {

    @Autowired
    RecommendationService recommedationService;

    @PostMapping("")
    public ResponseEntity<?> addDietExerciseRecommendation(@RequestBody Recommendation recommendation){
        recommendation.setCondition(recommendation.getCondition().toLowerCase());
        Recommendation newRecommendation=recommedationService.save(recommendation);
        if(newRecommendation==null)
            return new ResponseEntity<>("Could not save Recommendation", HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(newRecommendation,HttpStatus.OK);
    }

    @GetMapping("/condition/{condition}")
    public ResponseEntity<?> getRecommendations(@PathVariable("condition") String condition){
        Recommendation recommendation=recommedationService.findByCondition(condition.toLowerCase());
        if(recommendation==null)
            return new ResponseEntity<>("No Recommendations exist for the given conditon",HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(recommendation,HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<?> getRecommendationsList(){
        List<Recommendation> recommendations=recommedationService.findAll();
        if(recommendations==null)
            return new ResponseEntity<>("No Recommendations exist",HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(recommendations,HttpStatus.OK);
    }

}
