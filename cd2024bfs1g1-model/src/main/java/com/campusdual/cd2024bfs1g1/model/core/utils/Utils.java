package com.campusdual.cd2024bfs1g1.model.core.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class Utils {

    public static int getUserId() throws JsonProcessingException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        ObjectMapper objectMapper = new ObjectMapper();
        String json = objectMapper.writeValueAsString(authentication.getPrincipal());
        JsonNode rootNode = objectMapper.readTree(json);
        JsonNode otherData = rootNode.path("otherData");
        int userId = otherData.path("usr_id").asInt();
        return userId;
    }
}
