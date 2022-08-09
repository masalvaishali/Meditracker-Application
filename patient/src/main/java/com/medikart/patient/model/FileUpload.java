package com.medikart.patient.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FileUpload {
    private String fileId;

    private String fileName;
    private String fileType;
    private LocalDate fileUploadTime;
    private byte[] fileContent;
}
