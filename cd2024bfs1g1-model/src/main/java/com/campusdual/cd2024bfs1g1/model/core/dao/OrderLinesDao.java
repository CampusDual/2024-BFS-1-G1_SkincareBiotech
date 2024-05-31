package com.campusdual.cd2024bfs1g1.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Repository(value="OrderLinesDao")
@Lazy
@ConfigurationFile(
        configurationFile = "dao/OrderLinesDao.xml",
        configurationFilePlaceholder = "dao/placeholders.properties"
)
public class OrderLinesDao extends OntimizeJdbcDaoSupport {

    public static final String ATTR_OL_ID = "OL_ID";
    public static final String ATTR_PRO_ID = "PRO_ID";
    public static final String ATTR_OL_UNITS = "OL_UNITS";
    public static final String ATTR_OL_PRICE = "OL_PRICE";
    public static final String ATTR_ORD_ID = "ORD_ID";
    public static final String ATTR_ORD_QUERY = "ORD_QUERY";
    public static final String ATTR_ORD_LINES_QUERY = "ORD_LINES";

}
