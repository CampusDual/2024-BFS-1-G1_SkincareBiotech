package com.campusdual.cd2024bfs1g1.model.core.dao;


import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;


@Lazy
@Repository(value = "UserDao")
@ConfigurationFile(
	configurationFile = "dao/UserDao.xml",
	configurationFilePlaceholder = "dao/placeholders.properties")
public class UserDao extends OntimizeJdbcDaoSupport {

	public static final String USR_ID        = "USR_ID";
	public static final String LOGIN         = "USR_LOGIN";
	public static final String EMAIL         = "USR_EMAIL";
	public static final String PASSWORD      = "USR_PASSWORD";
	public static final String NAME          = "USR_NAME";
	public static final String SURNAME       = "USR_SURNAME";
	public static final String CREATION_DATE = "USR_CREATION_DATE";
	public static final String DOWN_DATE     = "USR_DOWN_DATE";
	public static final String PHOTO         = "USR_PHOTO";
	public static final String NOTES         = "USR_NOTES";
	public static final String PHONE         = "USR_PHONE";
	public static final String OLD_PASSWORD  = "OLD_PASSWORD";
	public static final String NEW_PASSWORD  = "NEW_PASSWORD";

}
