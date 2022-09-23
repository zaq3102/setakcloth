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
 * 세탁소 아이템 전체 정보 조회 API ([GET] /api/laundry/1/item) 요청에 대한 응답값 정의.
 */
@Data
@ApiModel("LaundryItemsGetResponse")
public class LaundryItemsGetRes extends BaseResponseBody {
    @ApiModelProperty(name = "세탁소 ID")
    List<LaundryItemGetRes> laundryItems;

    public static LaundryItemsGetRes of(Integer statusCode, String message, List<LaundryItem> list) {
        LaundryItemsGetRes res = new LaundryItemsGetRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setLaundryItems(list);
        return res;
    }

    public void setLaundryItems(List<LaundryItem> list){
        laundryItems = new ArrayList<>();
        for(LaundryItem item : list){
            if(item.isWithdrawn()) continue;
            laundryItems.add(LaundryItemGetRes.of(item.getId(), item.getName(), item.getPrice()));
        }
    }
}