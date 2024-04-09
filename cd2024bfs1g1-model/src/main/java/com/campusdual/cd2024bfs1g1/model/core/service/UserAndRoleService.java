package com.campusdual.cd2024bfs1g1.model.core.service;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.campusdual.cd2024bfs1g1.api.core.service.IUserAndRoleService;
import com.campusdual.cd2024bfs1g1.model.core.dao.RoleDao;
import com.campusdual.cd2024bfs1g1.model.core.dao.RoleServerPermissionDao;
import com.campusdual.cd2024bfs1g1.model.core.dao.UserDao;
import com.campusdual.cd2024bfs1g1.model.core.dao.UserRoleDao;
import com.ontimize.jee.common.db.AdvancedEntityResult;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.dto.EntityResultMapImpl;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.common.security.PermissionsProviderSecured;
import com.ontimize.jee.common.services.user.UserInformation;
import com.ontimize.jee.common.util.remote.BytesBlock;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import com.ontimize.jee.server.security.SecurityTools;
import com.ontimize.jee.server.security.encrypt.IPasswordEncryptHelper;

@Lazy
@Service("UserAndRoleService")
public class UserAndRoleService implements IUserAndRoleService {

	/** The user dao. */
	@Autowired
	private UserDao userDao;
	/** The user roles dao. */
	@Autowired
	private UserRoleDao userRolesDao;
	/** The user dao. */
	@Autowired
	private RoleDao roleDao;

	/** The server role dao. */
	@Autowired
	private RoleServerPermissionDao roleServerPermissionDao;
	@Autowired
	private DefaultOntimizeDaoHelper daoHelper;

	@Autowired(required = false)
	private IPasswordEncryptHelper passwordEncrypter;

	/*
	 * (non-Javadoc)
	 */
	@Override
	@Secured({ PermissionsProviderSecured.SECURED })
	public EntityResult userQuery(final Map<?, ?> keysValues, final List<?> attributes) throws OntimizeJEERuntimeException {

		final EntityResult toRet = this.daoHelper.query(this.userDao, keysValues, attributes);
		if (toRet.containsKey(UserDao.PHOTO)) {
			final List<Object> photoCustomer = (List<Object>) toRet.get(UserDao.PHOTO);
			for (int i = 0; i < photoCustomer.size(); i++) {
				final Object o = photoCustomer.get(i);
				if (o instanceof BytesBlock) {
					photoCustomer.set(i, ((BytesBlock) o).getBytes());
				}
			}
		}

		return toRet;
	}

	/*
	 * (non-Javadoc)
	 */
	@Override
	@Secured({ PermissionsProviderSecured.SECURED })
	public AdvancedEntityResult userPaginationQuery(Map<?, ?> keysValues, List<?> attributes, int recordNumber, int startIndex, List<?> orderBy)
			throws OntimizeJEERuntimeException {
		return this.daoHelper.paginationQuery(this.userDao, keysValues, attributes, recordNumber, startIndex, orderBy);
	}

	/*
	 * (non-Javadoc)
	 */
	@Override
	@Secured({ PermissionsProviderSecured.SECURED })
	@Transactional(rollbackFor = Throwable.class)
	public EntityResult userUpdate(final Map<?, ?> attributesValues, final Map<?, ?> keysValues) throws OntimizeJEERuntimeException {
		try {
			return this.daoHelper.update(this.userDao, this.encryptPassword(attributesValues), keysValues);
		} finally {
			this.invalidateSecurityManager();
		}
	}

	/*
	 * (non-Javadoc)
	 */
	@Override
	@Secured({ PermissionsProviderSecured.SECURED })
	@Transactional(rollbackFor = Throwable.class)
	public EntityResult userDelete(final Map<?, ?> keysValues) throws OntimizeJEERuntimeException {
		try {
			return this.daoHelper.delete(this.userDao, keysValues);
		} finally {
			this.invalidateSecurityManager();
		}
	}

	/*
	 * (non-Javadoc)
	 */
	@Override
	@Secured({ PermissionsProviderSecured.SECURED })
	@Transactional(rollbackFor = Throwable.class)
	public EntityResult userInsert(final Map<?, ?> keysValues) throws OntimizeJEERuntimeException {
		return this.daoHelper.insert(this.userDao, this.encryptPassword(keysValues));
	}

