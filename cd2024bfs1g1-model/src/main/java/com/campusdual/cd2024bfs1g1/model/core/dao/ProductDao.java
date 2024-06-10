package com.campusdual.cd2024bfs1g1.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestMapping;

@Lazy
@Repository(value = "ProductDao")
@ConfigurationFile(
        configurationFile = "dao/ProductDao.xml",
        configurationFilePlaceholder = "dao/placeholders.properties")

public class ProductDao extends OntimizeJdbcDaoSupport {

    public static final String PRO_ID = "PRO_ID";
    public static final String PRO_NAME = "PRO_NAME";
    public static final String PRO_DESCRIPTION = "PRO_DESCRIPTION";
    public static final String PRO_PRICE = "PRO_PRICE";
    public static final String PRO_IMAGE = "PRO_IMAGE";
    public static final String PRO_ENABLED = "PRO_ENABLED";
    public static final String PRO_SALE = "PRO_SALE";
    public static final String PRO_SELLER_ID = "PRO_SELLER_ID";
    public static final String CAT_ID = "CAT_ID";
    public static final String QUERY_SALES_COUNT = "QUERY_SALES_COUNT";

}
