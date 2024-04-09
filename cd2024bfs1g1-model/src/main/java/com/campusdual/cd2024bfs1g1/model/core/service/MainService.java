package com.campusdual.cd2024bfs1g1.model.core.service;

import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.campusdual.cd2024bfs1g1.api.core.service.IMainService;

@Service
public class MainService implements IMainService {
	private static final String HOST = "HOST";
	private static final String TLS = "TLS";

	private String mainUrl = null;

	@Override
	public String getMainUrl() {
		if (this.mainUrl == null) {
			final Map<String, String> env = System.getenv();
			final String host = env.get(HOST);
			final String tls = env.get(TLS);

			if (host == null) {
				this.mainUrl = ServletUriComponentsBuilder.fromCurrentContextPath().toUriString();
			} else {
				this.mainUrl = ((tls == null) ? "http://" : "https://") + host;
			}
		}

		return this.mainUrl;
	}
}
