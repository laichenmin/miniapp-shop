package com.ms1491.config;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import cn.binarywang.wx.miniapp.api.WxMaService;
import cn.binarywang.wx.miniapp.api.impl.WxMaServiceImpl;
import cn.binarywang.wx.miniapp.config.WxMaConfig;
import cn.binarywang.wx.miniapp.config.WxMaInMemoryConfig;

import com.github.binarywang.wxpay.config.WxPayConfig;
import com.github.binarywang.wxpay.service.WxPayService;
import com.github.binarywang.wxpay.service.impl.WxPayServiceImpl;


/**
 * @author <a href="https://github.com/binarywang">Binary Wang</a>
 */
@Configuration
@ConditionalOnClass(WxMaService.class)
@EnableConfigurationProperties(WxProperties.class)
public class WxConfiguration {
    @Autowired
    private WxProperties properties;
    /**
     * 小程序
     * @return
     */
    @Bean
    @ConditionalOnMissingBean
    public WxMaConfig wxMaConfig() {
        WxMaInMemoryConfig config = new WxMaInMemoryConfig();
        config.setAppid(this.properties.getAppid());
        config.setSecret(this.properties.getSecret());
        config.setToken(this.properties.getToken());
        config.setAesKey(this.properties.getAesKey());
        config.setMsgDataFormat(this.properties.getMsgDataFormat());

        return config;
    }
    @Bean
    @ConditionalOnMissingBean
    public WxMaService wxMaService(WxMaConfig config) {
        WxMaService service = new WxMaServiceImpl();
        service.setWxMaConfig(config);
        return service;
    }
    /**
     * 微信支付
     * @return
     */
    @Bean
    @ConditionalOnMissingBean
    public WxPayConfig wxPayconfig() {
      WxPayConfig payConfig = new WxPayConfig();
      payConfig.setAppId(this.properties.getAppid());
      payConfig.setMchId(this.properties.getMchId());
      payConfig.setMchKey(this.properties.getMchKey());
      payConfig.setSubAppId(StringUtils.trimToNull(this.properties.getSubAppId()));
      payConfig.setSubMchId(StringUtils.trimToNull(this.properties.getSubMchId()));
      payConfig.setKeyPath(this.properties.getKeyPath());

      return payConfig;
    }

    @Bean
    @ConditionalOnMissingBean
    public WxPayService wxPayService(WxPayConfig payConfig) {
      WxPayService wxPayService = new WxPayServiceImpl();
      wxPayService.setConfig(payConfig);
      return wxPayService;
    }
}