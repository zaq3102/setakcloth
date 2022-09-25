package com.ssafy.setak.api.response;

import com.ssafy.setak.common.model.response.BaseResponseBody;
import com.ssafy.setak.db.entity.Order;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.persistence.Tuple;
import java.util.ArrayList;
import java.util.List;

@Data
@ApiModel("OrdersGetResponse")
public class OrdersGetRes extends BaseResponseBody {

    @ApiModelProperty(name = "주문 리스트")
    List<OrderGetRes> orders;

    public static OrdersGetRes of(Integer statusCode, String message, List<Order> orders) {
        OrdersGetRes res = new OrdersGetRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setOrders(orders);
        return res;
    }

    public void setOrders(List<Order> orderList) {
        orders = new ArrayList<>();
        for (Order order : orderList) {
            orders.add(OrderGetRes.of(200, "Success", order));
        }
    }
}
