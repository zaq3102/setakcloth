package com.ssafy.setak.api.response;


import com.ssafy.setak.common.model.response.BaseResponseBody;
import com.ssafy.setak.db.entity.Laundry;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

/**
 * 사장님 세탁소 정보 조회 API ([GET] /api/laundry) 요청에 대한 응답값 정의.
 */
@Data
@ApiModel("LaundryDetailsGetResponse")
public class LaundryDetailsGetRes extends BaseResponseBody {
    @ApiModelProperty(name = "세탁소")
    List<LaundryDetailRes> laundries;

    public static LaundryDetailsGetRes of(Integer statusCode, String message, List<Laundry> laundries) {
        LaundryDetailsGetRes res = new LaundryDetailsGetRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setLaundries(laundries);
        return res;
    }

    public void setLaundries(List<Laundry> list) {
        laundries = new ArrayList<>();
        for (Laundry item : list) {
            if (item.isWithdrawn()) continue;
            laundries.add(LaundryDetailRes.of(item));
        }
    }
}