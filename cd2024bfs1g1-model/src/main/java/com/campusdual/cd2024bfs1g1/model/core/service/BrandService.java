package com.campusdual.cd2024bfs1g1.model.core.service;

import com.campusdual.cd2024bfs1g1.api.core.service.IBrandService;
import com.campusdual.cd2024bfs1g1.model.core.dao.BrandDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service("BrandService")
@Lazy
public class BrandService implements IBrandService {


    @Autowired
    private BrandDao brandDao;
    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;


    @Override
    public EntityResult brandQuery(Map<String, Object> keysValues, List<String> attributes) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.brandDao, keysValues, attributes);
    }

    @Override
    public EntityResult brandInsert(Map<String, Object> attributes) throws OntimizeJEERuntimeException {
        return this.daoHelper.insert(this.brandDao, attributes);
    }

    @Override
    public EntityResult brandUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap)
            throws OntimizeJEERuntimeException {
        return this.daoHelper.update(this.brandDao, attrMap, keyMap);
    }
}
