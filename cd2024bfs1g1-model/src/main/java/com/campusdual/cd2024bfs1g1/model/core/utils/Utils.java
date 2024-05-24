package com.campusdual.cd2024bfs1g1.model.core.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDate;
import java.util.Map;

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

    public static String getUserRolName() throws JsonProcessingException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        ObjectMapper objectMapper = new ObjectMapper();
        String json = objectMapper.writeValueAsString(authentication.getAuthorities());
        JsonNode rootNode = objectMapper.readTree(json);
        String userRolName = rootNode.get(0).get("authority").asText();
        return userRolName;
    }

    public static String getUserDate(Object json) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();

        Map<String, Object> dateInfo = objectMapper.convertValue(json, new TypeReference<Map<String, Object>>(){});
        String year = String.valueOf(dateInfo.get("year"));
        System.out.println(year);
        String month = String.valueOf(dateInfo.get("month"));
        String day = String.valueOf(dateInfo.get("date"));

        String date = year + "-" + month + "-" + day;
        //LocalDate date = LocalDate.of(dateInfo.get("year"), dateInfo.get("month"), dateInfo.get("day"));
        System.out.println(date);
        return date;

    }
}
