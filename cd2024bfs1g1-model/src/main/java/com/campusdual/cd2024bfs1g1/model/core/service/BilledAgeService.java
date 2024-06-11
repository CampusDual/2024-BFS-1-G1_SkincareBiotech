package com.campusdual.cd2024bfs1g1.model.core.service;

import com.campusdual.cd2024bfs1g1.api.core.service.IBilledAgeService;
import com.campusdual.cd2024bfs1g1.model.core.dao.BilledAgeDao;
import com.campusdual.cd2024bfs1g1.model.core.utils.Utils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.dto.EntityResultMapImpl;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashMap;
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

        int minAge = (int) attributes.get("GBA_MIN_AGE");
        int maxAge = (int) attributes.get("GBA_MAX_AGE");

        if (minAge > maxAge) {
            EntityResult result = new EntityResultMapImpl();
            result.setCode(EntityResult.OPERATION_WRONG);
            result.setMessage("MIN_RANGE_HIGHER");
            return result;
        } else {
            Map<String, Object> queryKeys = new HashMap<>();
            List<String> queryAttributes = Arrays.asList(BilledAgeDao.ATTR_GBA_ID, BilledAgeDao.ATTR_MIN_AGE, BilledAgeDao.ATTR_MAX_AGE);

            EntityResult existingRanges = this.daoHelper.query(this.billedAgeDao, queryKeys, queryAttributes);

            if (!Utils.isAgeRangeValid(minAge, maxAge, existingRanges)) {
                EntityResult result = new EntityResultMapImpl();
                result.setCode(EntityResult.OPERATION_WRONG);
                result.setMessage("RANGE_NOT_VALID");
                return result;
            }
            return this.daoHelper.insert(this.billedAgeDao, attributes);
        }
    }


    @Override
    public EntityResult billedAgeDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.delete(this.billedAgeDao, keyMap);
    }

    @Override
    public EntityResult billedAgeGenderChartQuery(Map<String, Object> keysValues, List<String> attributes) throws OntimizeJEERuntimeException, JsonProcessingException {
        Map<String, Object> filter = new HashMap<>(keysValues);
        return this.daoHelper.query(this.billedAgeDao, filter, attributes, "billed_age");
    }

    @Override
    public EntityResult billedAgeChartQuery(Map<String, Object> keysValues, List<String> attributes) throws OntimizeJEERuntimeException, JsonProcessingException {
        Map<String, Object> filter = new HashMap<>(keysValues);
        return this.daoHelper.query(this.billedAgeDao, filter, attributes, "total_price");
    }

    @Override
    public EntityResult customerAgeAndGenderQuery(Map<String, Object> keysValues, List<String> attributes) throws OntimizeJEERuntimeException {
        Map<String, Object> filter = new HashMap<>(keysValues);
        return this.daoHelper.query(this.billedAgeDao, filter, attributes, "user_count_by_gender_and_age");
    }

    @Override
    public EntityResult customerAgeGenderAndSkinQuery(Map<String, Object> keysValues, List<String> attributes) throws OntimizeJEERuntimeException {
        Map<String, Object> filter = new HashMap<>(keysValues);
        return this.daoHelper.query(this.billedAgeDao, filter, attributes, "user_count_by_gender_age_skin");
    }

}
