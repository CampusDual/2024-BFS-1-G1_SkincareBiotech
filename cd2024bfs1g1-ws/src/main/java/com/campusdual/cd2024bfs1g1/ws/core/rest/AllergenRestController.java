package com.campusdual.cd2024bfs1g1.ws.core.rest;

import com.campusdual.cd2024bfs1g1.api.core.service.IAllergenService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/allergens")
public class AllergenRestController extends ORestController<IAllergenService> {

    @Autowired
    private IAllergenService iAllergenService;


    @Override
    public IAllergenService getService() {
        return this.iAllergenService;
    }
}
