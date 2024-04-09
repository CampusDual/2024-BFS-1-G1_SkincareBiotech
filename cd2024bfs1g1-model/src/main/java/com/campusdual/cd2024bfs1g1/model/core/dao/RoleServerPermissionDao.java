package com.campusdual.cd2024bfs1g1.model.core.dao;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;

@Repository(value = "RoleServerPermissionDao")
@Lazy
@ConfigurationFile(configurationFile = "dao/RoleServerPermissionDao.xml", configurationFilePlaceholder = "dao/placeholders.properties")
public class RoleServerPermissionDao extends OntimizeJdbcDaoSupport {

	public static final String RSP_ID       = "rsp_id";
	public static final String ROL_ID       = "rol_id";
	public static final String SRP_ID       = "srp_id";
	public static final String ACTIVED      = "actived";

	public RoleServerPermissionDao() {
		super();
	}
}
