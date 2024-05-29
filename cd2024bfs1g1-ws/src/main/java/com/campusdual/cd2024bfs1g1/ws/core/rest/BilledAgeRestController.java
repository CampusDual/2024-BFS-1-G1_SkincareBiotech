package com.campusdual.cd2024bfs1g1.ws.core.rest;

import com.campusdual.cd2024bfs1g1.api.core.service.IBilledAgeService;
import com.campusdual.cd2024bfs1g1.api.core.service.IBrandService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/billed-ages")
public class BilledAgeRestController  extends ORestController<IBilledAgeService> {

    @Autowired
    private IBilledAgeService billedAgeService;

    @Override
    public IBilledAgeService getService() {
        return this.billedAgeService;
    }
}
