package com.campusdual.cd2024bfs1g1.model.core.dao;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;

@Repository(value="RoleDao")
@Lazy
@ConfigurationFile(
		configurationFile = "dao/RoleDao.xml",
		configurationFilePlaceholder = "dao/placeholders.properties"
		)
public class RoleDao extends OntimizeJdbcDaoSupport {

	public static final String ROL_ID                 = "ROL_ID";
	public static final String ROL_NAME               = "ROL_NAME";
	public static final String XML_CLIENT_PERMISSION  = "ROL_XML_CLIENT_PERMISSION";
	public static final String JSON_CLIENT_PERMISSION = "ROL_JSON_CLIENT_PERMISSION";
	public static final String NOTES                  = "ROL_NOTES";

	public RoleDao() {
		super();
	}
}
