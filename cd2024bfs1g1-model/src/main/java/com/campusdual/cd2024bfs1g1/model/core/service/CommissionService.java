package com.campusdual.cd2024bfs1g1.model.core.service;


import com.campusdual.cd2024bfs1g1.api.core.service.ICommissionService;
import com.campusdual.cd2024bfs1g1.model.core.dao.CommissionDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import com.ontimize.jee.server.dao.IOntimizeDaoSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Lazy
@Service("CommissionService")
public class CommissionService implements ICommissionService {
    @Autowired
    private CommissionDao commissionDao;
    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;
    @Override
    public EntityResult commissionQuery(Map<String, Object> keysValues, List<String> attributes) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.commissionDao, keysValues, attributes);
    }

    @Override
    public EntityResult commissionInsert(Map<String, Object> attributes) throws OntimizeJEERuntimeException {
        return this.daoHelper.insert(this.commissionDao, attributes);
    }

    @Override
    public EntityResult commissionUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.update(this.commissionDao, attrMap, keyMap);
    }
}
