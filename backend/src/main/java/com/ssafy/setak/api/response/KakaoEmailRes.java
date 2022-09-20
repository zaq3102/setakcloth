package com.ssafy.setak.api.response;

import com.ssafy.setak.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("KakaoEmailResponse")
public class KakaoEmailRes extends BaseResponseBody {
    @ApiModelProperty(name = "카카오 이메일")
    String kakaoEmail;

    public static KakaoEmailRes of(Integer statusCode, String message, String kakaoEmail) {
        KakaoEmailRes res = new KakaoEmailRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setKakaoEmail(kakaoEmail);
        return res;
    }
}
