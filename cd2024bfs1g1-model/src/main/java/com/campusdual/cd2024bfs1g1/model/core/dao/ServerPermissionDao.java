package com.campusdual.cd2024bfs1g1.model.core.dao;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;

@Repository(value = "ServerPermissionDao")
@Lazy
@ConfigurationFile(configurationFile = "dao/ServerPermissionDao.xml", configurationFilePlaceholder = "dao/placeholders.properties")
public class ServerPermissionDao extends OntimizeJdbcDaoSupport {

	public static final String SRP_ID       = "srp_id";
	public static final String SRP_NAME     = "srp_name";

	public ServerPermissionDao() {
		super();
	}
}
