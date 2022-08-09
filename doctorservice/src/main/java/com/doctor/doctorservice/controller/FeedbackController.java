package com.doctor.doctorservice.controller;


import com.doctor.doctorservice.dto.DoctorDTO;
import com.doctor.doctorservice.dto.FeedbackDTO;
import com.doctor.doctorservice.model.Doctor;
import com.doctor.doctorservice.model.FeedbackCategory;
import com.doctor.doctorservice.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/feedback")
public class FeedbackController {

    @Autowired
    DoctorService doctorService;

    @PostMapping("")
    public ResponseEntity<?> submitFeedback(@RequestBody FeedbackDTO feedbackDTO) {
        try {
            int docId = feedbackDTO.getDoctorId();
            Doctor doctor = doctorService.getDoctorAllFields(docId);
            if (doctor == null)
                return new ResponseEntity<>("No doctor with doc ID: " + docId, HttpStatus.NOT_FOUND);
            List<FeedbackCategory> feedbackCategoryList = feedbackDTO.getFeedback();
            if (!feedbackCategoryList.isEmpty()) {
                BigDecimal cumulativeRating = BigDecimal.valueOf(0);
                BigDecimal tot_ratings = BigDecimal.valueOf(doctor.getTotalRatings());
                Map<String,BigDecimal> rating = doctor.getRating();
                BigDecimal currRatingForCategory = null;
                BigDecimal sumRating = BigDecimal.valueOf(0);
                for (FeedbackCategory feedbackCategory : feedbackCategoryList) {
                    try {
                        currRatingForCategory = rating.get(feedbackCategory.getName().replace(" ",""));
                    }catch(Exception ignore){}
                    if(currRatingForCategory==null) currRatingForCategory=BigDecimal.valueOf(0);
                    BigDecimal updatedRatingForCategory = ((currRatingForCategory.multiply(tot_ratings)).add(BigDecimal.valueOf(feedbackCategory.getValue()))).divide(tot_ratings.add(BigDecimal.valueOf(1)),2, RoundingMode.HALF_UP);
                    rating.put(feedbackCategory.getName().replace(" ",""), updatedRatingForCategory);
                    sumRating = sumRating.add(BigDecimal.valueOf(feedbackCategory.getValue()));
                }
                try{
                    cumulativeRating=rating.get("cumulativeRating");
                }catch(Exception ignore){}
                if(cumulativeRating==null) cumulativeRating=BigDecimal.valueOf(5);
                cumulativeRating=((cumulativeRating.multiply(tot_ratings)).add((sumRating).divide(BigDecimal.valueOf(feedbackCategoryList.size()),2, RoundingMode.HALF_UP))).divide(tot_ratings.add(BigDecimal.valueOf(1)),2, RoundingMode.HALF_UP);
                rating.put("cumulativeRating",cumulativeRating);
                //BigDecimal normailizedRating = ((rating.divide(BigDecimal.valueOf(feedbackCategoryList.size()),2, RoundingMode.HALF_UP)).add((curr_rating.multiply(tot_ratings)))).divide(tot_ratings.add(BigDecimal.valueOf(1)),2, RoundingMode.HALF_UP);
                //System.err.println(cumulativeRating);
                doctor.setRating(rating);
                tot_ratings=tot_ratings.add(BigDecimal.valueOf(1));
                doctor.setTotalRatings(tot_ratings.intValue());
                doctorService.saveDoctor(doctor);
                return new ResponseEntity<>("Feedback submitted successfully", HttpStatus.OK);
            }
            return new ResponseEntity<>("Invalid feedback", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(("Could not submit feedback"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
