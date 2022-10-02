package com.ssafy.setak.api.controller;

import com.ssafy.setak.api.request.OrderCreateReq;
import com.ssafy.setak.api.request.OrderDetailUpdateReq;
import com.ssafy.setak.api.response.*;
import com.ssafy.setak.api.request.ReviewPostReq;
import com.ssafy.setak.api.service.JwtService;
import com.ssafy.setak.api.service.LaundryService;
import com.ssafy.setak.api.service.OrderService;
import com.ssafy.setak.common.model.response.BaseResponseBody;
import com.ssafy.setak.db.entity.Laundry;
import com.ssafy.setak.db.entity.Order;
import com.ssafy.setak.db.entity.OrderDetail;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "Order API", tags = {"Order"})
@RestController
@RequestMapping("/order")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private LaundryService laundryService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/create")
    @ApiOperation(value = "주문 등록", notes = "주문 등록")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 500, message = "주문 등록 실패")
    })
    public ResponseEntity<?> createOrder(@RequestBody OrderCreateReq orderInfo) {
        try {
            Long userId = jwtService.getUserId();

            orderService.createOrder(userId, orderInfo);
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body(
                    BaseResponseBody.of(500, "주문 등록 실패")
            );
        }
    }

    @GetMapping
    @ApiOperation(value = "고객 주문 전체 조회", notes = "고객 주문 전체 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 500, message = "고객 주문 전체 조회 실패")
    })
    public ResponseEntity<?> getOrdersByUserId() {
        try {
            Long userId = jwtService.getUserId();
            List<Order> orders = orderService.getOrdersbyUserId(userId);
            return ResponseEntity.status(200).body(OrdersGetRes.of(200, "Success", orders));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body(
                    BaseResponseBody.of(500, "고객 주문 전체 조회 실패")
            );
        }
    }

    @GetMapping("/laundry/{laundry_id}")
    @ApiOperation(value = "세탁소 주문 전체 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 500, message = "세탁소 주문 전체 조회 실패"),
            @ApiResponse(code = 404, message = "세탁소 조회 실패"),
    })
    public ResponseEntity<?> getOrdersByLaundryId(@PathVariable("laundry_id") Long laundryId) {
        try {
            Laundry laundry = laundryService.selectLaundry(laundryId);
            if (laundry == null) {
                return ResponseEntity.status(404).body(
                        BaseResponseBody.of(404, "세탁소 조회 실패")
                );
            }
            List<Order> orders = orderService.getOrdersByLaundryId(laundryId);
            return ResponseEntity.status(200).body(OrdersGetRes.of(200, "Success", orders));

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body(
                    BaseResponseBody.of(500, "세탁소 주문 전체 조회 실패")
            );
        }
    }

    @GetMapping("/{order_id}")
    @ApiOperation(value = "주문 상세 조회", notes = "주문 상세 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 500, message = "주문 상세 조회 실패"),
            @ApiResponse(code = 404, message = "주문 조회 실패"),
    })
    public ResponseEntity<?> getOrder(@PathVariable("order_id") Long orderId) {
        try {
            Order order = orderService.selectOrder(orderId);
            List<OrderDetailRes> orderDetails = orderService.getOrderDetails(orderId);
            if (order != null) {
                return ResponseEntity.status(200).body(OrderOneGetRes.of(200, "Success", order, orderDetails));
            } else {
                return ResponseEntity.status(404).body(BaseResponseBody.of(404, "주문 조회 실패"));
            }

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body(
                    BaseResponseBody.of(500, "주문 상세 조회 실패")
            );
        }
    }

    @PostMapping("/laundry/detail/{order_detail_id}/update")
    @ApiOperation(value = "주문 상세 변경 (세탁전 후 사진)", notes = "주문 상세 변경 (세탁전 후 사진)")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 500, message = "주문 상세 변경 (세탁전후 사진) 실패"),
            @ApiResponse(code = 404, message = "주문 상세 조회 (세탁전후 사진) 실패"),
    })
    public ResponseEntity<?> updateOrderDetail(@PathVariable("order_detail_id") Long orderDetailId, @RequestBody OrderDetailUpdateReq orderDetailInfo) {
        Long userId = jwtService.getUserId();
        OrderDetail orderDetail = orderService.updateOrderDetail(orderDetailId, userId, orderDetailInfo);
        if(orderDetail != null){
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        } else{
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "OrderDetail Not Found"));
        }
    }

    @PostMapping("/laundry/{order_id}/update/delivered")
    @ApiOperation(value = "주문 상세 변경 (배달 사진)", notes = "주문 상세 변경 (배달 사진)")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 500, message = "주문 상세 변경 (배달) 실패"),
            @ApiResponse(code = 404, message = "주문 상세 조회 (배달) 실패"),
    })
    public ResponseEntity<?> updateOrderDelivered(@PathVariable("order_id") Long orderId, @RequestBody OrderDetailUpdateReq orderDetailInfo) {
        Long userId = jwtService.getUserId();
        Order order = orderService.updateOrderDelivered(orderId, userId, orderDetailInfo);
        if(order != null){
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        } else{
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "Order Not Found"));
        }
    }

    @PostMapping("/laundry/{order_id}/update")
    @ApiOperation(value = "주문 상태 변경", notes = "주문 상태 변경")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 500, message = "주문 상태 변경"),
            @ApiResponse(code = 404, message = "주문 상태 변경"),
    })
    public ResponseEntity<?> updateOrderDelivered(@PathVariable("order_id") Long orderId) {
        Order order = orderService.updateOrderState(orderId);
        if(order != null){
            return ResponseEntity.status(200).body(OrderStateRes.of(200, "Success", order.getState()));
        } else{
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "Order Not Found"));
        }
    }

    @PostMapping("/{order_id}/review/create")
    @ApiOperation(value = "리뷰 등록", notes = "리뷰 등록")
    @ApiResponses({
            @ApiResponse(code = 201, message = "Created"),
            @ApiResponse(code = 500, message = "리뷰 등록 실패")
    })
    public ResponseEntity<? extends BaseResponseBody> registerReview(@PathVariable("order_id") String orderId, @RequestBody ReviewPostReq reviewInfo) {
        try {
            orderService.registerReview(Long.parseLong(orderId), reviewInfo);
            return ResponseEntity.status(201).body(
                    BaseResponseBody.of(201, "Created")
            );
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body(
                    BaseResponseBody.of(500, "리뷰 등록 실패")
            );
        }
    }

    @GetMapping("/review")
    @ApiOperation(value = "내 리뷰 조회", notes = "내 리뷰 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 500, message = "내 리뷰 조회 실패")
    })
    public ResponseEntity<? extends BaseResponseBody> GetUserReview() {
        try {
            Long userId = jwtService.getUserId();
            List<Order> res = orderService.getOrdersbyUserId(userId);

            return ResponseEntity.status(200).body(
                    ReviewGetRes.of(200, "Success", res)
            );
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body(
                    BaseResponseBody.of(500, "내 리뷰 조회 실패")
            );
        }
    }

    @GetMapping("/review/{laundry_id}")
    @ApiOperation(value = " 세탁소 리뷰 조회", notes = "세탁소 리뷰 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 500, message = "세탁소 리뷰 조회 실패"),
            @ApiResponse(code = 404, message = "세탁소 조회 실패")
    })
    public ResponseEntity<? extends BaseResponseBody> GetLaundryReview(@PathVariable("laundry_id") String Id) {
        try {
            Long laundryId = Long.parseLong(Id);
            Laundry laundry = laundryService.selectLaundry(laundryId);
            if (laundry == null) {
                return ResponseEntity.status(404).body(
                        BaseResponseBody.of(404, "세탁소 조회 실패")
                );

            }
            List<Order> res = laundry.getOrders();

            return ResponseEntity.status(200).body(
                    ReviewGetRes.of(200, "Success", res)
            );
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body(
                    BaseResponseBody.of(500, "세탁소 리뷰 조회 실패")
            );
        }
    }


    @GetMapping("/walletaddr/{order_id}")
    @ApiOperation(value = "주문 지갑조회", notes = "주문 지갑조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 500, message = "주문 지갑조회"),
            @ApiResponse(code = 404, message = "주문 지갑조회")
    })
    public ResponseEntity<? extends BaseResponseBody> GetOrderAddr(@PathVariable("order_id") String Id) {
        try {
            Long OrderId = Long.parseLong(Id);
            Order order =orderService.selectOrder(OrderId);
            if (order == null) {
                return ResponseEntity.status(404).body(
                        BaseResponseBody.of(404, "세탁소 조회 실패")
                );

            }


            return ResponseEntity.status(200).body(
                    OrderAddrRes.of(200, "Success", order)
            );
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body(
                    BaseResponseBody.of(500, "세탁소 리뷰 조회 실패")
            );
        }
    }

}
