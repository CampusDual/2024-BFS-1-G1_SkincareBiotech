package com.campusdual.cd2024bfs1g1.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;


@Repository(value="ProductGenderDao")
@Lazy
@ConfigurationFile(
        configurationFile = "dao/ProductGenderDao.xml",
        configurationFilePlaceholder = "dao/placeholders.properties"
)
public class ProductGenderDao extends OntimizeJdbcDaoSupport{
    public static final String ATTR_PGE_ID = "PGE_ID";
    public static final String ATTR_PGE_NAME = "PGE_NAME";
}


