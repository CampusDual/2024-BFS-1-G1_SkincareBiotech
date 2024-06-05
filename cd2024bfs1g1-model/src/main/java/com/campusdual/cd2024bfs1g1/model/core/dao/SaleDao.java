package com.campusdual.cd2024bfs1g1.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Repository(value="SaleDao")
@Lazy
@ConfigurationFile(
        configurationFile = "dao/SaleDao.xml",
        configurationFilePlaceholder = "dao/placeholders.properties"
)
public class SaleDao extends OntimizeJdbcDaoSupport {

    public static final String ATTR_SAL_ID = "SAL_ID";
    public static final String ATTR_SAL_PRICE = "SAL_PRICE";
    public static final String ATTR_SAL_INITIAL_DATE = "SAL_INITIAL_DATE";
    public static final String ATTR_SAL_END_DATE = "SAL_END_DATE";
    public static final String ATTR_PRO_ID = "PRO_ID";
    public static final String QUERY_PRO_SALE = "PRO_SALE";
}
