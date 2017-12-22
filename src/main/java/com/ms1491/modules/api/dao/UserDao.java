package com.ms1491.modules.api.dao;

import com.ms1491.modules.api.entity.UserEntity;
import com.ms1491.modules.sys.dao.BaseDao;
import org.apache.ibatis.annotations.Mapper;

/**
 * 用户
 * 
 * @author lcm
 * @email 282392926@qq.com
 * @date 2017-03-23 15:22:06
 */
@Mapper
public interface UserDao extends BaseDao<UserEntity> {

    UserEntity queryByMobile(String mobile);
    
    UserEntity queryByOpenId(String openId);
    
}
