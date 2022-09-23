package com.ssafy.setak.api.controller;

import com.ssafy.setak.api.request.OrderCreateReq;
import com.ssafy.setak.api.response.OrderGetRes;
import com.ssafy.setak.api.service.JwtService;
import com.ssafy.setak.api.service.OrderService;
import com.ssafy.setak.common.model.response.BaseResponseBody;
import com.ssafy.setak.db.entity.Order;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "Order API", tags = {"Order"})
@RestController
@RequestMapping("/order")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/create")
    @ApiOperation(value = "주문 등록", notes = "주문 등록")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 500, message = "주문 등록 실패")
    })
    public ResponseEntity<?> createOrder(@RequestBody OrderCreateReq orderInfo){
//        Long userId = jwtService.getUserId();
        Long userId = 1l;

        orderService.createOrder(userId, orderInfo);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @GetMapping
    @ApiOperation(value = "고객 주문 전체 조회", notes = "고객 주문 전체 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 500, message = "고객 주문 전체 조회 실패")
    })
    public ResponseEntity<?> getOrdersByUserId(){

        //        Long userId = jwtService.getUserId();
        Long userId = 1l;

        return null;
    }

    @GetMapping("/{order_id}")
    @ApiOperation(value = "주문 상세 조회", notes = "주문 상세 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 500, message = "주문 조회 실패"),
            @ApiResponse(code = 404, message = "주문 없음"),
    })
    public ResponseEntity<?> getOrder(@PathVariable("order_id") Long orderId){
        Order order = orderService.selectOrder(orderId);
        if(order != null){
            return ResponseEntity.status(200).body(OrderGetRes.of(200, "Success", order));
        } else {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "Laundry Not Found"));
        }
    }
}
