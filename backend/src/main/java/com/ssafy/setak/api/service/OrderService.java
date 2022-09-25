package com.ssafy.setak.api.service;

import com.ssafy.setak.api.request.OrderCreateReq;
import com.ssafy.setak.api.request.ReviewPostReq;
import com.ssafy.setak.db.entity.*;
import com.ssafy.setak.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private LaundryItemRepository laundryItemRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LaundryRepository laundryRepository;

    @Transactional
    public void createOrder(Long userId, OrderCreateReq orderInfo) {
        LocalDateTime date = LocalDateTime.now();

        List<Long> orderDetails = orderInfo.getOrderDetails();
//        long count = 0;
//        for (int i = 0; i < orderDetails.size(); i++) {
//            Long laundryItemID = orderDetails.get(i);
//            LaundryItem laundryItem = laundryItemRepository.findById(laundryItemID).orElse(null);
//            count += laundryItem.getPrice();
//        }
        Order order = Order.builder()
                .date(date)
                .totalPrice(orderInfo.getTotalPrice())
                .state(0)
                .hash("hash")
                .orderType(orderInfo.getOrderType() == 0 ? OrderType.DELIVERY : OrderType.PICKUP)
                .user(userRepository.findById(userId).orElse(null))
                .laundry(laundryRepository.findById(orderInfo.getLaundryId()).orElse(null))
                .build();
        orderRepository.save(order);

        for (int i = 0; i < orderDetails.size(); i++) {
            Long laundryItemID = orderDetails.get(i);
            orderDetailRepository.save(OrderDetail.builder()
                    .laundryItemId(laundryItemID)
                    .order(order)
                    .build());
        }


    }

    public Order selectOrder(Long orderId) {
        Order order = orderRepository.findById(orderId).orElse(null);

        if (order != null) {
            return order;
        }

        return null;
    }

    @Transactional
    public void registerReview(long orderId, ReviewPostReq reviewInfo) {
        Order order = orderRepository.findById(orderId).orElse(null);
        System.out.println(order.getId());
        order.setReviewContent(reviewInfo.getContent());
        order.setReviewScore(reviewInfo.getScore());
        order.setReviewDate(LocalDate.now());
        order.setIsImg(reviewInfo.isImg());
        System.out.println(order.getReviewContent());
        orderRepository.save(order);

    }

    public List<Order> getOrdersbyUserId(Long userId) {
        List<Order> orders = orderRepository.findByUserId(userId);
        return orders;
    }


    public List<Order> getOrdersByLaundryId(Long laundryId) {
        List<Order> orders = orderRepository.findByLaundryId(laundryId);
        return orders;
    }
}
