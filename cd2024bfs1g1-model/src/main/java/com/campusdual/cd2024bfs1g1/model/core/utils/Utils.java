package com.campusdual.cd2024bfs1g1.model.core.utils;

import com.campusdual.cd2024bfs1g1.model.core.dao.BilledAgeDao;
import com.campusdual.cd2024bfs1g1.model.core.dao.SaleDao;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.dto.EntityResultMapImpl;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDate;
import java.util.Date;
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
        Map<String, Object> dateInfo = objectMapper.convertValue(json, new TypeReference<Map<String, Object>>() {
        });
        int year = (Integer) dateInfo.get("year");
        int month = (Integer) dateInfo.get("month") + 1;
        int day = (Integer) dateInfo.get("date");
        String formattedDate = String.format("%d-%02d-%02d", year, month, day);

        return formattedDate;
    }

    public static boolean isAgeRangeValid(int minAge, int maxAge, EntityResult existingRanges){
        int recordCount = existingRanges.calculateRecordNumber();

        for (int i=0; i < recordCount; i++) {

            int minRecord = (int) existingRanges.getRecordValues(i).get(BilledAgeDao.ATTR_MIN_AGE);
            int maxRecord  = (int) existingRanges.getRecordValues(i).get(BilledAgeDao.ATTR_MAX_AGE);

            if ( minAge >= minRecord && minAge <= maxRecord ||
                 minAge <= minRecord && maxAge >= maxRecord ||
                 maxAge >= minRecord && maxAge <= maxRecord  )
            {
                return false;
            }
        }
        return true;
    }

    public static boolean isDateRangeValid(long minAge, long maxAge, EntityResult existingRanges, int productId) {
        long recordCount = existingRanges.calculateRecordNumber();

        for (int i = 0; i < recordCount; i++) {
            if ((int) existingRanges.getRecordValues(i).get(SaleDao.ATTR_PRO_ID) == productId) {
                Date fechaInicio = (Date) existingRanges.getRecordValues(i).get(SaleDao.ATTR_SAL_IDATE);
                Date fechaFin = (Date) existingRanges.getRecordValues(i).get((SaleDao.ATTR_SAL_EDATE));

                long minRecord = fechaInicio.getTime();
                long maxRecord = fechaFin.getTime();

                if (minAge >= minRecord && minAge <= maxRecord ||
                        minAge <= minRecord && maxAge >= maxRecord ||
                        maxAge >= minRecord && maxAge <= maxRecord) {
                    return false;
                }
                return true;
            }
        }
        return false;
    }

}

