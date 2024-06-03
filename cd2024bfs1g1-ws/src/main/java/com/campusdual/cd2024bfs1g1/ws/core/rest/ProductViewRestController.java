package com.campusdual.cd2024bfs1g1.ws.core.rest;

import com.campusdual.cd2024bfs1g1.api.core.service.IProductViewService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/productsView")

public class ProductViewRestController extends ORestController<IProductViewService> {

    @Autowired
    private IProductViewService productViewService;

    @Override
    public IProductViewService getService(){return this.productViewService;};
}
