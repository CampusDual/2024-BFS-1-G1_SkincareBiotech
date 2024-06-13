package com.campusdual.cd2024bfs1g1.ws.core.rest;

import com.campusdual.cd2024bfs1g1.api.core.service.ICommissionService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/commissions")
public class CommissionRestController extends ORestController<ICommissionService> {

    @Autowired
    private ICommissionService commissionService;

    @Override
    public ICommissionService getService() {
        return this.commissionService;
    }
}
