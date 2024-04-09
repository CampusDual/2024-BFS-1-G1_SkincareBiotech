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

	public static final String ROL_ID                 = "rol_id";
	public static final String ROL_NAME               = "rol_name";
	public static final String XML_CLIENT_PERMISSION  = "rol_xml_client_permission";
	public static final String JSON_CLIENT_PERMISSION = "rol_json_client_permission";
	public static final String NOTES                  = "rol_notes";

	public RoleDao() {
		super();
	}
}
