package com.campusdual.cd2024bfs1g1.model.core.service;

import com.campusdual.cd2024bfs1g1.api.core.service.IAllergenUserService;
import com.campusdual.cd2024bfs1g1.model.core.dao.AllergenUserDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Lazy
@Service("AllergenUserService")
public class AllergenUserService implements IAllergenUserService {

    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;

    @Autowired
    private AllergenUserDao allergenUserDao;

    @Override
    public EntityResult allergenUserQuery(Map<String, Object> keysValues, List<String> attributes) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.allergenUserDao, keysValues, attributes, "overView");
    }

    @Override
    public EntityResult allergenUserInsert(Map<String, Object> attributes) throws OntimizeJEERuntimeException {
        return this.daoHelper.insert(this.allergenUserDao, attributes);
    }

}
