package com.ssafy.setak.api.response;

import com.ssafy.setak.common.model.response.BaseResponseBody;
import com.ssafy.setak.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("UserGetResponse")
public class UserGetRes extends BaseResponseBody {
    @ApiModelProperty(name = "유저 정보")
    UserRes userInfo;

    public static UserGetRes of(Integer statusCode, String message, User userInfo) {
        UserGetRes res = new UserGetRes();

        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setUserInfo(userInfo);
        return res;
    }

    public void setUserInfo(User user) {
        this.userInfo = UserRes.of(user);
    }
}
