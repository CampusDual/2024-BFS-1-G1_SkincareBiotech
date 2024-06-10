package com.campusdual.cd2024bfs1g1.ws.core.rest;


import com.campusdual.cd2024bfs1g1.api.core.service.ISkinTypesService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/skinTypes")
public class SkinTypesRestController extends ORestController<ISkinTypesService> {

    @Autowired
    private ISkinTypesService skinTypesService;

    @Override
    public ISkinTypesService getService() {
        return this.skinTypesService;
    }
}