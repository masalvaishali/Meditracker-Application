package com.meditracker.insurance.repository;

import com.meditracker.insurance.model.FileUpload;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileRepository extends JpaRepository<FileUpload,String> {
    FileUpload findByFileId(String fileId);
}
