package com.campusdual.cd2024bfs1g1.model.core.service;

import com.campusdual.cd2024bfs1g1.api.core.service.IBilledAgeService;
import com.campusdual.cd2024bfs1g1.model.core.dao.BilledAgeDao;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Lazy
@Service("BilledAgeService")
public class BilledAgeService implements IBilledAgeService {

    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;

    @Autowired
    private BilledAgeDao billedAgeDao;

    @Override
    public EntityResult billedAgeQuery(Map<String, Object> keysValues, List<String> attributes) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.billedAgeDao, keysValues, attributes);
    }

    @Override
    public EntityResult billedAgeInsert(Map<String, Object> attributes) throws OntimizeJEERuntimeException {
        return this.daoHelper.insert(this.billedAgeDao, attributes);
    }

    @Override
    public EntityResult billedAgeUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.update(this.billedAgeDao, attrMap, keyMap);
    }

    @Override
    public EntityResult billedAgeDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.delete(this.billedAgeDao, keyMap);
    }

}
