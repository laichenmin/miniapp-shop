package com.ms1491.modules.sys.entity;

import java.io.Serializable;
import java.util.Date;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ms1491.common.validator.group.AddGroup;
import com.ms1491.common.validator.group.UpdateGroup;



/**
 * 系统消息
 * 
 * @author lcm
 * @email 282392926@qq.com
 * @date 2017-09-22 12:11:32
 */
public class SysMessageEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//
	private Integer id;
	//标题
	@NotNull(message="标题不能为空", groups = {AddGroup.class, UpdateGroup.class})
	private String title;
	//内容
	@NotNull(message="内容不能为空", groups = {AddGroup.class, UpdateGroup.class})
	private String content;
	//创建时间
	private Date createTime;
	//发布时间
	@JsonFormat(pattern="yyyy-MM-dd HH:mm")
	private Date publishTime;
	@NotNull(message="状态不能为空", groups = {AddGroup.class, UpdateGroup.class})
	private Integer status;

	/**
	 * 设置：
	 */
	public void setId(Integer id) {
		this.id = id;
	}
	/**
	 * 获取：
	 */
	public Integer getId() {
		return id;
	}
	/**
	 * 设置：标题
	 */
	public void setTitle(String title) {
		this.title = title;
	}
	/**
	 * 获取：标题
	 */
	public String getTitle() {
		return title;
	}
	/**
	 * 设置：内容
	 */
	public void setContent(String content) {
		this.content = content;
	}
	/**
	 * 获取：内容
	 */
	public String getContent() {
		return content;
	}
	/**
	 * 设置：创建时间
	 */
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	/**
	 * 获取：创建时间
	 */
	public Date getCreateTime() {
		return createTime;
	}
	/**
	 * 设置：发布时间
	 */
	public void setPublishTime(Date publishTime) {
		this.publishTime = publishTime;
	}
	/**
	 * 获取：发布时间
	 */
	public Date getPublishTime() {
		return publishTime;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	
}
