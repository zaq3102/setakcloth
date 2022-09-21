package com.ssafy.setak.api.response;

import com.ssafy.setak.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("CeoUserPostResponse")
public class CeoUserPostRes extends BaseResponseBody {

    @ApiModelProperty(name="유저 ID")
    Long userId;

    public static CeoUserPostRes of(Integer statusCode, String message, Long userId) {
        CeoUserPostRes res = new CeoUserPostRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setUserId(userId);
        return res;
    }
}
