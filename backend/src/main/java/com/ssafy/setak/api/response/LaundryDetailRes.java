package com.ssafy.setak.api.response;


import com.ssafy.setak.db.entity.Laundry;
import com.ssafy.setak.db.entity.LaundryItem;
import com.ssafy.setak.db.entity.Order;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;


@Data
@ApiModel("LaundryDetailResponse")
public class LaundryDetailRes {
    @ApiModelProperty(name = "세탁소 ID")
    Long laundryId;

    @ApiModelProperty(name = "상호명")
    String laundryName;

    @ApiModelProperty(name = "주소")
    String addr;

    @ApiModelProperty(name = "상세 주소")
    String addrDetail;

    @ApiModelProperty(name = "위도")
    double addrLat;

    @ApiModelProperty(name = "경도")
    double addrLng;

    @ApiModelProperty(name = "전화번호")
    String contact;

    @ApiModelProperty(name = "이미지 url")
    String imgUrl;

    @ApiModelProperty(name = "세탁소 상세 설명")
    String description;

    @ApiModelProperty(name = "배달 여부")
    boolean isDeliver;

    @ApiModelProperty(name = "최소 주문 금액")
    long minCost;

    @ApiModelProperty(name = "배달료")
    long deliverCost;

    @ApiModelProperty(name = "픽업 여부")
    boolean isPickup;

    @ApiModelProperty(name = "세탁 아이템")
    List<LaundryItemGetRes> laundryItems;

    @ApiModelProperty(name = "별점")
    float score;

    public static LaundryDetailRes of(Laundry laundry) {
        LaundryDetailRes res = new LaundryDetailRes();
        res.setLaundryId(laundry.getId());
        res.setLaundryName(laundry.getLaundryName());
        res.setAddr(laundry.getAddress().getAddr());
        res.setAddrDetail(laundry.getAddress().getAddrDetail());
        res.setAddrLat(laundry.getAddress().getAddrLat());
        res.setAddrLng(laundry.getAddress().getAddrLng());
        res.setContact(laundry.getContact());
        res.setImgUrl(laundry.getImgUrl());
        res.setDescription(laundry.getDescription());
        res.setDeliver(laundry.isDeliver());
        res.setMinCost(laundry.getMinCost());
        res.setDeliverCost(laundry.getDeliveryCost());
        res.setPickup(laundry.isPickup());
        res.setLaundryItems(laundry.getLaundryItems());

        List<Order> orders = laundry.getOrders();
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

    public void setLaundryItems(List<LaundryItem> list) {
        laundryItems = new ArrayList<>();
        for (LaundryItem item : list) {
            if (item.isWithdrawn()) continue;
            laundryItems.add(LaundryItemGetRes.of(item.getId(), item.getName(), item.getPrice()));
        }
    }

}