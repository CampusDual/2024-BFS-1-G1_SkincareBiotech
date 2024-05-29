package com.campusdual.cd2024bfs1g1.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Lazy
@Repository(value = "UserProfileDao")
@ConfigurationFile(
        configurationFile = "dao/UserProfileDao.xml",
        configurationFilePlaceholder = "dao/placeholders.properties")

public class UserProfileDao extends OntimizeJdbcDaoSupport {
    public static final String USR_ID = "USR_ID";
    public static final String UPR_BIRTHDATE = "UPR_BIRTHDATE";
}