package com.campusdual.cd2024bfs1g1.model.core.service;

import com.campusdual.cd2024bfs1g1.api.core.service.ISaleService;
import com.campusdual.cd2024bfs1g1.model.core.dao.BilledAgeDao;
import com.campusdual.cd2024bfs1g1.model.core.dao.OrderDao;
import com.campusdual.cd2024bfs1g1.model.core.dao.ProductDao;
import com.campusdual.cd2024bfs1g1.model.core.dao.SaleDao;
import com.campusdual.cd2024bfs1g1.model.core.utils.Utils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.dto.EntityResultMapImpl;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import com.ontimize.jee.server.dao.IOntimizeDaoSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.*;

@Service("SaleService")
@Lazy
public class SaleService implements ISaleService {
    @Autowired
    private SaleDao saleDao;
    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;
    private IOntimizeDaoSupport productDao;

    @Override
    public EntityResult saleQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.saleDao, keyMap, attrList);
    }

    public EntityResult productSaleQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.saleDao, keyMap, attrList, SaleDao.QUERY_PRO_SALE);
    }

    @Override
    public EntityResult productSaleInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {
        Date fechaInicio = (Date) attrMap.get(SaleDao.ATTR_SAL_INITIAL_DATE);
        long minDate = fechaInicio.getTime();
        Date fechaFin = (Date) attrMap.get((SaleDao.ATTR_SAL_END_DATE));
        long maxDate = fechaFin.getTime();
        int productId = (int) attrMap.get(SaleDao.ATTR_PRO_ID);
        Date currentDate = new Date();

        if (fechaInicio.after(currentDate)) {
            if (minDate > maxDate) {
                EntityResult result = new EntityResultMapImpl();
                result.setCode(EntityResult.OPERATION_WRONG);
                result.setMessage("MIN_DATE_HIGHER");
                return result;
            } else {
                Map<String, Object> queryKeys = new HashMap<>();
                List<String> queryAttributes = Arrays.asList(SaleDao.ATTR_SAL_ID, SaleDao.ATTR_SAL_INITIAL_DATE, SaleDao.ATTR_SAL_END_DATE,SaleDao.ATTR_PRO_ID);

                EntityResult existingRanges = this.daoHelper.query(this.saleDao, queryKeys, queryAttributes);

                if (!Utils.isDateRangeValid(minDate, maxDate, existingRanges,productId )) {
                    EntityResult result = new EntityResultMapImpl();
                    result.setCode(EntityResult.OPERATION_WRONG);
                    result.setMessage("DATE_NOT_VALID");
                    return result;
                }
                return this.daoHelper.insert(this.saleDao, attrMap);
            }
        } else {
            EntityResult result = new EntityResultMapImpl();
            result.setCode(EntityResult.OPERATION_WRONG);
            result.setMessage("START_DATE_BEFORE_CURRENT_DATE");
            return result;
        }
    }
}
