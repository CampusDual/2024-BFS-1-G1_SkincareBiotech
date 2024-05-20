package com.campusdual.cd2024bfs1g1.api.core.service;

import java.util.List;
import java.util.Map;

import com.ontimize.jee.common.db.AdvancedEntityResult;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

public interface IUserAndRoleService {

	/**
	 * Users query.
	 *
	 * @param keysValues
	 *            the keys values
	 * @param attributes
	 *            the attributes
	 * @return the entity result
	 * @throws OntimizeJEERuntimeException
	 *             the ontimize jee exception
	 */
	EntityResult userQuery(Map<?, ?> keysValues, List<?> attributes) throws OntimizeJEERuntimeException;

	/**
	 * Users pagination query.
	 *
	 * @param keysValues
	 *            the keys values
	 * @param attributes
	 *            the attributes
	 * @param recordNumber
	 *            the records number
	 * @param startIndex
	 *            the start index
	 * @param orderBy
	 *            the order
	 * @return the entity result
	 * @throws OntimizeJEERuntimeException
	 *             the ontimize jee exception
	 */
	AdvancedEntityResult userPaginationQuery(Map<?, ?> keysValues, List<?> attributes, int recordNumber, int startIndex, List<?> orderBy);

	/**
	 * Users update.
	 *
	 * @param attributesValues
	 *            the attributes values
	 * @param keysValues
	 *            the keys values
	 * @return the entity result
	 * @throws OntimizeJEERuntimeException
	 *             the ontimize jee exception
	 */
	EntityResult userUpdate(Map<?, ?> attributesValues, Map<?, ?> keysValues) throws OntimizeJEERuntimeException;

	/**
	 * Users delete.
	 *
	 * @param keysValues
	 *            the keys values
	 * @return the entity result
	 * @throws OntimizeJEERuntimeException
	 *             the ontimize jee exception
	 */
	EntityResult userDelete(Map<?, ?> keysValues) throws OntimizeJEERuntimeException;

	/**
	 * Users insert.
	 *
	 * @param keysValues
	 *            the keys values
	 * @return the entity result
	 * @throws OntimizeJEERuntimeException
	 *             the ontimize jee exception
	 */

	EntityResult userInsert(Map<?, ?> keysValues) throws OntimizeJEERuntimeException;

	/**
	 * Login Users query.
	 *
	 * @param keysValues
	 *            the keys values
	 * @param attributes
	 *            the attributes
	 * @return the entity result
	 * @throws Exception
	 *             the exception
	 */

	EntityResult loginUserQuery(Map<?, ?> keysValues, List<?> attributes) throws OntimizeJEERuntimeException;

	/**
	 * Role query.
	 *
	 * @param keysValues
	 *            the keys values
	 * @param attributes
	 *            the attributes
	 * @return the entity result
	 * @throws Exception
	 *             the exception
	 */
	EntityResult roleQuery(Map<?, ?> keysValues, List<?> attributes) throws OntimizeJEERuntimeException;

	/**
	 * Roles pagination query.
	 *
	 * @param keysValues
	 *            the keys values
	 * @param attributes
	 *            the attributes
	 * @param recordNumber
	 *            the records number
	 * @param startIndex
	 *            the start index
	 * @param orderBy
	 *            the order
	 * @return the entity result
	 * @throws OntimizeJEERuntimeException
	 *             the ontimize jee exception
	 */
	AdvancedEntityResult rolePaginationQuery(Map<?, ?> keysValues, List<?> attributes, int recordNumber, int startIndex, List<?> orderBy);

	/**
	 * Role update.
	 *
	 * @param attributesValues
	 *            the attributes values
	 * @param keysValues
	 *            the keys values
	 * @return the entity result
	 * @throws Exception
	 *             the exception
	 */
	EntityResult roleUpdate(Map<?, ?> attributesValues, Map<?, ?> keysValues) throws OntimizeJEERuntimeException;

	/**
	 * Role delete.
	 *
	 * @param keysValues
	 *            the keys values
	 * @return the entity result
	 * @throws Exception
	 *             the exception
	 */
	EntityResult roleDelete(Map<?, ?> keysValues) throws OntimizeJEERuntimeException;

	/**
	 * Role insert.
	 *
	 * @param keysValues
	 *            the keys values
	 * @return the entity result
	 * @throws Exception
	 *             the exception
	 */
	EntityResult roleInsert(Map<?, ?> keysValues) throws OntimizeJEERuntimeException;

