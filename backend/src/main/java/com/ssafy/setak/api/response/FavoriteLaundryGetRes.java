package com.ssafy.setak.api.response;

import com.ssafy.setak.db.entity.Favorite;
import com.ssafy.setak.db.entity.Laundry;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("FavoriteLaundryGetResponse")
public class FavoriteLaundryGetRes {
    @ApiModelProperty(name = "세탁소 ID")
    Long laundryId;

    @ApiModelProperty(name = "상호명")
    String laundryName;

    @ApiModelProperty(name = "주소")
    String addr;

    @ApiModelProperty(name = "상세 주소")
    String addrDetail;

    @ApiModelProperty(name = "이미지 주소")
    String imgUrl;

    @ApiModelProperty(name = "상세 설명")
    String description;

    public static FavoriteLaundryGetRes of(Favorite favorite) {
        FavoriteLaundryGetRes res = new FavoriteLaundryGetRes();
        res.laundryId = favorite.getLaundry().getId();
        res.laundryName = favorite.getLaundry().getLaundryName();
        res.addr = favorite.getLaundry().getAddress().getAddr();
        res.addrDetail = favorite.getLaundry().getAddress().getAddrDetail();
        res.imgUrl = favorite.getLaundry().getImgUrl();
        res.description = favorite.getLaundry().getDescription();
        return res;
    }
}
