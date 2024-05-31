package com.campusdual.cd2024bfs1g1.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Repository(value = "OrderDao")
@Lazy
@ConfigurationFile(
        configurationFile = "dao/OrderDao.xml",
        configurationFilePlaceholder = "dao/placeholders.properties"
)
public class OrderDao extends OntimizeJdbcDaoSupport {

    public static final String ATTR_ORD_ID = "ORD_ID";
    public static final String ATTR_ORD_NAME = "ORD_NAME";
    public static final String ATTR_ORD_PHONE = "ORD_PHONE";
    public static final String ATTR_ORD_ZIPCODE = "ORD_ZIPCODE";
    public static final String ATTR_ORD_ADDRESS = "ORD_ADDRESS";
    public static final String ATTR_ORD_SENT = "ORD_SENT";
    public static final String ATTR_ORD_DATE = "ORD_DATE";
    public static final String ATTR_ORD_PAID = "ORD_PAID";
    public static final String ATTR_ORD_CLIENT_ID = "ORD_CLIENT_ID";
    public static final String QUERY_ORD_SELLER = "ORD_SELLER";
    public static final String QUERY_ORD_USER = "ORD_USER";
    public static final String QUERY_ORD_PRICE_USER = "ORDER_TOTAL_FOR_USER";
    public static final String QUERY_ORD_TOTAL_PRICE = "TOTAL_PRICE";
    public static final String QUERY_ORD_LINES_VIEW = "orderLinesView";


}
