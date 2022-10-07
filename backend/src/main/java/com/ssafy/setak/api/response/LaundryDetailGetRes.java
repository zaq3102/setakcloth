package com.ssafy.setak.api.response;


import com.ssafy.setak.common.model.response.BaseResponseBody;
import com.ssafy.setak.db.entity.Laundry;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * 세탁소 상세 정보 조회 API ([GET] /api/laundry/1) 요청에 대한 응답값 정의.
 */
@Data
@ApiModel("LaundryDetailGetResponse")
public class LaundryDetailGetRes extends BaseResponseBody {
    @ApiModelProperty(name = "세탁소 상세 정보")
    LaundryDetailRes laundry;

    public static LaundryDetailGetRes of(Integer statusCode, String message, Laundry laundry) {
        LaundryDetailGetRes res = new LaundryDetailGetRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setLaundry(LaundryDetailRes.of(laundry));
        return res;
    }
}