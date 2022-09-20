package com.ssafy.setak.api.response;



import com.ssafy.setak.common.model.response.BaseResponseBody;
import com.ssafy.setak.db.entity.LaundryItem;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;

/**
 * 세탁소 아이템 조회
 */
@Data
@ApiModel("UserPostResponse")
public class LaundryItemGetRes {

    @ApiModelProperty(name="항목 명")
    String name;

    @ApiModelProperty(name="가격")
    long price;

    public static LaundryItemGetRes of(String name, long price) {
        LaundryItemGetRes res = new LaundryItemGetRes();
        res.setName(name);
        res.setPrice(price);
        return res;
    }
}