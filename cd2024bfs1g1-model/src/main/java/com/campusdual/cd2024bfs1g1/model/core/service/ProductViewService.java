package com.campusdual.cd2024bfs1g1.model.core.service;

import com.campusdual.cd2024bfs1g1.api.core.service.IProductViewService;
import com.campusdual.cd2024bfs1g1.model.core.dao.ProductViewDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Map;

@Lazy
@Service("ProductViewService")
public class ProductViewService implements IProductViewService {

    @Autowired
    private ProductViewDao productViewDao;

    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;

    @Override
    public EntityResult productViewQuery(Map<String, Object> keysValues, List<String> attributes) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.productViewDao,keysValues,attributes);
    }
    @Override
    public EntityResult productViewCountPaginationQuery(Map<String, Object> keysValues, List<String> attributes, int recordNumber, int startIndex, List<?> orderBy) throws OntimizeJEERuntimeException {
        return this.daoHelper.paginationQuery(this.productViewDao,keysValues,attributes, recordNumber, startIndex, orderBy,ProductViewDao.QUERY_PROV_COUNT);
    }

    @Override
    public EntityResult productViewInsert(Map<String, Object> attributes) throws OntimizeJEERuntimeException {
        return this.daoHelper.insert(this.productViewDao,attributes);
    }

    @Override
    public EntityResult viewByProductQuery(Map<String, Object> keysValues, List<String> attributes) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.productViewDao,keysValues,attributes,ProductViewDao.QUERY_PROV_VIEW_PRODUCT);
    }


}
