package com.ssafy.setak.config;

import io.ipfs.api.IPFS;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

@Configuration
//@Scope(value = ConfigurableBeanFactory.SCOPE_SINGLETON)
public class IPFSConfig {

//    IPFS ipfs;

    @Bean
    public IPFS ipfs() {
//        ipfs = new IPFS("/ip4/j7a706.p.ssafy.io/tcp/5001/https");
        return new IPFS("j7a706.p.ssafy.io", 5001);
    }

//    @Bean
//    public IPFS IPFSConfig() {
//        return new IPFS(new MultiAddress("/ip4/j7a706.p.ssafy.io/tcp/5001/https"));
//    }
}
