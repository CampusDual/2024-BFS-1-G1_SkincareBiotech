package com.campusdual.cd2024bfs1g1.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Repository(value="CommissionDao")
@Lazy
@ConfigurationFile(
        configurationFile = "dao/CommissionDao.xml",
        configurationFilePlaceholder = "dao/placeholders.properties"
)
public class CommissionDao extends OntimizeJdbcDaoSupport {
    public static final String ATTR_COM_ID = "COM_ID";
    public static final String ATTR_COM_NAME = "COM_NAME";
    public static final String ATTR_COM_VALUE = "COM_VALUE";
}
