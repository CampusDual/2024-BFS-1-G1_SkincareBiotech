package com.campusdual.cd2024bfs1g1.ws.core.rest;

import com.campusdual.cd2024bfs1g1.api.core.service.IOrderDetailService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/order-detail")
public class OrderDetailRestController extends ORestController<IOrderDetailService> {

    @Autowired
    private IOrderDetailService orderDetailService;


    @Override
    public IOrderDetailService getService() {
        return this.orderDetailService;
    }
}
