package com.ms1491.modules.api.utils;

import java.util.List;
/**
 * 自定义筛选条件
 * @author Administrator
 *
 */
public class Condition {
	private String name;
	private String field;
	private List<String> items;
	public Condition(String name,String field, List<String> items) {
		this.name = name;
		this.items = items;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public List<String> getItems() {
		return items;
	}
	public void setItems(List<String> items) {
		this.items = items;
	}
	public String getField() {
		return field;
	}
	public void setField(String field) {
		this.field = field;
	}
	
}
