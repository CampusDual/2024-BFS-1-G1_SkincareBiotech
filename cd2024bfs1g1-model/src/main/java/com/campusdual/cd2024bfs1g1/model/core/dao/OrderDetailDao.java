package com.campusdual.cd2024bfs1g1.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Repository(value="OrderDetailDao")
@Lazy
@ConfigurationFile(
        configurationFile = "dao/OrderDetailDao.xml",
        configurationFilePlaceholder = "dao/placeholders.properties"
)
public class OrderDetailDao extends OntimizeJdbcDaoSupport {

    public static final String ATTR_OD_ID = "OD_ID";
    public static final String ATTR_PRO_ID = "PRO_ID";
    public static final String ATTR_OD_UNITS = "OD_UNITS";
}
