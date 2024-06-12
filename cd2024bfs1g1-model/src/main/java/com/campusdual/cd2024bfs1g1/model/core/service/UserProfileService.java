package com.campusdual.cd2024bfs1g1.model.core.service;

import com.campusdual.cd2024bfs1g1.api.core.service.IUserProfileService;
import com.campusdual.cd2024bfs1g1.model.core.dao.UserDao;
import com.campusdual.cd2024bfs1g1.model.core.dao.UserProfileDao;
import com.campusdual.cd2024bfs1g1.model.core.utils.Utils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.dto.EntityResultMapImpl;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Lazy
@Service("UserProfileService")
public class UserProfileService implements IUserProfileService {

    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;

    @Autowired
    private UserProfileDao userProfileDao;

    @Autowired
    private UserDao userDao;

    @Override
    public EntityResult userProfileQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException, JsonProcessingException {
        int userId = Utils.getUserId();
        Map<String, Object> orderMap = new HashMap<>(keyMap);
        orderMap.put(UserProfileDao.USR_ID, userId);
        return this.daoHelper.query(this.userProfileDao, orderMap, attrList);
    }

    @Override
    public EntityResult userProfileSkinQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException, JsonProcessingException {
        return this.daoHelper.query(this.userProfileDao, keyMap, attrList, UserProfileDao.QUERY_USER_PROFILE_SKIN);
    }

    @Override
    public EntityResult userProfileInsert(Map<String, Object> attributes) throws OntimizeJEERuntimeException {
        return this.daoHelper.insert(this.userProfileDao, attributes);
    }

    @Override
    public EntityResult userProfileUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException {

        Map<String, Object> user_data = new HashMap<>();
        Map<String, Object> profile_data = new HashMap<>();

        for (Map.Entry<String, Object> entry : attrMap.entrySet()) {
            if (entry.getKey().startsWith("USR")) {
                user_data.put(entry.getKey(), entry.getValue());
            } else {
                profile_data.put(entry.getKey(), entry.getValue());

            }
        }

        if (!user_data.isEmpty()) {
            EntityResult userupdate = this.daoHelper.update(this.userDao, user_data, keyMap);
        }

        if (!profile_data.isEmpty()) {
            EntityResult profileupdate = this.daoHelper.update(this.userProfileDao, profile_data, keyMap);
        }

        return new EntityResultMapImpl();

    }


}
