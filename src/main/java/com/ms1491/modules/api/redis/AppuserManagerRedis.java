package com.ms1491.modules.api.redis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ms1491.common.exception.RRException;
import com.ms1491.common.utils.RedisKeys;
import com.ms1491.common.utils.RedisUtils;

/**
 * 系统配置Redis
 *
 * @author lcm
 * @email 282392926@qq.com
 * @date 2017/7/18 21:08
 */
@Component
public class AppuserManagerRedis {
    @Autowired
    private RedisUtils redisUtils;
    
	public String getUserIdByToken(String token) {
		String key = RedisKeys.getTokenKey(token);
		return redisUtils.hget(key,"userId");
	}
	public String getTokenByUserId(String userId) {
		String key = RedisKeys.getUserIdKey(userId);
		return redisUtils.hget(key,"token");
	}
	public boolean executeIsTokenExsist(String token){
		String key = RedisKeys.getTokenKey(token);
		return redisUtils.hasKey(key);
	}
	public boolean executeIsUserIdExsist(String userId){
		String key = RedisKeys.getUserIdKey(userId);
		return redisUtils.hasKey(key);
	}
	
	public void addUserToken(String userId,String token,long expire){
		String userIdKey = RedisKeys.getUserIdKey(userId);
		String tokenKey = RedisKeys.getTokenKey(token);
		
		if(redisUtils.hasKey(tokenKey)){
			throw new RRException("token repeat");
		}else if(redisUtils.hasKey(userIdKey)){
			String oldToken = redisUtils.hget(userIdKey,"token");
			String oldTokenKey = RedisKeys.getTokenKey(oldToken);
			redisUtils.delete(userIdKey);
			redisUtils.delete(oldTokenKey);
		}
		//
		redisUtils.hset(userIdKey, "token", token,expire);
		redisUtils.hset(tokenKey, "userId", userId,expire);
	}
}
