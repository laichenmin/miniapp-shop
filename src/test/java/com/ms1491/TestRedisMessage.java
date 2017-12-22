package com.ms1491;

import java.util.concurrent.CountDownLatch;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TestRedisMessage {
	@Autowired
	StringRedisTemplate template;
	@Autowired
	CountDownLatch latch;
	
	@Test
	public void test(){
		
		template.convertAndSend("messageapilog","111111111111");
		try {
			latch.wait();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		
	}
	
}
