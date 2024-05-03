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

    public static final String PRO_ID = "pro_id";
    public static final String PRO_NAME = "pro_name";
    public static final String PRO_DESCRIPTION = "pro_description";
    public static final String PRO_PRICE = "pro_price";
    public static final String PRO_IMAGE = "pro_image";
    public static final String PRO_ENABLED = "pro_enabled";

}
