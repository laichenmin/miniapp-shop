package com.ms1491.modules.sys.dao;

import com.ms1491.modules.sys.entity.SysConfigEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 * 系统配置信息
 * 
 * @author lcm
 * @email 282392926@qq.com
 * @date 2016年12月4日 下午6:46:16
 */
@Mapper
public interface SysConfigDao extends BaseDao<SysConfigEntity> {
	
	/**
	 * 根据key，查询value
	 */
	SysConfigEntity queryByKey(String paramKey);
	
	/**
	 * 根据key，更新value
	 */
	int updateValueByKey(@Param("key") String key, @Param("value") String value);
	
}
