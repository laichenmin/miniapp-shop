package com.ms1491;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.ms1491.common.utils.RedisKeys;
import com.ms1491.modules.api.redis.AppuserManagerRedis;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TestRedis {
	
	private final static long EXPIRE = 60 * 60 * 12;//
	@Autowired
	AppuserManagerRedis appuserManagerRedis;
	
	
	@Test
	public void test(){
		
		String token = "8";
		String userId = "9";
		
		String a = appuserManagerRedis.getUserIdByToken(token);
		
		System.out.println("a========"+a);
		System.out.println("token = "+appuserManagerRedis.getTokenByUserId(userId));
		System.out.println("userId = "+appuserManagerRedis.getUserIdByToken(token));
		
	}
	
}
