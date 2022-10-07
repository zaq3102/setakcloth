package com.ssafy.setak.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@ApiModel("OrderDetailResponse")
public class OrderDetailRes {

    @ApiModelProperty(name = "주문 상세 ID")
    Long orderDetailId;

    @ApiModelProperty(name = "주문 아이템 이름")
    String name;

    @ApiModelProperty(name = "주문 아이템 가격")
    long price;

    @ApiModelProperty(name = "블록 주소1")
    List<String> blockAddr1ImgUrls;

    @ApiModelProperty(name = "블록 주소2")
    List<String> blockAddr2ImgUrls;

    @ApiModelProperty(name = "블록 주소3")
    List<String> blockAddr3ImgUrls;

    public static OrderDetailRes of(Long orderDetailId, String name, long price, List<String> blockAddr1ImgUrls, List<String> blockAddr2ImgUrls, List<String> blockAddr3ImgUrls) {
        OrderDetailRes res = new OrderDetailRes();
        res.setOrderDetailId(orderDetailId);
        res.setName(name);
        res.setPrice(price);
        res.setBlockAddr1ImgUrls(blockAddr1ImgUrls);
        res.setBlockAddr2ImgUrls(blockAddr2ImgUrls);
        res.setBlockAddr3ImgUrls(blockAddr3ImgUrls);
        return res;
    }

    public List<String> setBlockAddr1ImgUrls(List<String> urls) {
        blockAddr1ImgUrls = new ArrayList<>();
        if (urls != null) {
            for (String url : urls) {
                blockAddr1ImgUrls.add(url);
            }
            return blockAddr1ImgUrls;
        }
        return null;
    }

    public List<String> setBlockAddr2ImgUrls(List<String> urls) {
        blockAddr2ImgUrls = new ArrayList<>();
        if (urls != null) {
            for (String url : urls) {
                blockAddr2ImgUrls.add(url);
            }
            return blockAddr2ImgUrls;
        }

        return null;
    }

    public List<String> setBlockAddr3ImgUrls(List<String> urls) {
        blockAddr3ImgUrls = new ArrayList<>();
        if (urls != null) {
            for (String url : urls) {
                blockAddr3ImgUrls.add(url);
            }
            return blockAddr3ImgUrls;
        }

        return null;
    }
}
