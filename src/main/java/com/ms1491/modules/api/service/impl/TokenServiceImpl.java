package com.ms1491.modules.api.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.ms1491.modules.api.dao.TokenDao;
import com.ms1491.modules.api.entity.TokenEntity;
import com.ms1491.modules.api.redis.AppuserManagerRedis;
import com.ms1491.modules.api.service.TokenService;


@Service("tokenService")
public class TokenServiceImpl implements TokenService {
    @Value("${spring.redis.open: #{false}}")
    private boolean open;
    @Autowired
    private AppuserManagerRedis appuserManager;
    
	@Autowired
	private TokenDao tokenDao;
	//12小时后过期
	private final static long EXPIRE = 60 * 60 * 12;

	@Override
	public TokenEntity queryByUserId(Long userId) {
		return tokenDao.queryByUserId(userId);
	}

	@Override
	public TokenEntity queryByToken(String token) {
		if(open){//redis
			if(appuserManager.executeIsTokenExsist(token)){
				String userId = appuserManager.getUserIdByToken(token);
				TokenEntity tokenEntity = new TokenEntity();
				tokenEntity.setToken(token);
				tokenEntity.setUserId(Long.parseLong(userId));
				return tokenEntity;
			}else{
				return null;
			}
			
		}else{
			TokenEntity tokenEntity = tokenDao.queryByToken(token);
			if(tokenEntity.getExpireTime().getTime() < System.currentTimeMillis()){
				return null;
			}else{
				return tokenEntity;
			}
		}
	}

	@Override
	public void save(TokenEntity token){
		tokenDao.save(token);
	}
	
	@Override
	public void update(TokenEntity token){
		tokenDao.update(token);
	}

	@Override
	public Map<String, Object> createToken(long userId) {
		//生成一个token
		String token = UUID.randomUUID().toString();
		//当前时间
		Date now = new Date();

		//过期时间
		Date expireTime = new Date(now.getTime() + EXPIRE * 1000);
		
		if(open){
			appuserManager.addUserToken(userId+"", token, EXPIRE);
		}else{
			//判断是否生成过token
			TokenEntity tokenEntity = queryByUserId(userId);
			if(tokenEntity == null){
				tokenEntity = new TokenEntity();
				tokenEntity.setUserId(userId);
				tokenEntity.setToken(token);
				tokenEntity.setUpdateTime(now);
				tokenEntity.setExpireTime(expireTime);
				//保存token
				save(tokenEntity);
			}else{
				tokenEntity.setToken(token);
				tokenEntity.setUpdateTime(now);
				tokenEntity.setExpireTime(expireTime);
				//更新token
				update(tokenEntity);
			}
		}

		Map<String, Object> map = new HashMap<>();
		map.put("token", token);
		map.put("expire", EXPIRE);

		return map;
	}
}
