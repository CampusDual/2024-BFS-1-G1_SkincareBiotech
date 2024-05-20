package com.campusdual.cd2024bfs1g1.model.core.service;

import com.campusdual.cd2024bfs1g1.api.core.service.IOrderService;
import com.campusdual.cd2024bfs1g1.model.core.dao.OrderDao;
import com.campusdual.cd2024bfs1g1.model.core.dao.OrderLinesDao;
import com.campusdual.cd2024bfs1g1.model.core.dao.ProductDao;
import com.campusdual.cd2024bfs1g1.model.core.dao.UserDao;
import com.campusdual.cd2024bfs1g1.model.core.utils.Utils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("OrderService")
@Lazy
public class OrderService implements IOrderService {

    @Autowired
    private OrderDao orderDao;
    @Autowired
    private OrderLinesDao orderLineDao;
    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;
    @Autowired
    private ProductService productService;
    @Autowired
    private OrderLinesService orderLinesService;


    @Override
    public EntityResult orderByUserQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException, JsonProcessingException {
        int userId = Utils.getUserId();
        Map<String, Object> orderMap = new HashMap<>(keyMap);
        orderMap.put(OrderDao.ATTR_ORD_CLIENT_ID, userId);
        return this.daoHelper.query(this.orderDao, orderMap, attrList);
    }

    @Override
    public EntityResult orderInsert(Map<String, Object> attributes) throws OntimizeJEERuntimeException {
         
        int userId = Utils.getUserId();
        Map<String, Object> orderData = new HashMap<>(attributes);
        Map<String, Object> orderLineData = new HashMap<>();
        orderData.remove("ORD_ITEMS");
        List<Map<String, Integer>> itemList = (List<Map<String, Integer>>) attributes.get("ORD_ITEMS");
        orderData.put(OrderDao.ATTR_ORD_CLIENT_ID, userId);
        EntityResult ordInsertResult = this.daoHelper.insert(this.orderDao, orderData);
        Integer ordId = (Integer) ordInsertResult.get(OrderDao.ATTR_ORD_ID);
        
        for(int i = 0;i<itemList.size();i++){
            Map<String, Integer> item = itemList.get(i);
            Integer id = item.get("id");
            Integer units = item.get("units");
            orderLineData.put(ProductDao.PRO_ID,id);
            orderLineData.put(OrderLinesDao.ATTR_OL_UNITS,units);
            orderLineData.put(OrderLinesDao.ATTR_OL_PRICE,productService.getProductPriceById(id));
            orderLineData.put(OrderLinesDao.ATTR_ORD_ID,ordId);
            this.daoHelper.insert(this.orderLineDao, orderLineData);
        }
        return ordInsertResult;
    }

    @Override
    public EntityResult orderUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.update(this.orderDao, attrMap, keyMap);
    }

    @Override
    public EntityResult orderDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.delete(this.orderDao, keyMap);
    }

    @Override
    public EntityResult orderBySellerQuery(Map<String, Object> keysValues, List<String> attributes) throws OntimizeJEERuntimeException, JsonProcessingException {

        int userId = Utils.getUserId();
        Map<String, Object> filter = new HashMap<>(keysValues);
        filter.put(ProductDao.PRO_SELLER_ID, userId);
        EntityResult er = this.daoHelper.query(this.orderDao, filter, attributes);
        return er;
    }

    @Override
    public EntityResult orderLinesViewQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.orderDao, keyMap, attrList, "orderLinesView");
    }

}
