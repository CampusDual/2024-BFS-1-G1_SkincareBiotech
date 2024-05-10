package com.campusdual.cd2024bfs1g1.api.core.service;

import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

import java.util.List;
import java.util.Map;

public interface IBrandService {

    public EntityResult brandQuery(Map<String, Object> keysValues, List<String> attributes) throws OntimizeJEERuntimeException;

    public EntityResult brandInsert(Map<String, Object> attributes) throws OntimizeJEERuntimeException;

    EntityResult brandUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
}
