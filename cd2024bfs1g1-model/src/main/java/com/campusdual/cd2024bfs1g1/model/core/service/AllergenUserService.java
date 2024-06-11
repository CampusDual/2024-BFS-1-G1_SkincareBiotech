package com.campusdual.cd2024bfs1g1.model.core.service;

import com.campusdual.cd2024bfs1g1.api.core.service.IAllergenUserService;
import com.campusdual.cd2024bfs1g1.model.core.dao.AllergenUserDao;
import com.campusdual.cd2024bfs1g1.model.core.dao.UserProfileDao;
import com.campusdual.cd2024bfs1g1.model.core.utils.Utils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.dto.EntityResultMapImpl;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.util.HashMap;
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
    public EntityResult allergenUserQuery(Map<String, Object> keysValues, List<String> attributes) throws OntimizeJEERuntimeException, JsonProcessingException {
        int userId = Utils.getUserId();
        Map<String, Object> filter = new HashMap<>(keysValues);
        filter.put(UserProfileDao.USR_ID, userId);
        return this.daoHelper.query(this.allergenUserDao, filter, attributes);
    }

    @Override
    public EntityResult allergenUserInsert(Map<String, Object> attributes) throws OntimizeJEERuntimeException {
        try{
            int userId = Utils.getUserId();
            Map<String, Object> entity = new HashMap<>(attributes);
            entity.put(UserProfileDao.USR_ID, userId);
            return this.daoHelper.insert(this.allergenUserDao, entity);
        }catch (DuplicateKeyException | JsonProcessingException e){
            EntityResult result = new EntityResultMapImpl();
            result.setCode(EntityResult.OPERATION_WRONG);
            result.setMessage("ALLERGEN_IS_DUPLICATED");
            return result;
        }

    }

    @Override
    public EntityResult allergenUserDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.delete(this.allergenUserDao, keyMap);
    }
}
