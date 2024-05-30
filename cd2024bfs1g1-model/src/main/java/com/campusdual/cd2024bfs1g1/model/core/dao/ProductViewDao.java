package com.campusdual.cd2024bfs1g1.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Lazy
@Repository(value="ProductViewDao")
@ConfigurationFile(
        configurationFile = "dao/ProductViewDao.xml",
        configurationFilePlaceholder = "dao/placeholders.properties")

public class ProductViewDao extends OntimizeJdbcDaoSupport {

    public static final String PROV_ID = "PROV_ID";
    public static final String PROV_UID = "PROV_UID";
    public static final String PRO_ID ="PRO_ID";
    public static final String PROV_DATE ="PROV_DATE";
    public static final String QUERY_PROV_VIEW_PRODUCT = "PROV_VIEW_PRODUCT";



}
