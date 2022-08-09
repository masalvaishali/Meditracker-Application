package com.meditracker.insurance.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FileUpload {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String fileId;

    private String fileName;
    private String fileType;
    private LocalDate fileUploadTime;

    @Lob
    private byte[] fileContent;

    public FileUpload(String fileName, String fileType, LocalDate fileUploadTime, byte[] fileContent) {
        this.fileName = fileName;
        this.fileType = fileType;
        this.fileUploadTime = fileUploadTime;
        this.fileContent = fileContent;
    }

}
