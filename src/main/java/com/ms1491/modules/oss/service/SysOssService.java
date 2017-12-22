package com.ms1491.modules.oss.service;

import com.ms1491.modules.oss.entity.SysOssEntity;

import java.util.List;
import java.util.Map;

/**
 * 文件上传
 * 
 * @author lcm
 * @email 282392926@qq.com
 * @date 2017-03-25 12:13:26
 */
public interface SysOssService {
	
	SysOssEntity queryObject(Long id);
	
	List<SysOssEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(SysOssEntity sysOss);
	
	void update(SysOssEntity sysOss);
	
	void delete(Long id);
	
	void deleteBatch(Long[] ids);
}
