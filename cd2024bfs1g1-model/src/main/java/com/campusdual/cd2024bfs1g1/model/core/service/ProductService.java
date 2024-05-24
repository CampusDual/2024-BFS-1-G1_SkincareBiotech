package com.campusdual.cd2024bfs1g1.model.core.service;

import com.campusdual.cd2024bfs1g1.api.core.service.IProductService;
import com.campusdual.cd2024bfs1g1.model.core.dao.ProductDao;
import com.campusdual.cd2024bfs1g1.model.core.utils.Utils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.ontimize.jee.common.db.AdvancedEntityResult;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Lazy
@Service("ProductService")
public class ProductService implements IProductService {

    @Autowired
    private ProductDao productDao;

    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;

    @Override
    public EntityResult productQuery(Map<String, Object> keysValues, List<String> attributes) throws OntimizeJEERuntimeException {
        List<String> columns = new ArrayList<>(attributes);
        columns.remove("PRO_SALE_ACTIVATE");
        EntityResult er = this.daoHelper.query(this.productDao, keysValues, columns);
        return er;
    }

    @Override
    public EntityResult productInsert(Map<String, Object> attributes) throws OntimizeJEERuntimeException, JsonProcessingException {
        int userId = Utils.getUserId();
        Map<String,Object> values = new HashMap<>(attributes);
        values.put(ProductDao.PRO_SELLER_ID, userId);
        EntityResult er = this.daoHelper.insert(this.productDao, values);
        return er;
    }

    @Override
    public EntityResult productUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap)
            throws OntimizeJEERuntimeException {
        return this.daoHelper.update(this.productDao, attrMap, keyMap);
    }

    @Override
    public AdvancedEntityResult productEnabledPaginationQuery(Map<String, Object> keysValues, List<String> attributes, int recordNumber, int startIndex, List<?> orderBy) {
        return this.daoHelper.paginationQuery(this.productDao, keysValues, attributes, recordNumber, startIndex, orderBy, ProductDao.PRO_ENABLED);
    }

    @Override
    public BigDecimal getProductPriceById(Integer proId) {
        Map<String, Object> proIdMap = new HashMap<String, Object>();
        proIdMap.put(ProductDao.PRO_ID, proId);
        List<String> attrList = List.of(ProductDao.PRO_PRICE, ProductDao.PRO_SALE);
        EntityResult productER = productQuery(proIdMap, attrList);
        BigDecimal sale = (BigDecimal) ((List) productER.get(ProductDao.PRO_SALE)).get(0);
        BigDecimal price = (BigDecimal) ((List) productER.get(ProductDao.PRO_PRICE)).get(0);

        if (sale != null) {
            return sale;
        } else {
           return price;
        }
    }

    @Override
    public EntityResult productBySellerQuery(Map<String, Object> keysValues, List<String> attributes)
            throws OntimizeJEERuntimeException, JsonProcessingException {
        int userId = Utils.getUserId();
        Map<String, Object> filter = new HashMap<>(keysValues);
        filter.put(ProductDao.PRO_SELLER_ID, userId);
        EntityResult er = this.daoHelper.query(this.productDao, filter, attributes);
        return er;
    }

    @Override
    public AdvancedEntityResult productPaginationQuery(Map<String, Object> keysValues, List<String> attributes, int recordNumber, int startIndex, List<?> orderBy) {
        return this.daoHelper.paginationQuery(this.productDao, keysValues, attributes, recordNumber, startIndex, orderBy, "pro_featured");
    }
}
