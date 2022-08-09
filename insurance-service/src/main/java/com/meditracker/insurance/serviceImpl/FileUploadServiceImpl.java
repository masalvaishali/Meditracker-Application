package com.meditracker.insurance.serviceImpl;

import com.meditracker.insurance.model.FileUpload;
import com.meditracker.insurance.model.Insurance;
import com.meditracker.insurance.repository.FileRepository;
import com.meditracker.insurance.repository.InsuranceRepo;
import com.meditracker.insurance.service.FileUploadService;
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
    InsuranceRepo insuranceRepo;

    @Override
    public void saveFile(MultipartFile multipartFile, Long insuranceId) {
        String fileName=multipartFile.getOriginalFilename();
        String fileType= multipartFile.getContentType();
        Insurance insurance=insuranceRepo.findByInsuranceId(insuranceId);
        System.err.println(insurance);
        try{
            FileUpload file=fileRepository.save(new FileUpload(fileName,fileType,LocalDate.now(),multipartFile.getBytes()));
            System.err.println(file.getFileId());
            insurance.setInsuranceDocId(file.getFileId());
            insuranceRepo.save(insurance);
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
