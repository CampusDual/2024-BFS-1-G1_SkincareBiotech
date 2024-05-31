package com.campusdual.cd2024bfs1g1.ws.core.rest;

import com.campusdual.cd2024bfs1g1.api.core.service.IUserGenderService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user-genders")
public class UserGenderRestController extends ORestController<IUserGenderService> {
    private IUserGenderService userGenderService;

    @Override
    public IUserGenderService getService() {
        return this.userGenderService;
    }
}
