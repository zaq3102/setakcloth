package com.ssafy.setak.api.response;

import com.ssafy.setak.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("AuthResponse")
public class AuthRes extends BaseResponseBody {
    @ApiModelProperty(name = "Access Token")
    private String accessToken;

    @ApiModelProperty(name="성공 여부")
    private boolean isCompleted;

    @ApiModelProperty(name="유저 ID")
    private Long userId;

    public static AuthRes of(Integer statusCode, String message, String accessToken, boolean isCompleted, Long userId) {
        AuthRes res = new AuthRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setAccessToken(accessToken);
        res.setCompleted(isCompleted);
        res.setUserId(userId);
        return res;
    }
}
