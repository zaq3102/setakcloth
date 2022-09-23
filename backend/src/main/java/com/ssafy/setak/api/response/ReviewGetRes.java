package com.ssafy.setak.api.response;

import com.ssafy.setak.common.model.response.BaseResponseBody;
import com.ssafy.setak.db.entity.Favorite;
import com.ssafy.setak.db.entity.Order;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@ApiModel("ReviewGetResponse")
public class ReviewGetRes extends BaseResponseBody {
    @ApiModelProperty(name = "리뷰 리스트")
    List<ReviewRes> reviews;


    public static ReviewGetRes of(Integer statusCode, String message, List<Order> orders) {
        ReviewGetRes res = new ReviewGetRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setReviews(orders);
        return res;
    }

    public void setReviews(List<Order> orders) {
        this.reviews = new ArrayList<ReviewRes>();
        for (Order order : orders) {
            if (order.getReviewContent() != null) {
                reviews.add(ReviewRes.of(order));
            }
        }
    }

}
