package com.ssafy.setak.api.response;

import com.ssafy.setak.common.model.response.BaseResponseBody;
import com.ssafy.setak.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserBalanceRes")
public class UserBalanceRes extends BaseResponseBody {

    @ApiModelProperty(name = "잔액")
    float balance;



    public static UserBalanceRes of(Integer statusCode, String message , float balance) {
        UserBalanceRes res = new UserBalanceRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.balance=balance;
        return res;
    }

}