	/*
	 * (non-Javadoc)
	 */
	@Override
	@Secured({ PermissionsProviderSecured.SECURED })
	public EntityResult roleQuery(final Map<?, ?> keysValues, final List<?> attributes) throws OntimizeJEERuntimeException {
		return this.daoHelper.query(this.roleDao, keysValues, attributes);
	}

	/*
	 * (non-Javadoc)
	 */
	@Override
	@Secured({ PermissionsProviderSecured.SECURED })
	public AdvancedEntityResult rolePaginationQuery(Map<?, ?> keysValues, List<?> attributes, int recordNumber, int startIndex, List<?> orderBy)
			throws OntimizeJEERuntimeException {
		return this.daoHelper.paginationQuery(this.roleDao, keysValues, attributes, recordNumber, startIndex, orderBy);
	}

	/*
	 * (non-Javadoc)
	 */
	@Override
	@Secured({ PermissionsProviderSecured.SECURED })
	@Transactional(rollbackFor = Throwable.class)
	public EntityResult roleUpdate(final Map<?, ?> attributesValues, final Map<?, ?> keysValues) throws OntimizeJEERuntimeException {
		try {
			return this.daoHelper.update(this.roleDao, attributesValues, keysValues);
		} finally {
			this.invalidateSecurityManager();
		}
	}

	/*
	 * (non-Javadoc)
	 */
	@Override
	@Secured({ PermissionsProviderSecured.SECURED })
	@Transactional(rollbackFor = Throwable.class)
	public EntityResult roleDelete(final Map<?, ?> keysValues) throws OntimizeJEERuntimeException {
		try {
			this.roleServerPermissionDao.unsafeDelete(keysValues);
			return this.daoHelper.delete(this.roleDao, keysValues);
		} finally {
			this.invalidateSecurityManager();
		}
	}

	/*
	 * (non-Javadoc)
	 */
	@Override
	@Secured({ PermissionsProviderSecured.SECURED })
	@Transactional(rollbackFor = Throwable.class)
	public EntityResult roleInsert(final Map<?, ?> keysValues) throws OntimizeJEERuntimeException {
		try {
			return this.daoHelper.insert(this.roleDao, keysValues);
		} finally {
			this.invalidateSecurityManager();
		}
	}

	/*
	 * (non-Javadoc)
	 */
	@Override
	@Secured({ PermissionsProviderSecured.SECURED })
	public EntityResult serverRoleQuery(final Map<?, ?> keysValues, final List<?> attributes) throws OntimizeJEERuntimeException {
		return this.daoHelper.query(this.roleServerPermissionDao, keysValues, attributes, "fullRolesWithServerPermissions");
	}

	/*
	 * (non-Javadoc)
	 */
	@Override
	@Secured({ PermissionsProviderSecured.SECURED })
	public AdvancedEntityResult serverRolePaginationQuery(Map<?, ?> keysValues, List<?> attributes, int recordNumber, int startIndex, List<?> orderBy)
			throws OntimizeJEERuntimeException {
		return this.daoHelper.paginationQuery(this.roleServerPermissionDao, keysValues, attributes, recordNumber, startIndex, orderBy, "fullRolesWithServerPermissions");
	}

	/*
	 * (non-Javadoc)
	 */
	@Override
	@Secured({ PermissionsProviderSecured.SECURED })
	@Transactional(rollbackFor = Throwable.class)
	public EntityResult serverRoleUpdate(final Map<?, ?> attributesValues, final Map<?, ?> keysValues) throws OntimizeJEERuntimeException {
		try {
			if ("S".equals(attributesValues.get(RoleServerPermissionDao.ACTIVED))) {
				// insert
				final Map<String, Object> valuesToInsert = new HashMap<>();
				valuesToInsert.put(RoleServerPermissionDao.ROL_ID, keysValues.get(RoleServerPermissionDao.ROL_ID));
				valuesToInsert.put(RoleServerPermissionDao.SRP_ID, keysValues.get(RoleServerPermissionDao.SRP_ID));
				return this.daoHelper.insert(this.roleServerPermissionDao, valuesToInsert);
			} else if (keysValues.get(RoleServerPermissionDao.RSP_ID) != null) {
				// delete
				final Map<String, Object> valuesToDelete = new HashMap<>();
				valuesToDelete.put(RoleServerPermissionDao.RSP_ID, keysValues.get(RoleServerPermissionDao.RSP_ID));
				return this.daoHelper.delete(this.roleServerPermissionDao, valuesToDelete);
			}
			return new EntityResultMapImpl();
		} finally {
			this.invalidateSecurityManager();
		}
	}

