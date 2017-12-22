package com.ms1491.common.validator;

import org.apache.commons.lang.StringUtils;

import com.ms1491.common.exception.RRException;
import com.ms1491.modules.api.utils.ApiCode;

/**
 * 数据校验
 * @author lcm
 * @email 282392926@qq.com
 * @date 2017-03-23 15:50
 */
public abstract class Assert {

    public static void isBlank(String str, String message) {
        if (StringUtils.isBlank(str)) {
            throw new RRException(message,ApiCode.AC_MISSING_PARAMETER);
        }
    }

    public static void isNull(Object object, String message) {
        if (object == null) {
        	
            throw new RRException(message);
        }
    }
}
