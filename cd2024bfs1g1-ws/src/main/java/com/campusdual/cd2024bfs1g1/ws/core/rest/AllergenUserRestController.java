package com.campusdual.cd2024bfs1g1.ws.core.rest;

import com.campusdual.cd2024bfs1g1.api.core.service.IAllergenUserService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/allergen-users")
public class AllergenUserRestController extends ORestController<IAllergenUserService> {

    @Autowired
    private IAllergenUserService iAllergenUserService;

    @Override
    public IAllergenUserService getService() {
        return this.iAllergenUserService;
    }
}
