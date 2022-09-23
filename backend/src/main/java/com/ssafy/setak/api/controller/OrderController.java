package com.ssafy.setak.api.controller;

import com.ssafy.setak.api.request.LaundryCreateReq;
import com.ssafy.setak.api.request.OrderCreateReq;
import com.ssafy.setak.api.service.JwtService;
import com.ssafy.setak.api.service.LaundryService;
import com.ssafy.setak.api.service.OrderService;
import com.ssafy.setak.common.model.response.BaseResponseBody;
import com.ssafy.setak.db.entity.Order;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.apache.catalina.mapper.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<?> createLaundry(@RequestBody OrderCreateReq orderInfo){
//        Long userId = jwtService.getUserId();
        Long userId = 1l;

        orderService.createOrder(userId, orderInfo);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }
}
