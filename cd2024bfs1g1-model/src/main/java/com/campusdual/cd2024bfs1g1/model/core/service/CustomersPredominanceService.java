package com.campusdual.cd2024bfs1g1.model.core.service;

import com.campusdual.cd2024bfs1g1.api.core.service.ICustomersPredominanceService;
import com.campusdual.cd2024bfs1g1.model.core.dao.CustomersPredominanceDao;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Lazy
@Service("CustomersPredominanceService")
public class CustomersPredominanceService implements ICustomersPredominanceService {

    private static final Logger logger = LoggerFactory.getLogger(CustomersPredominanceService.class);

    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;

    @Autowired
    private CustomersPredominanceDao customersPredominanceDao;

    @Override
    public EntityResult customerAgeAndGenderQuery(Map<String, Object> keysValues, List<String> attributes) throws OntimizeJEERuntimeException, JsonProcessingException {
        Map<String, Object> filter = new HashMap<>(keysValues);
        try {
            return this.daoHelper.query(this.customersPredominanceDao, filter, attributes, "user_count_by_gender_and_age");
        } catch (Exception e) {
            logger.error("Error executing customerAgeAndGenderQuery", e);
            throw new OntimizeJEERuntimeException(e);
        }
    }
}
