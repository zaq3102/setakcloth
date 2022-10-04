package com.ssafy.setak.api.response;

import com.ssafy.setak.common.model.response.BaseResponseBody;
import com.ssafy.setak.db.entity.Order;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@ApiModel("OrdersGetResponse")
public class ImgUrlsGetRes extends BaseResponseBody {

    @ApiModelProperty(name = "주문 리스트")
    List<String> imgUrls;

    public static ImgUrlsGetRes of(Integer statusCode, String message, List<String> urls) {
        ImgUrlsGetRes res = new ImgUrlsGetRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setImgUrls(urls);
        return res;
    }

    public void setOrders(List<String> urls) {
        imgUrls = new ArrayList<>();
        for (String url : urls) {
            imgUrls.add(url);
        }
    }
}
