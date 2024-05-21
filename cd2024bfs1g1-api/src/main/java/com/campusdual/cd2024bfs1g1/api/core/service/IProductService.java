package com.campusdual.cd2024bfs1g1.api.core.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ontimize.jee.common.db.AdvancedEntityResult;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public interface IProductService {

    public EntityResult productQuery(Map<String, Object> keysValues, List<String> attributes) throws OntimizeJEERuntimeException;

    public EntityResult productInsert(Map<String, Object> attributes) throws OntimizeJEERuntimeException, JsonProcessingException;

    public EntityResult productBySellerQuery(Map<String, Object> keysValues, List<String> attributes) throws OntimizeJEERuntimeException, JsonProcessingException;

    public AdvancedEntityResult productPaginationQuery(Map<String, Object> keysValues, List<String> attributes, int recordNumber, int startIndex, List<?> orderBy);

    public EntityResult productUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException;

    public EntityResult productEnabledQuery(Map<String, Object> keysValues, List<String> attributes) throws OntimizeJEERuntimeException;

    public BigDecimal getProductPriceById(Integer proId);

}