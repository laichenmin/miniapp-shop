package com.ms1491.modules.api.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import java.util.Map;

import javax.annotation.Resource;

import me.chanjar.weixin.common.exception.WxErrorException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cn.binarywang.wx.miniapp.api.WxMaService;
import cn.binarywang.wx.miniapp.bean.WxMaJscode2SessionResult;
import cn.binarywang.wx.miniapp.bean.WxMaUserInfo;

import com.github.binarywang.wxpay.bean.request.WxPayUnifiedOrderRequest;
import com.github.binarywang.wxpay.service.WxPayService;
import com.ms1491.common.utils.R;
import com.ms1491.common.validator.Assert;
import com.ms1491.modules.api.annotation.AuthIgnore;
import com.ms1491.modules.api.annotation.SignIgnore;
import com.ms1491.modules.api.entity.UserEntity;
import com.ms1491.modules.api.service.TokenService;
import com.ms1491.modules.api.service.UserService;

/**
 * API登录授权
 * 
 * @author lcm
 * @email 282392926@qq.com
 * @date 2017-03-23 15:31
 */
@RestController
@RequestMapping("/api")
@Api(value = "登录接口")
public class ApiUserController {
	@Autowired
	private UserService userService;
	@Autowired
	private TokenService tokenService;
	@Autowired
	private WxMaService wxMaService;
	
    @Resource(name = "wxPayService")
    private WxPayService wxPayService;
	/**
	 * 登录
	 */
	@SignIgnore
	@AuthIgnore
	@PostMapping("login")
	@ApiOperation(value = "登录接口", notes = "登录接口详细描述")
	public R login(String mobile, String password) {
		Assert.isBlank(mobile, "手机号不能为空");
		Assert.isBlank(password, "密码不能为空");

		// 用户登录
		long userId = userService.login(mobile, password);

		// 生成token
		Map<String, Object> map = tokenService.createToken(userId);

		return R.ok(map);
	}

	/**
	 * 微信登录
	 */
	@SignIgnore
	@AuthIgnore
	@PostMapping("wxlogin")
	@ApiOperation(value = "登录接口", notes = "登录接口详细描述")
	public R wxlogin(String code, String encryptedData, String iv) {
		Assert.isBlank(code, "empty code");
		Assert.isBlank(code, "empty encryptedData");
		Assert.isBlank(code, "empty iv");

		try {
			WxMaJscode2SessionResult session = wxMaService.getUserService().getSessionInfo(code);
			
			// 解密用户信息
			WxMaUserInfo userInfo = wxMaService.getUserService().getUserInfo(session.getSessionKey(), encryptedData, iv);
			UserEntity user = userService.queryByOpenId(userInfo.getOpenId());
			if(user==null){//添加用户信息
				user = new UserEntity();
				user.setOpenId(user.getOpenId());
				user.setNickName(user.getNickName());
				user.setGender(user.getGender());
				user.setAvatarUrl(user.getAvatarUrl());
				user.setUnionId(user.getUnionId());
				userService.save(user);
				user = userService.queryByOpenId(user.getOpenId());
			}else{//更新用户信息
				user.setOpenId(user.getOpenId());
				user.setNickName(user.getNickName());
				user.setGender(user.getGender());
				user.setAvatarUrl(user.getAvatarUrl());
				user.setUnionId(user.getUnionId());
				userService.update(user);
			}
			// 生成token
			Map<String, Object> map = tokenService.createToken(user.getUserId());
			
			return R.ok(map);
		} catch (WxErrorException e) {
			return R.error();
		}
	}
	/**
	 * 微信支付
	 */
	@SignIgnore
	@AuthIgnore
	@PostMapping("wxPay")
	@ApiOperation(value = "微信支付", notes = "微信支付接口描述")
	public R wxPay(String mobile, String password) {
		WxPayUnifiedOrderRequest request = new WxPayUnifiedOrderRequest();
//		request.setAppid(appid);
//		request.setAttach(attach);
//		request.
//		
//		wxPayService.unifiedOrder(request);
		return R.ok();
	}

}
