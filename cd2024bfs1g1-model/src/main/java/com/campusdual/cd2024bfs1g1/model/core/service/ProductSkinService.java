package com.campusdual.cd2024bfs1g1.model.core.service;


import com.campusdual.cd2024bfs1g1.api.core.service.IProductSkinService;
import com.campusdual.cd2024bfs1g1.api.core.service.ISkinTypesService;
import com.campusdual.cd2024bfs1g1.model.core.dao.BilledAgeDao;
import com.campusdual.cd2024bfs1g1.model.core.dao.ProductSkinDao;
import com.campusdual.cd2024bfs1g1.model.core.dao.SkinTypesDao;
import com.campusdual.cd2024bfs1g1.model.core.utils.Utils;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.dto.EntityResultMapImpl;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;


import java.util.Arrays;
import java.util.HashMap;
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
        try{
            return this.daoHelper.insert(this.productSkinDao, attrMap);
        } catch (DuplicateKeyException e){
            EntityResult er = new EntityResultMapImpl();
            er.setCode(EntityResult.OPERATION_WRONG);
            er.setMessage("ERROR_DUP_SKIN");
            return er;
        }

    }
    
    @Override
    public EntityResult productSkinUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap)
            throws OntimizeJEERuntimeException {
        return this.daoHelper.update(this.productSkinDao, attrMap, keyMap);
    }

    @Override
    public EntityResult productSkinDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.delete(this.productSkinDao, keyMap);
    }

}