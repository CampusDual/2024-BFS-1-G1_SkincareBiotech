package com.campusdual.cd2024bfs1g1.model.core.service;

import com.campusdual.cd2024bfs1g1.api.core.service.IOrderLinesService;
import com.campusdual.cd2024bfs1g1.model.core.dao.OrderLinesDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class OrderLinesService implements IOrderLinesService {

    @Autowired
    private OrderLinesDao orderLinesDao;
    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;

    @Override
    public EntityResult orderLinesQuery(Map<String, Object> keysValues, List<String> attributes) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.orderLinesDao, keysValues, attributes, OrderLinesDao.ATTR_ORD_QUERY);
    }

    @Override
    public EntityResult orderLinesInsert(Map<String, Object> attributes) throws OntimizeJEERuntimeException {
        return this.daoHelper.insert(this.orderLinesDao, attributes);

    }
}
