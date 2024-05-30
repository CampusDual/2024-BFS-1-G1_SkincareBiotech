package com.campusdual.cd2024bfs1g1.model.core.service;

import com.campusdual.cd2024bfs1g1.api.core.service.IProductGenderService;
import com.campusdual.cd2024bfs1g1.model.core.dao.ProductGenderDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service("ProductGenderService")
@Lazy
public class ProductGenderService implements IProductGenderService {

    @Autowired
    private ProductGenderDao productGenderDao;
    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;

    @Override
    public EntityResult productGenderQuery(Map<String, Object> keysValues, List<String> attributes) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.productGenderDao, keysValues, attributes);
    }
}
