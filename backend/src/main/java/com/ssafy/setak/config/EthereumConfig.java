package com.ssafy.setak.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.admin.Admin;
import org.web3j.protocol.http.HttpService;

@Configuration
public class EthereumConfig {
    @Value("${spring.web3j.client-address}")
    private String NETWORK_URL;

    @Bean
    public Web3j web3j() {
        return Web3j.build(new HttpService(NETWORK_URL));
    }

    @Bean
    public Admin admin() {
        return Admin.build(new HttpService(NETWORK_URL));
    }
}
