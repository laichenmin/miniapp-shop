package com.ms1491.common.utils;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Component;

import com.google.gson.Gson;

/**
 * Redis工具类
 *
 * @author lcm
 * @email 282392926@qq.com
 * @date 2017-07-17 21:12
 */
@Component
public class RedisUtils {
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;
    @Autowired
    private ValueOperations<String, String> valueOperations;//字符串操作
    @Autowired
    private HashOperations<String, String, Object> hashOperations;//Hash（哈希表） 操作
    @Autowired
    private ListOperations<String, Object> listOperations;  //List（列表）  
    @Autowired
    private SetOperations<String, Object> setOperations;//set集合
    @Autowired
    private ZSetOperations<String, Object> zSetOperations;//有序集合
    /**  默认过期时长，单位：秒 */
    public final static long DEFAULT_EXPIRE = 60 * 60 * 24;//一天
    /**  不设置过期时长 */
    public final static long NOT_EXPIRE = -1;
    private final static Gson gson = new Gson();

    public void set(String key, Object value, long expire){
        valueOperations.set(key, toJson(value));
        if(expire != NOT_EXPIRE){
            redisTemplate.expire(key, expire, TimeUnit.SECONDS);
        }
    }

    public void set(String key, Object value){
        set(key, value, DEFAULT_EXPIRE);
    }

    public <T> T get(String key, Class<T> clazz, long expire) {
        String value = valueOperations.get(key);
        if(expire != NOT_EXPIRE){
            redisTemplate.expire(key, expire, TimeUnit.SECONDS);
        }
        return value == null ? null : fromJson(value, clazz);
    }

    public <T> T get(String key, Class<T> clazz) {
        return get(key, clazz, NOT_EXPIRE);
    }

    public String get(String key, long expire) {
        String value = valueOperations.get(key);
        if(expire != NOT_EXPIRE){
            redisTemplate.expire(key, expire, TimeUnit.SECONDS);
        }
        return value;
    }

    public String get(String key) {
        return get(key, NOT_EXPIRE);
    }

    public void delete(String key) {
        redisTemplate.delete(key);
    }
    public Boolean hasKey(String key){
    	return redisTemplate.hasKey(key);
    }
    
    /** 
     * 实现命令：hset key field value，将哈希表 key中的域 field的值设为 value 
     * @param key 
     * @param field 
     * @param value 
     */  
    public void hset(String key, String field, Object value) { 
    	hset(key, field, value,DEFAULT_EXPIRE);  
    } 
    
    public void hset(String key, String field, Object value, long expire) {  
    	hashOperations.put(key, field, value);  
        if(expire != NOT_EXPIRE){
            redisTemplate.expire(key, expire, TimeUnit.SECONDS);
        }
    } 
    /** 
     * 实现命令：hget key field，返回哈希表 key中给定域 field的值 
     * @param key 
     * @param field 
     * @return 
     */  
    public String hget(String key,String field) {
    	return hget(key, field,DEFAULT_EXPIRE);
    }
    
    public String hget(String key,String field,long expire) {
    	String value = (String) hashOperations.get(key, field);
        if(expire != NOT_EXPIRE){
            redisTemplate.expire(key, expire, TimeUnit.SECONDS);
        }
        return value;
    }
    
    /** 
     * 实现命令：hdel key field [field ...]，删除哈希表 key 中的一个或多个指定域，不存在的域将被忽略。 
     * @param key 
     * @param fields 
     */  
    public void hdel(String key, Object... fields) {  
    	hashOperations.delete(key, fields);  
    }
    /** 
     * 实现命令：hgetall key，返回哈希表 key中，所有的域和值。 
     * @param key 
     * @return 
     */  
    public Map<String, Object> hgetall(String key) {  
        return hashOperations.entries(key);  
    } 
    
    /** 
     * 实现命令：LPUSH key value，将一个值 value插入到列表 key的表头 
     * @param key 
     * @param value 
     * @return 执行 LPUSH命令后，列表的长度。 
     */  
    public long LPUSH(String key, String value) {  
        return listOperations.leftPush(key, value);  
    }  
      
    /** 
     * 实现命令：LPOP key，移除并返回列表 key的头元素。 
     * @param key 
     * @return 列表key的头元素。 
     */  
    public String LPOP(String key) {  
        return (String) listOperations.leftPop(key);  
    }  
      
    /** 
     * 实现命令：RPUSH key value，将一个值 value插入到列表 key的表尾(最右边)。 
     * @param key 
     * @param value 
     * @return 执行 LPUSH命令后，列表的长度。 
     */  
    public long RPUSH(String key, String value) {  
        return listOperations.rightPush(key, value);  
    }  
      
    /** 
     * 实现命令：RPOP key，移除并返回列表 key的尾元素。 
     * @param key 
     * @return 列表key的头元素。 
     */  
    public String RPOP(String key) {  
        return (String) listOperations.rightPop(key);  
    }  
      
    //Set（集合）  
    /** 
     * 实现命令：SADD key member，将一个 member元素加入到集合 key当中，已经存在于集合的 member元素将被忽略。 
     * @param key 
     * @param member 
     */  
    public void SADD(String key, String member) {  
    	setOperations.add(key, member);  
    }  
      
    /** 
     * 实现命令：smembers key，返回集合 key 中的所有成员。  
     * @param key 
     * @return 
     */  
    public Set<Object> smemebers(String key) {  
        return setOperations.members(key);  
    }  
    /** 
     * 实现命令：ZADD key score member，将一个 member元素及其 score值加入到有序集 key当中。 
     * @param key 
     * @param score 
     * @param member 
     */  
    public void ZADD(String key, double score, String member) {  
        zSetOperations.add(key, member, score);  
    }  
      
    /** 
     * 实现命令：ZRANGE key start stop，返回有序集 key中，指定区间内的成员。 
     * @param key 
     * @param start 
     * @param stop 
     * @return 
     */  
    public Set<Object> ZRANGE(String key, double start, double stop) {  
        return zSetOperations.rangeByScore(key, start, stop);  
    }  

    /**
     * Object转成JSON数据
     */
    private String toJson(Object object){
        if(object instanceof Integer || object instanceof Long || object instanceof Float ||
                object instanceof Double || object instanceof Boolean || object instanceof String){
            return String.valueOf(object);
        }
        return gson.toJson(object);
    }

    /**
     * JSON数据，转成Object
     */
    private <T> T fromJson(String json, Class<T> clazz){
        return gson.fromJson(json, clazz);
    }
    
}
