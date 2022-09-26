package com.ssafy.setak.common.interceptor;

import com.ssafy.setak.api.service.JwtService;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class JwtInterceptor implements HandlerInterceptor {
    private static final String HEADER_AUTH = "Authorization";

    @Autowired
    private JwtService jwtService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {

        // axios의 Preflight OPTION 요청 거름
        if (HttpMethod.OPTIONS.matches(request.getMethod())) {
            return true;
        }

        // cookie에서 토큰들을 가져옴(없으면 null)
        String bearer = request.getHeader(HEADER_AUTH);
        String accessToken = null;
        String refreshToken = null;
        Cookie[] cookies = request.getCookies();

        if (cookies == null) {
            return true;
        }

        if (bearer != null && !"".equals(bearer)) {
            final String token = request.getHeader(HEADER_AUTH).split(" ")[1];
            try {
                if (token != null && !"".equals(bearer) && jwtService.isUsable(token)) {
                    return true;
                }
            } catch (ExpiredJwtException e) {
                response.sendError(445, "다시 로그인해주세요");
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        }

        Cookie accessCookie = new Cookie("accessToken", null);
        accessCookie.setMaxAge(0);
        accessCookie.setPath("/");
        response.addCookie(accessCookie);

        Cookie refreshCookie = new Cookie("refreshToken", null);
        refreshCookie.setMaxAge(0);
        refreshCookie.setPath("/");
        response.addCookie(refreshCookie);

        response.sendError(445, "다시 로그인해주세요. (2)");
        return false;
    }
}
