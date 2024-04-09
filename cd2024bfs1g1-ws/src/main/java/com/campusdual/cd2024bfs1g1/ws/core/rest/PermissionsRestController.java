package com.campusdual.cd2024bfs1g1.ws.core.rest;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.campusdual.cd2024bfs1g1.api.core.service.IUserAndRoleService;
import com.campusdual.cd2024bfs1g1.model.core.dao.RoleDao;
import com.campusdual.cd2024bfs1g1.openapi.core.service.IPermissionsApi;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.dto.EntityResultMapImpl;

@RestController
@ComponentScan(basePackageClasses={com.campusdual.cd2024bfs1g1.api.core.service.IUserAndRoleService.class})
public class PermissionsRestController implements IPermissionsApi {

	@Autowired
	private IUserAndRoleService userSrv;

	@Override
	public ResponseEntity<EntityResult> getClientPermissions() {
		try {
			final EntityResult er = new EntityResultMapImpl();
			EntityResult erPermissions = this.userSrv.getClientPermissions();
			if (erPermissions.calculateRecordNumber() > 0) {
				final HashMap<String, Object> permissions = new HashMap<>();
				permissions.put("permission", erPermissions.getRecordValues(0).get(RoleDao.JSON_CLIENT_PERMISSION));
				er.addRecord(permissions);
			}
			er.setCode(EntityResult.OPERATION_SUCCESSFUL);
			return new ResponseEntity<>(er, HttpStatus.OK);
		} catch (final Exception e) {
			e.printStackTrace();
			final EntityResult entityResult = new EntityResultMapImpl(EntityResult.OPERATION_WRONG,
					EntityResult.DATA_RESULT, e.getMessage());
			entityResult.setMessage(e.getMessage());
			return new ResponseEntity<>(entityResult, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
