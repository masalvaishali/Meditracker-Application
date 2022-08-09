package com.ambulance.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Ambulance
{
    @Id
    String ambulanceNo;
    String driverName;
    String driverContact;
    Boolean availability;
}
