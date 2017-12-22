package com.ms1491.modules.api.service;


import java.util.List;
import java.util.Map;

import com.ms1491.modules.api.entity.UserEntity;

/**
 * 用户
 * 
 * @author lcm
 * @email 282392926@qq.com
 * @date 2017-03-23 15:22:06
 */
public interface UserService {


	UserEntity queryObject(Long userId);
	
	List<UserEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(UserEntity user);
	
	void save(String mobile, String password);
	
	void update(UserEntity user);
	
	void delete(Long userId);
	
	void deleteBatch(Long[] userIds);
	
	UserEntity queryByMobile(String mobile);
	
	UserEntity queryByOpenId(String openId);

	/**
	 * 用户登录
	 * @param mobile    手机号
	 * @param password  密码
	 * @return          返回用户ID
	 */
	long login(String mobile, String password);
}
