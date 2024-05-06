package com.campusdual.cd2024bfs1g1.api.core.service;

import com.ontimize.jee.common.db.AdvancedEntityResult;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

import java.util.List;
import java.util.Map;

public interface IProductService {

    public EntityResult productQuery(Map<String, Object> keysValues, List<String> attributes) throws OntimizeJEERuntimeException;
    public EntityResult productInsert(Map<String, Object> attributes) throws OntimizeJEERuntimeException;
    public AdvancedEntityResult productPaginationQuery(Map<String, Object> keysValues, List<String> attributes, int recordNumber, int startIndex, List<?> orderBy);
    public EntityResult productUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
    public EntityResult productEnabledQuery(Map<String, Object> keysValues, List<String> attributes) throws OntimizeJEERuntimeException;
}
