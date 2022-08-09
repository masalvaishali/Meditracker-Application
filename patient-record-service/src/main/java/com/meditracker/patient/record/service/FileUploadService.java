package com.meditracker.patient.record.service;

import com.meditracker.patient.record.model.FileUpload;
import org.springframework.web.multipart.MultipartFile;

public interface FileUploadService {
    void saveFile(MultipartFile multipartFile, Long recordId);

    FileUpload findByFileId(String fileId);
}
