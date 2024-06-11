package com.campusdual.cd2024bfs1g1.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Repository(value = "AllergenProductDao")
@Lazy
@ConfigurationFile(
        configurationFile = "dao/AllergenProductDao.xml",
        configurationFilePlaceholder = "dao/placeholders.properties"
)
public class AllergenProductDao extends OntimizeJdbcDaoSupport {

    public static final String ATTR_ALLER_ID = "ALLER_ID";
    public static final String ATTR_PRO_ID = "PRO_ID";

}
