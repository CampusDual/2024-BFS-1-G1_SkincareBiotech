package com.campusdual.cd2024bfs1g1.ws.core.rest;

import com.campusdual.cd2024bfs1g1.api.core.service.IOrderLinesService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/order-lines")
public class OrderLinesRestController extends ORestController<IOrderLinesService> {

    @Autowired
    private IOrderLinesService orderLinesService;


    @Override
    public IOrderLinesService getService() {
        return this.orderLinesService;
    }
}