	@Override
	@Secured({ PermissionsProviderSecured.SECURED })
	@Transactional(rollbackFor = Throwable.class)
	public EntityResult rolesForUserQuery(final Map<?, ?> keysValues, final List<?> attributes) throws OntimizeJEERuntimeException {
		return this.daoHelper.query(this.userRolesDao, keysValues, attributes, "fullRolesWithUser");
	}

	/*
	 * (non-Javadoc)
	 */
	@Override
	@Secured({ PermissionsProviderSecured.SECURED })
	public AdvancedEntityResult rolesForUserPaginationQuery(Map<?, ?> keysValues, List<?> attributes, int recordNumber, int startIndex, List<?> orderBy)
			throws OntimizeJEERuntimeException {
		return this.daoHelper.paginationQuery(this.userRolesDao, keysValues, attributes, recordNumber, startIndex, orderBy, "fullRolesWithUser");
	}

	/*
	 * (non-Javadoc)
	 */

	@Override
	@Secured({ PermissionsProviderSecured.SECURED })
	@Transactional(rollbackFor = Throwable.class)
	public EntityResult rolesForUserUpdate(final Map<?, ?> attributesValues, final Map<?, ?> keysValues)
			throws OntimizeJEERuntimeException {
		try {
			if ("S".equals(attributesValues.get(UserRoleDao.ACTIVED))) {
				// insert
				final Map<String, Object> valuesToInsert = new HashMap<>();
				valuesToInsert.put(UserRoleDao.USR_ID, keysValues.get(UserRoleDao.USR_ID));
				valuesToInsert.put(UserRoleDao.ROL_ID, keysValues.get(UserRoleDao.ROL_ID));
				return this.daoHelper.insert(this.userRolesDao, valuesToInsert);
			} else if (keysValues.get(UserRoleDao.URO_ID) != null) {
				// delete
				final Map<String, Object> valuesToDelete = new HashMap<>();
				valuesToDelete.put(UserRoleDao.URO_ID, keysValues.get(UserRoleDao.URO_ID));
				return this.daoHelper.delete(this.userRolesDao, valuesToDelete);
			}
			return new EntityResultMapImpl();
		} finally {
			this.invalidateSecurityManager();
		}
	}

	@Override
	public String encryptPassword(final String password) throws OntimizeJEERuntimeException {
		if (this.passwordEncrypter != null) {
			return this.passwordEncrypter.encrypt(password);
		}
		return password;
	}

	/**
	 * Refresh security manager.
	 */
	private void invalidateSecurityManager() {
		SecurityTools.invalidateSecurityManager(this.daoHelper.getApplicationContext());
	}

	protected Map<String, Object> encryptPassword(final Map<?, ?> av) {
		final Map<String, Object> map = (Map<String, Object>) av;

		if (this.passwordEncrypter != null) {
			final String pass = (String) map.computeIfPresent(UserDao.PASSWORD,
					(key, value) -> value == null ? null : this.passwordEncrypter.encrypt((String) value));
			if (pass != null) {
				map.put(UserDao.PASSWORD, pass);
			}
		}
		return map;
	}

