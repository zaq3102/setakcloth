package com.ssafy.setak.api.response;



import com.ssafy.setak.common.model.response.BaseResponseBody;
import com.ssafy.setak.db.entity.Laundry;
import com.ssafy.setak.db.entity.LaundryItem;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

/**
 * 세탁소 상세 정보 조회 API ([GET] /api/laundry/1) 요청에 대한 응답값 정의.
 */
@Data
@ApiModel("LaundryDetailGetResponse")
public class LaundryDetailGetRes extends BaseResponseBody {
    @ApiModelProperty(name = "세탁소 ID")
    Long laundryId;

    @ApiModelProperty(name = "상호명")
    String laundryName;

    @ApiModelProperty(name = "주소")
    String addr;

    @ApiModelProperty(name = "상세 주소")
    String addrDetail;

    @ApiModelProperty(name = "위도")
    float addrLat;

    @ApiModelProperty(name = "경도")
    float addrLng;

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
    LaundryItemsGetRes laundryItems;

    public static LaundryDetailGetRes of(Integer statusCode, String message, Laundry laundry) {
        LaundryDetailGetRes res = new LaundryDetailGetRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
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
        res.setLaundryItems(LaundryItemsGetRes.of(laundry.getLaundryItems()));
        return res;
    }

}