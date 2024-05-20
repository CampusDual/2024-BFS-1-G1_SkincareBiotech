package com.campusdual.cd2024bfs1g1.api.core.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

import java.util.List;
import java.util.Map;

public interface IOrderService {

    EntityResult orderByUserQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException, JsonProcessingException;

    EntityResult orderInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException, JsonProcessingException, JsonProcessingException;

    EntityResult orderUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException;

    EntityResult orderDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException;

    EntityResult orderBySellerQuery(Map<String, Object> keysValues, List<String> attributes) throws OntimizeJEERuntimeException, JsonProcessingException;

    EntityResult totalPriceOrdersQuery(Map<String, Object> keysValues, List<String> attributes)throws OntimizeJEERuntimeException, JsonProcessingException;

}
