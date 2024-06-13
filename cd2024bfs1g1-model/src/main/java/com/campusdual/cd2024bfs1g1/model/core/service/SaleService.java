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
    
    @Override
    public EntityResult saleInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {
        Date initialDate = (Date) attrMap.get(SaleDao.ATTR_SAL_INITIAL_DATE);
        long minDate = initialDate.getTime();
        Date endDate = (Date) attrMap.get((SaleDao.ATTR_SAL_END_DATE));
        long maxDate = endDate.getTime();
        int productId = (int) attrMap.get(SaleDao.ATTR_PRO_ID);
        Date currentDate = new Date();

        Calendar calInitialDate = Calendar.getInstance();
        calInitialDate.setTime(currentDate);
        calInitialDate.set(Calendar.HOUR_OF_DAY, 0);
        calInitialDate.set(Calendar.MINUTE, 0);
        calInitialDate.set(Calendar.SECOND, 0);
        calInitialDate.set(Calendar.MILLISECOND, 0);
        Date currentDayStart = calInitialDate.getTime();

        Calendar calEndDate = Calendar.getInstance();
        calEndDate.setTime(endDate);
        calEndDate.set(Calendar.HOUR_OF_DAY, 23);
        calEndDate.set(Calendar.MINUTE, 59);
        calEndDate.set(Calendar.SECOND, 59);
        calEndDate.set(Calendar.MILLISECOND, 999);
        endDate = calEndDate.getTime();

        if (initialDate.equals(currentDayStart) || initialDate.after(currentDayStart)) {
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

                attrMap.put(SaleDao.ATTR_SAL_END_DATE, endDate);

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
