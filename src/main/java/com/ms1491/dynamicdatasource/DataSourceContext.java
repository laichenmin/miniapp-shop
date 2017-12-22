package com.ms1491.dynamicdatasource;

/**
 * 增加多数据源，在此配置
 *
 * @author lcm
 * @email 282392926@qq.com
 * @date 2017/8/18 23:46
 */
public enum DataSourceContext {
    FIRST("first"),//数据库1
    SECOND("second");//数据库2

    private String name;

    DataSourceContext(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
