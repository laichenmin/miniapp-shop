package com.ms1491.modules.api.redis;

import java.util.concurrent.CountDownLatch;

import net.sf.json.JSONObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.ms1491.modules.sys.entity.SysLogEntity;
import com.ms1491.modules.sys.service.SysLogService;

public class Receiver {
	private static final Logger LOGGER = LoggerFactory.getLogger(Receiver.class);

	private CountDownLatch latch;

	@Autowired
	private SysLogService sysLogService;
	
	@Autowired
	public Receiver(CountDownLatch latch) {
		this.latch = latch;
	}

	public void receiveMessage(String message) {
		
		LOGGER.info("Received <" + message + ">");
		JSONObject jsonObject=JSONObject.fromObject(message);
		SysLogEntity sysLogEntity=(SysLogEntity)JSONObject.toBean(jsonObject, SysLogEntity.class);
		sysLogService.save(sysLogEntity);
		
		latch.countDown();
	}
}
