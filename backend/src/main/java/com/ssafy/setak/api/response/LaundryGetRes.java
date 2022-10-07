package com.ssafy.setak.api.response;


import com.ssafy.setak.common.model.response.BaseResponseBody;
import com.ssafy.setak.db.entity.Laundry;
import com.ssafy.setak.db.entity.LaundryItem;
import com.ssafy.setak.db.entity.Order;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

/**
 * 세탁소 정보 조회
 */
@Data
@ApiModel("LaundryGetResponse")
public class LaundryGetRes {
    @ApiModelProperty(name = "세탁소 ID")
    Long laundryId;

    @ApiModelProperty(name = "상호명")
    String laundryName;

    @ApiModelProperty(name = "주소")
    String addr;

    @ApiModelProperty(name = "상세 주소")
    String addrDetail;

    @ApiModelProperty(name = "전화번호")
    String contact;

    @ApiModelProperty(name = "이미지 url")
    String imgUrl;

    @ApiModelProperty(name = "배달 여부")
    boolean isDeliver;

    @ApiModelProperty(name = "최소 주문 금액")
    long minCost;

    @ApiModelProperty(name = "배달료")
    long deliverCost;

    @ApiModelProperty(name = "픽업 여부")
    boolean isPickup;

    @ApiModelProperty(name = "거리")
    float distance;

    @ApiModelProperty(name = "주문 수")
    float orderCount;

    @ApiModelProperty(name = "별점")
    float score;


    public static LaundryGetRes of(Laundry laundry, float dis) {
        LaundryGetRes res = new LaundryGetRes();
        res.setLaundryId(laundry.getId());
        res.setLaundryName(laundry.getLaundryName());
        res.setAddr(laundry.getAddress().getAddr());
        res.setAddrDetail(laundry.getAddress().getAddrDetail());
        res.setContact(laundry.getContact());
        res.setImgUrl(laundry.getImgUrl());
        res.setDeliver(laundry.isDeliver());
        res.setMinCost(laundry.getMinCost());
        res.setDeliverCost(laundry.getDeliveryCost());
        res.setPickup(laundry.isPickup());
        res.setDistance(dis);

        List<Order> orders = laundry.getOrders();
        res.setOrderCount(orders.size());
        float avg = 0;
        int cnt = 0;
        for(Order order : orders){
            if(order.getReviewScore() != null){
                avg += order.getReviewScore();
                cnt++;
            }
        }

        res.setScore(cnt == 0 ? -1 : avg/cnt);
        return res;
    }
}