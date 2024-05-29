package com.campusdual.cd2024bfs1g1.api.core.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

import java.util.List;
import java.util.Map;

public interface IOrderLinesService {

    public EntityResult orderLinesQuery(Map<String, Object> keysValues, List<String> attributes) throws OntimizeJEERuntimeException, JsonProcessingException;
    public EntityResult orderLinesInsert(Map<String, Object> attributes) throws OntimizeJEERuntimeException;
    public EntityResult orderLinesProductQuery(Map<String, Object> keysValues, List<String> attributes) throws OntimizeJEERuntimeException, JsonProcessingException;
    public EntityResult orderLinesProductUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
}
