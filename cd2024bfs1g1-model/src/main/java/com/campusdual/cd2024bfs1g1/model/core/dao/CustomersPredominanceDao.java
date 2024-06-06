package com.campusdual.cd2024bfs1g1.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Repository(value="CustomersPredominanceDao")
@Lazy
@ConfigurationFile(
        configurationFile = "dao/CustomersPredominance.xml",
        configurationFilePlaceholder = "dao/placeholders.properties"
)
public class CustomersPredominanceDao extends OntimizeJdbcDaoSupport {
    public static final String ATTR_GBA_ID = "GBA_ID";
    public static final String ATTR_MIN_AGE = "GBA_MIN_AGE";
    public static final String ATTR_MAX_AGE = "GBA_MAX_AGE";
}
