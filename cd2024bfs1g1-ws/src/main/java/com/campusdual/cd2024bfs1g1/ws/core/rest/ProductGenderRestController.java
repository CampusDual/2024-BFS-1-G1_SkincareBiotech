package com.campusdual.cd2024bfs1g1.ws.core.rest;

import com.campusdual.cd2024bfs1g1.api.core.service.IProductGenderService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("product-genders")
public class ProductGenderRestController extends ORestController<IProductGenderService> {
    @Autowired
    private IProductGenderService productGenderService;
    @Override
    public IProductGenderService getService(){
        return this.productGenderService;
    }
}
