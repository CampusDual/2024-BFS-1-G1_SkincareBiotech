package com.campusdual.cd2024bfs1g1.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Repository(value="SkinTypeDao")
@Lazy
@ConfigurationFile(
        configurationFile = "dao/SkinTypesDao.xml",
        configurationFilePlaceholder = "dao/placeholders.properties"
)
public class SkinTypesDao extends OntimizeJdbcDaoSupport {

    public static final String SKIN_ID = "SKIN_ID";
    public static final String SKIN_NAME = "SKIN_NAME";

}
