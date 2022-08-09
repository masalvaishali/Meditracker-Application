package com.doctor.doctorservice;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class DoctorserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(DoctorserviceApplication.class, args);
	}

	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}
	@Bean
	@LoadBalanced
	RestTemplate getRestTemplate(){
		return new RestTemplate();
	}
}
