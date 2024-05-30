package com.campusdual.cd2024bfs1g1.model.core.service;


import com.campusdual.cd2024bfs1g1.api.core.service.IProductSkinService;
import com.campusdual.cd2024bfs1g1.api.core.service.ISkinTypesService;
import com.campusdual.cd2024bfs1g1.model.core.dao.ProductSkinDao;
import com.campusdual.cd2024bfs1g1.model.core.dao.SkinTypesDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service("ProductSkinService")
@Lazy
public class ProductSkinService implements IProductSkinService {

    @Autowired
    private ProductSkinDao productSkinDao;
    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;

    @Override
    public EntityResult productSkinQuery(Map<String, Object> keyMap, List<String> attrList)
            throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.productSkinDao, keyMap, attrList);
    }

    @Override
    public EntityResult productSkinInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.insert(this.productSkinDao, attrMap);
    }


}