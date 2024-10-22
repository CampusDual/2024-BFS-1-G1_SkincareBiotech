package com.campusdual.cd2024bfs1g1.api.core.service;

import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

import java.util.List;
import java.util.Map;

public interface IAllergenProductService {

    EntityResult allergenProductQuery(Map<String, Object> keysValues, List<String> attributes) throws OntimizeJEERuntimeException;

    EntityResult allergenProductInsert(Map<String, Object> attributes) throws OntimizeJEERuntimeException;

    EntityResult allergenProductDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException;

    EntityResult getProductRecommendationsQuery(Map<String, Object> keysValues, List<String> attributes) throws OntimizeJEERuntimeException;
}
