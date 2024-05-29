package com.campusdual.cd2024bfs1g1.model.core.service;

import com.campusdual.cd2024bfs1g1.api.core.service.IUserProfileService;
import com.campusdual.cd2024bfs1g1.model.core.dao.UserProfileDao;
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
@Service("UserProfileService")
public class UserProfileService implements IUserProfileService {

    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;

    @Autowired
    private UserProfileDao userProfileDao;

    @Override
    public EntityResult userProfileQuery(Map<String, Object> keysValues, List<String> attributes) throws OntimizeJEERuntimeException, JsonProcessingException {
        return this.daoHelper.query(this.userProfileDao, keysValues, attributes);
    }

    @Override
    public EntityResult userProfileInsert(Map<String, Object> attributes) throws OntimizeJEERuntimeException {
        return this.daoHelper.insert(this.userProfileDao, attributes);
    }
}