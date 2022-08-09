package com.doctor.doctorservice.dto;

import com.doctor.doctorservice.model.FeedbackCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.ArrayList;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackDTO {
    int doctorId;
     List<FeedbackCategory> feedback = new ArrayList<>();
}
