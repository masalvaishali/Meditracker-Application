package com.meditracker.insurance.service;

import com.meditracker.insurance.model.FileUpload;
import org.springframework.web.multipart.MultipartFile;

public interface FileUploadService {
    void saveFile(MultipartFile multipartFile, Long recordId);

    FileUpload findByFileId(String fileId);
}
