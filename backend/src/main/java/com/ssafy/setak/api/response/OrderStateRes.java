package com.ssafy.setak.api.response;

import com.ssafy.setak.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("OrderStateResponse")
public class OrderStateRes extends BaseResponseBody {
    @ApiModelProperty(name = "state")
    private int state;

    public static OrderStateRes of(Integer statusCode, String message, int state) {
        OrderStateRes res = new OrderStateRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setState(state);
        return res;
    }
}
