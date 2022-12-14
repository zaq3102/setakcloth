package com.ssafy.setak.api.service;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class JwtService {

    @Value("${SALT}")
    private String SALT;

    public <T> String createAccessToken(String key, T data, String subject) {
        Date now = new Date();
        String jwt = Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setIssuedAt(now)
                .setSubject(subject)
                .setExpiration(new Date(System.currentTimeMillis() + 24 * 60 * 60 * 1000))
                .claim(key, data)
                .signWith(SignatureAlgorithm.HS512, this.generateKey())
                .compact();
        return jwt;
    }

    public <T> String createRefreshToken(String key, T data, String subject) {
        Date now = new Date();
        String jwt = Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setIssuedAt(now)
                .setSubject(subject)
                .setExpiration(new Date(System.currentTimeMillis() + 7 * 24 * 60 * 60 * 1000))
                .claim(key, data)
                .signWith(SignatureAlgorithm.HS512, this.generateKey())
                .compact();
        return jwt;
    }

    private byte[] generateKey() {
        byte[] key = null;
        try {
            key = SALT.getBytes("UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return key;
    }

    public boolean isUsable(String token) {
        try {
            Jws<Claims> claims = Jwts.parser()
                    .setSigningKey(this.generateKey())
                    .parseClaimsJws(token);
        } catch (ExpiredJwtException e) {
            // ???????????? ??????
            System.out.println(e.getMessage());
            throw e;
        } catch (UnsupportedJwtException e) {
            // ????????? ???????????? ?????? JWT
            System.out.println(e.getMessage());
            throw e;
        } catch (MalformedJwtException e) {
            // JWT??? ???????????? ???????????? ????????? ??????
            System.out.println(e.getMessage());
            throw e;
        } catch (SignatureException e) {
            // ?????? ????????? ???????????? ?????? ??????
            System.out.println(e.getMessage());
            throw e;
        } catch (IllegalArgumentException e) {
            // claims??? ???????????? ??????
            System.out.println(e.getMessage());
            throw e;
        } catch (Exception e) {
            throw e;
        }

        return true;
    }

    public Map<String, Object> get(String key) {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        String bearer = request.getHeader("Authorization");
        if (bearer == null) {
            return null;
        }

        String jwt = bearer.split(" ")[1];
        Jws<Claims> claims = null;
        try {
            claims = Jwts.parser()
                    .setSigningKey(SALT.getBytes("UTF-8"))
                    .parseClaimsJws(jwt);
        } catch (ExpiredJwtException e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
//            throw new UnauthorizedException(); ????????? ?????????????
        }
        @SuppressWarnings("unchecked")
        Map<String, Object> value = (LinkedHashMap<String, Object>) claims.getBody().get(key);
        return value;
    }

    public Map<String, Object> getUserInfo(String jwt) {
        Jws<Claims> claims = null;
        try {
            claims = Jwts.parser()
                    .setSigningKey(SALT.getBytes("UTF-8"))
                    .parseClaimsJws(jwt);
        } catch (ExpiredJwtException e) {
            return (Map<String, Object>) e.getClaims().get("user");
        } catch (Exception e) {
            e.printStackTrace();
//            throw new UnauthorizedException();
        }
        @SuppressWarnings("unchecked")
        Map<String, Object> value = (LinkedHashMap<String, Object>) claims.getBody().get("user");
        return value;
    }

    public Long getUserId() {
        if (this.get("user") == null) {
            return null;
        }
        return Long.parseLong((String) this.get("user").get("id"));
    }
}
