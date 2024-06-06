package com.campusdual.cd2024bfs1g1.model.core.service;

import com.campusdual.cd2024bfs1g1.api.core.service.IAllergenService;
import com.campusdual.cd2024bfs1g1.model.core.dao.AllergenDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
@Lazy
@Service("AllergenService")
public class AllergenService implements IAllergenService {

    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;

    @Autowired
    private AllergenDao allergenDao;

    @Override
    public EntityResult allergenQuery(Map<String, Object> keysValues, List<String> attributes) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.allergenDao, keysValues, attributes);
    }
}
