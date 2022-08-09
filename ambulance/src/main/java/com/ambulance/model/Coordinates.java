package com.ambulance.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import javax.persistence.Id;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class Coordinates {
    String latitude;
    String longitude;
}
