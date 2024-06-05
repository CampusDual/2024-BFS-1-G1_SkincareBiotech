package com.campusdual.cd2024bfs1g1.api.core.service;

import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

import java.util.List;
import java.util.Map;

public interface ISaleService {
   EntityResult saleQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException;
   EntityResult saleInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException;
}
