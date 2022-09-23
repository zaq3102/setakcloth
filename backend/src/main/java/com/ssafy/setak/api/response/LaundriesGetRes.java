package com.ssafy.setak.api.response;


import com.ssafy.setak.common.model.response.BaseResponseBody;
import com.ssafy.setak.db.entity.Laundry;
import com.ssafy.setak.db.entity.LaundryItem;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.persistence.Tuple;
import java.util.ArrayList;
import java.util.List;

/**
 * 세탁소 정보 조회 API ([GET] /api/laundry/distance) 요청에 대한 응답값 정의.
 */
@Data
@ApiModel("LaundriesGetResponse")
public class LaundriesGetRes extends BaseResponseBody {
    @ApiModelProperty(name = "세탁소 ID")
    List<LaundryGetRes> laundries;

    public static LaundriesGetRes of(Integer statusCode, String message, List<Tuple> tuples) {
        LaundriesGetRes res = new LaundriesGetRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setLaundries(tuples);
        return res;
    }

    public void setLaundries(List<Tuple> tuples) {
        laundries = new ArrayList<>();
        for (Tuple tuple : tuples) {
            Laundry laundry = (Laundry) tuple.get(0);
            if (laundry.isWithdrawn()) continue;
            laundries.add(LaundryGetRes.of(laundry, Float.valueOf(tuple.get(1).toString()), Float.valueOf(tuple.get(2).toString())));
        }
    }
}