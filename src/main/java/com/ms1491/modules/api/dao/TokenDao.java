package com.ms1491.modules.api.dao;

import com.ms1491.modules.api.entity.TokenEntity;
import com.ms1491.modules.sys.dao.BaseDao;
import org.apache.ibatis.annotations.Mapper;

/**
 * 用户Token
 * 
 * @author lcm
 * @email 282392926@qq.com
 * @date 2017-03-23 15:22:07
 */
@Mapper
public interface TokenDao extends BaseDao<TokenEntity> {
    
    TokenEntity queryByUserId(Long userId);

    TokenEntity queryByToken(String token);
	
}
