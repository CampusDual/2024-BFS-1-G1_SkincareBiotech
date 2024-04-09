package com.campusdual.cd2024bfs1g1.ws.core.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.campusdual.cd2024bfs1g1.api.core.service.IUserAndRoleService;
import com.campusdual.cd2024bfs1g1.openapi.core.service.IRoleApi;
import com.campusdual.cd2024bfs1g1.openapi.core.service.IServerRoleApi;
import com.campusdual.cd2024bfs1g1.openapi.core.service.IUserApi;
import com.campusdual.cd2024bfs1g1.openapi.core.service.IUserPasswordApi;
import com.campusdual.cd2024bfs1g1.openapi.core.service.IUserProfileApi;
import com.campusdual.cd2024bfs1g1.openapi.core.service.IUserRoleApi;
import com.campusdual.cd2024bfs1g1.openapi.core.service.IUsersApi;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.server.rest.ORestController;

@RestController
@RequestMapping("/users")
@ComponentScan(basePackageClasses={com.campusdual.cd2024bfs1g1.api.core.service.IUserAndRoleService.class})
public class UserRestController extends ORestController<IUserAndRoleService> 
		implements IUsersApi, IUserApi, IUserProfileApi, IUserPasswordApi, IRoleApi, IServerRoleApi, IUserRoleApi {

	@Autowired
	private IUserAndRoleService userSrv;

	@Override
	public IUserAndRoleService getService() {
		return this.userSrv;
	}

	@Override
	public ResponseEntity<EntityResult> login() {
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@Override
	public ResponseEntity<String> encryptPassword(final String password) {
		try {
			return new ResponseEntity<String>(this.userSrv.encryptPassword(password), HttpStatus.OK);
		} catch (final Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(super.getErrorMessage(e), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
