package com.campusdual.cd2024bfs1g1.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Repository(value="BrandDao")
@Lazy
@ConfigurationFile(
        configurationFile = "dao/BrandDao.xml",
        configurationFilePlaceholder = "dao/placeholders.properties"
)
public class BrandDao extends OntimizeJdbcDaoSupport {

    public static final String ATTR_BRAND_ID = "BRA_ID";
    public static final String ATTR_BRAND_NAME = "BRA_NAME";
}
