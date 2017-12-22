package com.ms1491.modules.api.annotation;

import java.lang.annotation.*;

/**
 * api接口，忽略Token验证
 * @author lcm
 * @email 282392926@qq.com
 * @date 2017-03-23 15:44
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface AuthIgnore {

}
