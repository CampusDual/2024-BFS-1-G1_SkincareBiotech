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

	public static final String USR_ID        = "usr_id";
	public static final String LOGIN         = "usr_login";
	public static final String EMAIL         = "usr_email";
	public static final String PASSWORD      = "usr_password";
	public static final String NAME          = "usr_name";
	public static final String SURNAME       = "usr_surname";
	public static final String CREATION_DATE = "usr_creation_date";
	public static final String DOWN_DATE     = "usr_down_date";
	public static final String PHOTO         = "usr_photo";
	public static final String NOTES         = "usr_notes";
	public static final String PHONE         = "usr_phone";
	public static final String OLD_PASSWORD  = "old_password";
	public static final String NEW_PASSWORD  = "new_password";

}
