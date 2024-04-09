package com.campusdual.cd2024bfs1g1.ws.core.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.campusdual.cd2024bfs1g1.api.core.service.IMainService;

@RestController
public class MainRestController {
	private static final String ENV_JS = "(function (window) {\n" +
			"  window.__env = window.__env || {};\n" +
			"  // API url\n" +
			"  window.__env.apiUrl = '%API_URL%';\n" +
			"}(this));";

	@Autowired
	private IMainService mainService;

	@GetMapping(value = "/main", produces = MediaType.APPLICATION_JSON_VALUE)
	public String main() {
		return "index";
	}

	@GetMapping(value = "/app/env/env.js", produces = "application/javascript")
	public @ResponseBody String env() {
		return ENV_JS.replace("%API_URL%", this.mainService.getMainUrl() != null ? this.mainService.getMainUrl() : "");
	}
}
