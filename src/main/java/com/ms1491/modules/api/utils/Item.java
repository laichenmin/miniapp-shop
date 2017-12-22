package com.ms1491.modules.api.utils;

/**
 * 自定义选项
 * @author Administrator
 *
 */
public class Item {
	private String name;
	private String value;
	public Item(String name,String value) {
		this.name = name;
		this.value = value;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	
	
}