	@Override
	public EntityResult passwordUpdate(final Map<?, ?> attributesValues, final Map<?, ?> keysValues)
			throws OntimizeJEERuntimeException {
		final UserInformation userInfo = (UserInformation) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		final Map<String, Object> kvq = new HashMap<>();
		kvq.put(UserDao.LOGIN, userInfo.getUsername());
		final EntityResult oldPassword = this.daoHelper.query(userDao, kvq, List.of(UserDao.USR_ID, UserDao.PASSWORD));
		final Map<String, Object> r = oldPassword.getRecordValues(0);
		if (this.checkPasswords((String) r.get(UserDao.PASSWORD), (String) attributesValues.get(UserDao.OLD_PASSWORD))) {
			final Map<String, Object> newPassword = new HashMap<>();
			newPassword.put(UserDao.PASSWORD, this.encryptPassword((String) attributesValues.get(UserDao.NEW_PASSWORD)));
			final Map<String, Object> kvu = new HashMap<>();
			kvu.put(UserDao.USR_ID, r.get(UserDao.USR_ID));
			return this.daoHelper.update(userDao, newPassword, kvu);
		} else {
			final EntityResult error = new EntityResultMapImpl();
			error.setCode(EntityResult.OPERATION_WRONG);
			error.setMessage("The old password isn't correct!");
			return error;
		}
	}

	/*
	 * (non-Javadoc)
	 */
	@Override
	public EntityResult profileQuery(final Map<?, ?> keysValues, final List<?> attributes) throws OntimizeJEERuntimeException {
		final UserInformation userInfo = (UserInformation) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		final Map<String, Object> kv = new HashMap<>();
		kv.put(UserDao.LOGIN, userInfo.getUsername());
		final EntityResult toRet = this.daoHelper.query(this.userDao, kv, attributes);
		if (toRet.containsKey(UserDao.PHOTO)) {
			final List<Object> photoCustomer = (List<Object>) toRet.get(UserDao.PHOTO);
			for (int i = 0; i < photoCustomer.size(); i++) {
				final Object o = photoCustomer.get(i);
				if (o instanceof BytesBlock) {
					photoCustomer.set(i, ((BytesBlock) o).getBytes());
				}
			}
		}

		return toRet;
	}

	/*
	 * (non-Javadoc)
	 */
	@Override
	@Transactional(rollbackFor = Throwable.class)
	public EntityResult profileUpdate(final Map<?, ?> attributesValues, final Map<?, ?> keysValues) throws OntimizeJEERuntimeException {
		try {
			final UserInformation userInfo = (UserInformation) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			final Map<String, Object> kvq = new HashMap<>();
			kvq.put(UserDao.LOGIN, userInfo.getUsername());
			final EntityResult er = this.daoHelper.query(this.userDao, kvq, List.of(UserDao.USR_ID));
			final Map<String, Object> kvu = new HashMap<>();
			kvu.put(UserDao.USR_ID, er.getRecordValues(0).get(UserDao.USR_ID));
			return this.daoHelper.update(this.userDao, this.encryptPassword(attributesValues), kvu);
		} finally {
			this.invalidateSecurityManager();
		}
	}

	@Override
	public EntityResult loginUserQuery(final Map<?, ?> keysValues, final List<?> attributes) throws OntimizeJEERuntimeException {
		final UserInformation userInfo = (UserInformation) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		final EntityResult eR = new EntityResultMapImpl();
		final Map<String, Object> usrMap = new HashMap<>();

		for (final Object key : userInfo.getOtherData().keySet()) {
			if (userInfo.getOtherData().get(key) != null) {
				usrMap.put(String.valueOf(key), userInfo.getOtherData().get(key));
			}
		}
		eR.putAll(usrMap);
		return eR;
	}

	@Override
	public EntityResult getClientPermissions() {
		final Collection<GrantedAuthority> authorities = ((UserInformation) SecurityContextHolder.getContext().getAuthentication()
				.getPrincipal()).getAuthorities();
		if (authorities.isEmpty()) {
			return new EntityResultMapImpl();
		} else {
			final String userRole = authorities.iterator().next().getAuthority();
			return this.daoHelper.query(this.roleDao, new HashMap<>(Map.of(RoleDao.ROL_NAME, userRole)),
					List.of(RoleDao.JSON_CLIENT_PERMISSION));
		}
	}

	protected boolean checkPasswords(final String storedPassword, final String password) throws OntimizeJEERuntimeException {
		if (this.passwordEncrypter == null) {
			return (password != null && storedPassword.equals(password));
		} else {
			try {
				this.passwordEncrypter.checkPasswords(storedPassword, password);
				return true;
			} catch (final Exception e) {
				return false;
			}
		}
	}
}
