package com.campusdual.cd2024bfs1g1.ws.core.rest;

import com.campusdual.cd2024bfs1g1.api.core.service.ICustomersPredominanceService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/customers-predominance")
public class CustomersPredominanceRestController  extends ORestController<ICustomersPredominanceService> {

    @Autowired
    private ICustomersPredominanceService customersPredominanceService;

    @Override
    public ICustomersPredominanceService getService() {
        return this.customersPredominanceService;
    }
}
