package com.meditracker.patient.record.serviceImpl;

import com.meditracker.patient.record.model.FileUpload;
import com.meditracker.patient.record.model.PatientRecord;
import com.meditracker.patient.record.repository.FileRepository;
import com.meditracker.patient.record.repository.PatientRecordRepository;
import com.meditracker.patient.record.service.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.time.LocalDate;

@Service
public class FileUploadServiceImpl implements FileUploadService {

    @Autowired
    FileRepository fileRepository;

    @Autowired
    PatientRecordRepository patientRecordRepository;

    @Override
    public void saveFile(MultipartFile multipartFile, Long recordId) {
        String fileName=multipartFile.getOriginalFilename();
        String fileType= multipartFile.getContentType();
        PatientRecord patientRecord=patientRecordRepository.getByRecordId(recordId);
        System.err.println(patientRecord);
        try{
            FileUpload file=fileRepository.save(new FileUpload(fileName,fileType,LocalDate.now(),multipartFile.getBytes()));
            System.err.println(file.getFileId());
            patientRecord.getFiles().add(file.getFileName()+":"+file.getFileId());
            patientRecordRepository.save(patientRecord);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    @Transactional
    public FileUpload findByFileId(String fileId) {
        return fileRepository.findByFileId(fileId);
    }
}
