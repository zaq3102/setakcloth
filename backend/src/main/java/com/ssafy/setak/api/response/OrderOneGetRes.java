package com.ssafy.setak.api.response;

import com.ssafy.setak.common.model.response.BaseResponseBody;
import com.ssafy.setak.db.entity.Order;
import com.ssafy.setak.db.entity.OrderType;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@ApiModel("OrderDetailGetResponse")
public class OrderOneGetRes extends BaseResponseBody {

    @ApiModelProperty(name = "주문 ID")
    Long orderId;

    @ApiModelProperty(name = "주문 날짜")
    LocalDateTime date;

    @ApiModelProperty(name = "주문 총 금액")
    long totalPrice;

    @ApiModelProperty(name = "주문 상태")
    int state;

    @ApiModelProperty(name = "주문 유형")
    OrderType orderType;

    @ApiModelProperty(name = "주문한 세탁소명")
    String laundryName;

    @ApiModelProperty(name = "주문한 사용자 닉네임")
    String userNickName;

    @ApiModelProperty(name = "주문한 사용자 주소")
    String userAddr;

    @ApiModelProperty(name = "주문한 사용자 상세 주소")
    String userAddrDetail;

    @ApiModelProperty(name = "리뷰 날짜")
    LocalDate reviewDate;

    @ApiModelProperty(name = "리뷰 평점")
    Integer reviewScore;

    @ApiModelProperty(name = "리뷰 내용")
    String reviewContent;

    @ApiModelProperty(name = "주문 상세")
    List<OrderDetailRes> orderDetails;

    public static OrderOneGetRes of(Integer statusCode, String message, Order order, List<OrderDetailRes> orderDetails) {
        OrderOneGetRes res = new OrderOneGetRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setOrderId(order.getId());
        res.setDate(order.getDate());
        res.setTotalPrice(order.getTotalPrice());
        res.setState(order.getState());
        res.setOrderType(order.getOrderType());
        res.setLaundryName(order.getLaundry().getLaundryName());
        res.setUserNickName(order.getUser().getNickName());
        res.setUserAddr(order.getUser().getAddress().getAddr());
        res.setUserAddrDetail(order.getUser().getAddress().getAddrDetail());
        res.setReviewDate(order.getReviewDate());
        res.setReviewScore(order.getReviewScore());
        res.setReviewContent(order.getReviewContent());
        res.setOrderDetails(orderDetails);
        return res;
    }

//    public void setOrderDetails(List<OrderDetail> details) {
//        orderDetails = new ArrayList<>();
//        for (OrderDetail detail : details) {
//            orderDetails.add(OrderDetailRes.of(detail.getId(), detail.getName(), detail.getPrice(), detail.getBlockAddr1(), detail.getBlockAddr2(), detail.getBlockAddr3()));
//        }
//    }
}
