package com.campusdual.cd2024bfs1g1.api.core.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

import java.util.List;
import java.util.Map;

public interface IBilledAgeService {
    EntityResult billedAgeQuery(Map<String, Object> keysValues, List<String> attributes) throws OntimizeJEERuntimeException, JsonProcessingException;

    EntityResult billedAgeInsert(Map<String, Object> attributes) throws OntimizeJEERuntimeException;

    EntityResult billedAgeDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException;

    EntityResult billedAgeGenderChartQuery(Map<String, Object> keysValues, List<String> attributes)throws OntimizeJEERuntimeException, JsonProcessingException;

    EntityResult billedAgeChartQuery(Map<String, Object> keysValues, List<String> attributes)throws OntimizeJEERuntimeException, JsonProcessingException;

    EntityResult customerAgeGenderAndSkinQuery(Map<String, Object> keysValues, List<String> attributes) throws OntimizeJEERuntimeException;
}
