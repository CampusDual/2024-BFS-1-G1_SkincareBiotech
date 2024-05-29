package com.campusdual.cd2024bfs1g1.model.core.service;

import com.campusdual.cd2024bfs1g1.api.core.service.ICategoryService;
import com.campusdual.cd2024bfs1g1.model.core.dao.CategoryDao;
import com.campusdual.cd2024bfs1g1.model.core.dao.OrderDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service("CategoryService")
@Lazy
public class CategoryService implements ICategoryService {

    @Autowired
    private CategoryDao categoryDao;

    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;

    @Override
    public EntityResult categoryQuery(Map<String, Object> keysValues, List<String> attributes) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.categoryDao, keysValues, attributes);
    }

    @Override
    public EntityResult categoryInsert(Map<String, Object> attributes) throws OntimizeJEERuntimeException {
        return this.daoHelper.insert(this.categoryDao, attributes);
    }

    @Override
    public EntityResult categoryUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap)
            throws OntimizeJEERuntimeException {
        return this.daoHelper.update(this.categoryDao, attrMap, keyMap);
    }
}
