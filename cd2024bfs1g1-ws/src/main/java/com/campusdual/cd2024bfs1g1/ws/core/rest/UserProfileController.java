package com.campusdual.cd2024bfs1g1.ws.core.rest;

import com.campusdual.cd2024bfs1g1.api.core.service.IUserProfileService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/profiles")
public class UserProfileController extends ORestController<IUserProfileService> {
    @Autowired
    private IUserProfileService userProfileService;

    @Override
    public IUserProfileService getService() {
        return this.userProfileService;
    }
}