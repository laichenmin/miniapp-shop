package com.ms1491.modules.api.utils;

public class ApiCode {
	
	 public static final int AC_BAD_REQUEST = 400;//无效请求
	 
	 public static final int AC_UNAUTHORIZED = 401;//权限不足
	 
	 public static final int AC_FORBIDDEN = 403;//（禁止） 服务器拒绝请求
	 
	 public static final int AC_NOT_FOUND = 404;//服务器找不到请求
	 
	 public static final int AC_INTERNAL_SERVER_ERROR = 500;//服务端程序报错
	 
	 public static final int AC_HEAD_ERROR = 600;//header参数错误
	 
	 public static final int AC_SIGN_ERROR = 601;//签名无效
	 
	 public static final int AC_TOEKN_ERROR = 602;//token失效
	 
	 public static final int AC_MISSING_PARAMETER = 603;//缺少参数
	 
	 public static final int AC_INVALID_PARAMETER = 604;//无效参数
	 
	 public static final int AC_REGISTER_FAILED = 610;//注册失败
	 
	 public static final int AC_LOGIN_FAILED = 611;//登录失败
	 
	 public static final int AC_ACCOUNT_DISABLED = 612;//账户被禁用
	 
	 public static final int AC_SEND_CODE_FAILED = 613;//验证码发送失败
	 
	 public static final int AC_VESION_ERROR = 620;//app版本过低
	 
	 public static final int AC_OTHER_ERROR = 630;//其他错误
	 
	 
}
