package com.ms1491.modules.api.interceptor;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.ms1491.common.exception.RRException;
import com.ms1491.common.utils.MD5Utils;
import com.ms1491.modules.api.annotation.AuthIgnore;
import com.ms1491.modules.api.annotation.SignIgnore;
import com.ms1491.modules.api.entity.TokenEntity;
import com.ms1491.modules.api.service.TokenService;
import com.ms1491.modules.api.utils.ApiCode;

/**
 * 权限(Token)验证
 * @author lcm
 * @email 282392926@qq.com
 * @date 2017-03-23 15:38
 */
@Component
public class AuthorizationInterceptor extends HandlerInterceptorAdapter {
    @Autowired
    private TokenService tokenService;

    public static final String LOGIN_USER_KEY = "LOGIN_USER_KEY";
    
    public static final String CONSTANT_KEY = "miniapp-shop";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        SignIgnore signIgnoreAnnotation;
    	AuthIgnore authIgnoreAnnotation;
        
        if(handler instanceof HandlerMethod) {
        	signIgnoreAnnotation = ((HandlerMethod) handler).getMethodAnnotation(SignIgnore.class);
        	authIgnoreAnnotation = ((HandlerMethod) handler).getMethodAnnotation(AuthIgnore.class);
        }else{
            return true;
        }

        //如果没有@SignIgnore注解，则验证sign
        if(signIgnoreAnnotation == null){
            String sign = request.getHeader("sign");
            String timestamp = request.getHeader("timestamp");
            
            //如果header中不存在，则从参数中获取
            if(StringUtils.isBlank(sign)){
            	sign = request.getParameter("sign");
            }
            if(StringUtils.isBlank(timestamp)){
            	timestamp = request.getParameter("timestamp");
            }
            
            
            if(StringUtils.isBlank(sign)){
                throw new RRException("sign不能为空",ApiCode.AC_HEAD_ERROR);
            }
            if(StringUtils.isBlank(timestamp)){
                throw new RRException("timestamp不能为空",ApiCode.AC_HEAD_ERROR);
            }
            
            long current_timestamp = System.currentTimeMillis();
            long client_timestamp = Long.parseLong(timestamp);
            if(current_timestamp-client_timestamp>1000*60*30||current_timestamp-client_timestamp<-1000*60*1){//半小时失效
            	throw new RRException("已超时",ApiCode.AC_HEAD_ERROR);
            }
            
            String service_sign =  MD5Utils.md5(CONSTANT_KEY+timestamp);
            if(!service_sign.equals(sign)){
            	 throw new RRException("sign失效",ApiCode.AC_ACCOUNT_DISABLED);
            }
        }
        
        //如果没有@AuthIgnore注解，则验证token
        if(authIgnoreAnnotation == null){
            //从header中获取token
            String token = request.getHeader("token");
            //如果header中不存在token，则从参数中获取token
            if(StringUtils.isBlank(token)){
            	token = request.getParameter("token");
            }
            
            //token为空
            if(StringUtils.isBlank(token)){
                throw new RRException("token不能为空",ApiCode.AC_HEAD_ERROR);
            }
            
            //查询token信息
        	TokenEntity tokenEntity = tokenService.queryByToken(token);
            if(tokenEntity == null || tokenEntity.getExpireTime().getTime() < System.currentTimeMillis()){
                throw new RRException("token失效，请重新登录");
            }
            //设置userId到request里，后续根据userId，获取用户信息
            request.setAttribute(LOGIN_USER_KEY, tokenEntity.getUserId());
        
        }
        return true;
    }
}