	/**
	 * User roles query.
	 *
	 * @param keysValues
	 *            the keys values
	 * @param attributes
	 *            the attributes
	 * @return the entity result
	 * @throws OntimizeJEERuntimeException
	 *             the ontimize jee exception
	 */
	EntityResult rolesForUserQuery(Map<?, ?> keysValues, List<?> attributes) throws OntimizeJEERuntimeException;

	/**
	 * User roles pagination query.
	 *
	 * @param keysValues
	 *            the keys values
	 * @param attributes
	 *            the attributes
	 * @param recordNumber
	 *            the records number
	 * @param startIndex
	 *            the start index
	 * @param orderBy
	 *            the order
	 * @return the entity result
	 * @throws OntimizeJEERuntimeException
	 *             the ontimize jee exception
	 */
	AdvancedEntityResult rolesForUserPaginationQuery(Map<?, ?> keysValues, List<?> attributes, int recordNumber, int startIndex, List<?> orderBy);

	/**
	 * User role update.
	 *
	 * @param attributesValues
	 *            the attributes values
	 * @param keysValues
	 *            the keys values
	 * @return the entity result
	 * @throws Exception
	 *             the exception
	 */
	EntityResult rolesForUserUpdate(Map<?, ?> attributesValues, Map<?, ?> keysValues) throws OntimizeJEERuntimeException;

	/**
	 * Server role query.
	 *
	 * @param keysValues
	 *            the keys values
	 * @param attributes
	 *            the attributes
	 * @return the entity result
	 * @throws Exception
	 *             the exception
	 */
	EntityResult serverRoleQuery(Map<?, ?> keysValues, List<?> attributes) throws OntimizeJEERuntimeException;

	/**
	 * Server role pagination query.
	 *
	 * @param keysValues
	 *            the keys values
	 * @param attributes
	 *            the attributes
	 * @param recordNumber
	 *            the records number
	 * @param startIndex
	 *            the start index
	 * @param orderBy
	 *            the order
	 * @return the entity result
	 * @throws OntimizeJEERuntimeException
	 *             the ontimize jee exception
	 */
	AdvancedEntityResult serverRolePaginationQuery(Map<?, ?> keysValues, List<?> attributes, int recordNumber, int startIndex, List<?> orderBy);

	/**
	 * Server role update.
	 *
	 * @param attributesValues
	 *            the attributes values
	 * @param keysValues
	 *            the keys values
	 * @return the entity result
	 * @throws Exception
	 *             the exception
	 */
	EntityResult serverRoleUpdate(Map<?, ?> attributesValues, Map<?, ?> keysValues) throws OntimizeJEERuntimeException;

	/**
	 * User password update.
	 *
	 * @param attributesValues
	 *            the attributes values
	 * @param keysValues
	 *            the keys values
	 * @return the entity result
	 * @throws Exception
	 *             the exception
	 */
	EntityResult passwordUpdate(Map<?, ?> attributesValues, Map<?, ?> keysValues) throws OntimizeJEERuntimeException;

	/**
	 * Profile query.
	 *
	 * @param keysValues
	 *            the keys values
	 * @param attributes
	 *            the attributes
	 * @return the entity result
	 * @throws OntimizeJEERuntimeException
	 *             the ontimize jee exception
	 */
	EntityResult profileQuery(Map<?, ?> keysValues, List<?> attributes) throws OntimizeJEERuntimeException;

	/**
	 * Profile update.
	 *
	 * @param attributesValues
	 *            the attributes values
	 * @param keysValues
	 *            the keys values
	 * @return the entity result
	 * @throws OntimizeJEERuntimeException
	 *             the ontimize jee exception
	 */
	EntityResult profileUpdate(Map<?, ?> attributesValues, Map<?, ?> keysValues) throws OntimizeJEERuntimeException;

	/**
	 * Password encrypt.
	 *
	 * @param password
	 *            the password
	 * @return the password
	 * @throws Exception
	 *             the exception
	 */
	String encryptPassword(String password) throws OntimizeJEERuntimeException;

    /**
     * Returns the client permissions
     *
     * @return the client permissions
     * @throws OntimizeJEERuntimeException if occurs
     */
	EntityResult getClientPermissions() throws OntimizeJEERuntimeException;

	EntityResult clientRoleInsert(Map<String, Object> attributes) throws OntimizeJEERuntimeException;
}
