package com.meditracker.patient.record.repository;

import com.meditracker.patient.record.model.FileUpload;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileRepository extends JpaRepository<FileUpload,String> {
    FileUpload findByFileId(String fileId);
}
