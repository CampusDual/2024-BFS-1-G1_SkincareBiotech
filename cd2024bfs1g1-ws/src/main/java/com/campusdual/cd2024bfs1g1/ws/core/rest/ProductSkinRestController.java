package com.campusdual.cd2024bfs1g1.ws.core.rest;


import com.campusdual.cd2024bfs1g1.api.core.service.IProductSkinService;
import com.campusdual.cd2024bfs1g1.api.core.service.ISkinTypesService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/productsSkin")
public class ProductSkinRestController extends ORestController<IProductSkinService> {

    @Autowired
    private IProductSkinService productSkinService;

    @Override
    public IProductSkinService getService() {
        return this.productSkinService;
    }
}