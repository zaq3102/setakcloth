package com.ssafy.setak.api.service;

import com.ssafy.setak.api.request.OrderCreateReq;
import com.ssafy.setak.api.request.OrderDetailUpdateReq;
import com.ssafy.setak.api.request.ReviewPostReq;
import com.ssafy.setak.db.entity.*;
import com.ssafy.setak.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.admin.Admin;
import org.web3j.protocol.admin.methods.response.PersonalUnlockAccount;
import org.web3j.protocol.core.methods.request.Transaction;
import org.web3j.protocol.core.methods.response.EthSendTransaction;
import org.web3j.utils.Numeric;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class OrderService {
    // 사용할 이더리움 지갑의 주소
    @Value("${eth.admin.address}")
    private String ADMIN_ADDRESS;
    // 지갑의 암호화된 패스워드
    @Value("${eth.encrypted.password}")
    private String PASSWORD;
    // 사용할 이더리움 지갑의 키스토어
    @Value("${eth.admin.wallet.filename}")
    private String ADMIN_WALLET_FILE;

    @Autowired
    private Web3j web3j;

    @Autowired
    private Admin admin;

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

        HashMap<Long, Integer> orderDetails = orderInfo.getOrderDetails();

        LaundryItem laundryItem = null;
        for (Map.Entry<Long, Integer> entry : orderDetails.entrySet()) {
            laundryItem = laundryItemRepository.findById(entry.getKey()).orElse(null);

            if(laundryItem != null) {
                for (int i = 0; i < orderDetails.get(entry.getKey()); i++) {
                    orderDetailRepository.save(OrderDetail.builder()
                            .order(order)
                            .name(laundryItem.getName())
                            .price(laundryItem.getPrice())
                            .build());
                }
            }
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
    public OrderDetail updateOrderDetail(Long orderDetailId, Long userId, OrderDetailUpdateReq orderInfo){
        OrderDetail orderDetail = orderDetailRepository.findById(orderDetailId).orElse(null);
        if(orderDetail == null){
            return null;
        }
        List<String> urls = orderInfo.getImgUrl();
        User user = userRepository.findById(userId).orElse(null);
        String userWalletAddr = user.getWalletAddr();

        String value = null;
        String urlsString = "";

        try {
            PersonalUnlockAccount personalUnlockAccount = admin.personalUnlockAccount(ADMIN_ADDRESS, PASSWORD).send();
            if (personalUnlockAccount.accountUnlocked()) {
                for (int i = 0; i < urls.size(); i++) {
                    urlsString += "," + urls.get(i);
                }

                org.web3j.protocol.core.methods.request.Transaction transaction = Transaction.createEthCallTransaction(ADMIN_ADDRESS, userWalletAddr, Numeric.toHexString(urlsString.getBytes(StandardCharsets.UTF_8)));
                EthSendTransaction ethCall = web3j.ethSendTransaction(transaction).sendAsync().get();
                value = ethCall.getTransactionHash();

                if(ethCall.getError() != null){
                    //에러 있을 때
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        if(orderDetail != null){
            switch(orderInfo.getState()){
                case 0:
                    if(value != null){
                        orderDetail.setBlockAddr1(value);
                    }
                    break;
                case 1:
                    if(value != null){
                        orderDetail.setBlockAddr2(value);
                    }
                    break;
                case 2:
                    if(value != null){
                        orderDetail.setBlockAddr3(value);
                    }
                    break;
            }
        }

        return orderDetail;
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
