package com.campusdual.cd2024bfs1g1.model.core;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;

@Configuration
@Lazy(value = false)
public class DatabaseConfiguration {

	@Value("${spring.datasource.jdbc-url}")
	private String jdbcUrl;

	@Value("${spring.datasource.username}")
	private String userName;

	@Value("${spring.datasource.password}")
	private String password;

	public String getJdbcUrl() {
		return jdbcUrl;
	}

	public String getUserName() {
		return userName;
	}

	public String getPassword() {
		return password;
	}
}
