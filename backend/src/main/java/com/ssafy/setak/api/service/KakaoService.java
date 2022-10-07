package com.ssafy.setak.api.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
public class KakaoService {

    @Value("${kakao.client.id}")
    private String client_id;

    @Value("${kakao.client.secret}")
    private String client_secret;

    public String getKakaoEmail(String code, String redirectUri) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders tokenRequestHeader = new HttpHeaders(); // http 요청 헤더 만들기
        tokenRequestHeader.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");


        MultiValueMap<String, String> tokenRequestBody = new LinkedMultiValueMap<>(); // http 요청 바디 만들기
        tokenRequestBody.add("grant_type", "authorization_code");
        tokenRequestBody.add("code", code);
        tokenRequestBody.add("client_id", client_id);
        tokenRequestBody.add("client_secret", client_secret);
        tokenRequestBody.add("redirect_uri", redirectUri);

        HttpEntity<MultiValueMap<String, String>> tokenRequest = new HttpEntity<>(tokenRequestBody,
                tokenRequestHeader);

        ResponseEntity<String> tokenResponse = restTemplate.exchange( // 인증 코드로 토큰을 요청한다.
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                tokenRequest,
                String.class
        );

        // 4. 토큰 전달 받음
        JSONObject jsonObject = new JSONObject(tokenResponse.getBody());

        String access_token = jsonObject.getString("access_token");
        String refresh_token = jsonObject.getString("refresh_token");
        Integer expires_in = (Integer) jsonObject.get("expires_in");
        Integer refresh_token_expires_in = (Integer) jsonObject.get("refresh_token_expires_in");
        String token_type = jsonObject.getString("token_type");

        // 5. 토큰으로 카카오 API 호출 (카카오 서버에서 토큰 유효성 확인후 사용자 데이터 받아옴)
        HttpHeaders apiRequestHeader = new HttpHeaders();
        apiRequestHeader.add("Authorization", "Bearer " + access_token);
        apiRequestHeader.add("Content-type", "application/x-www-form-urlencoded;charset=utf8");
        HttpEntity<HttpHeaders> apiRequest = new HttpEntity<>(apiRequestHeader);

        HttpEntity<String> apiResponse = restTemplate.exchange( // 토큰과 함께 api를 호출한다.
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                apiRequest,
                String.class
        );

        JSONObject jsonObject2 = new JSONObject(apiResponse.getBody());
        JSONObject kakao_account = (JSONObject) jsonObject2.get("kakao_account");
        String email = kakao_account.getString("email");

        return email;
    }
}
