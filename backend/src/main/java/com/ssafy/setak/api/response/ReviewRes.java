package com.ssafy.setak.api.response;

import com.ssafy.setak.db.entity.Favorite;
import com.ssafy.setak.db.entity.Order;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("ReviewResponse")
public class ReviewRes {
    @ApiModelProperty(name="세탁소이름")
    String laundryName;
    @ApiModelProperty(name="닉네임")
    String userNickName;
    @ApiModelProperty(name="점수")
    int score;
    @ApiModelProperty(name="내용")
    String content;


    public static ReviewRes of(Order order) {
        ReviewRes res = new ReviewRes();
        res.setUserNickName(order.getUser().getNickName());
        res.setLaundryName(order.getLaundry().getLaundryName());
        res.setScore(order.getReviewScore());
        res.setContent(order.getReviewContent());
        return res;


    }
}
