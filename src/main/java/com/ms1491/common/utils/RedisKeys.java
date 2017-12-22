package com.ms1491.common.utils;

/**
 * Redis所有Keys
 *
 * @author lcm
 * @email 282392926@qq.com
 * @date 2017-07-18 19:51
 */
public class RedisKeys {

    public static String getSysConfigKey(String key){
        return "sys:config:" + key;
    }
    public static String getTokenKey(String key){
        return "token:" + key;
    }
    public static String getUserIdKey(String key){
        return "userId:" + key;
    }
}
