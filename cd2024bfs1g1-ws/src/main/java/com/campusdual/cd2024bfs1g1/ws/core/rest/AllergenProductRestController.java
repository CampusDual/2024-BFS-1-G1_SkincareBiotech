package com.campusdual.cd2024bfs1g1.ws.core.rest;

import com.campusdual.cd2024bfs1g1.api.core.service.IAllergenProductService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/allergen-products")
public class AllergenProductRestController extends ORestController<IAllergenProductService> {

    @Autowired
    private IAllergenProductService iAllergenProductService;

    @Override
    public IAllergenProductService getService() {
        return this.iAllergenProductService;
    }
}