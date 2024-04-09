package com.campusdual.cd2024bfs1g1.model.core;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;

@Configuration
@Lazy(value = false)
public class EnvironmentConfiguration {

	@Value("${environment.profile}")
	private String profile;


	public String getProfile() {
		return profile;
	}


}
