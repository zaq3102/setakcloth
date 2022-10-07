package com.ssafy.setak.api.service;

import com.ssafy.setak.api.request.OrderCreateReq;
import com.ssafy.setak.api.request.OrderDetailUpdateReq;
import com.ssafy.setak.api.request.ReviewPostReq;
import com.ssafy.setak.api.response.OrderDetailRes;
import com.ssafy.setak.db.entity.*;
import com.ssafy.setak.db.repository.*;
import io.ipfs.api.IPFS;
import io.ipfs.api.MerkleNode;
import io.ipfs.api.NamedStreamable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.admin.Admin;
import org.web3j.protocol.admin.methods.response.PersonalUnlockAccount;
import org.web3j.protocol.core.methods.request.Transaction;
import org.web3j.protocol.core.methods.response.EthSendTransaction;
import org.web3j.utils.Numeric;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

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
    private IPFS ipfs;

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

    public List<OrderDetailRes> getOrderDetails(Long orderId){
        Order order = orderRepository.findById(orderId).orElse(null);
        if(order != null){
            List<OrderDetailRes> orderDetailResList = new ArrayList<>();
            List<OrderDetail> orderDetails = order.getOrderDetails();

            String inputdata = null;

            if(orderDetails != null){
                for(OrderDetail detail : orderDetails){
                    List<String> urls1 = null;
                    List<String> urls2 = null;
                    List<String> urls3 = null;

                    String txHash1 = detail.getBlockAddr1();
                    String txHash2 = detail.getBlockAddr2();
                    String txHash3 = detail.getBlockAddr3();

                    if(txHash1 != null) {
                        inputdata = new String(Numeric.hexStringToByteArray(getImgUrls(txHash1)));
                        if(inputdata != null){
                            urls1 = Arrays.asList(inputdata.split(","));
                        }
                    }

                    if(txHash2!= null) {
                        inputdata = new String(Numeric.hexStringToByteArray(getImgUrls(txHash2)));
                        if(inputdata != null) {
                            urls2 = Arrays.asList(inputdata.split(","));
                        }
                    }

                    if(txHash3!= null) {
                        inputdata = new String(Numeric.hexStringToByteArray(getImgUrls(txHash3)));
                        if(inputdata != null) {
                            urls3 = Arrays.asList(inputdata.split(","));
                        }
                    }

                    OrderDetailRes orderDetailRes = OrderDetailRes.of(detail.getId(), detail.getName(), detail.getPrice(), urls1, urls2, urls3);
                    orderDetailResList.add(orderDetailRes);
                }
            }

            return orderDetailResList;
        }

        return null;
    }

    private String getImgUrls(String txHash){
        try {
            String inputdata = null;
            Optional<org.web3j.protocol.core.methods.response.Transaction> tx = web3j.ethGetTransactionByHash(txHash).send().getTransaction();
            if (tx.isPresent()) {
                inputdata = tx.get().getInput();
            }

            return inputdata;

        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Transactional
    public List<String> updateOrderDetail(Long orderDetailId, Long userId, List<MultipartFile> multipartFiles){
        List<String> imgUrls = new ArrayList<String>();
        OrderDetail orderDetail = orderDetailRepository.findById(orderDetailId).orElse(null);
        if(orderDetail == null){
            return null;
        }

        User user = userRepository.findById(userId).orElse(null);
        String userWalletAddr = user.getWalletAddr();

        String value = null;
        String urlsString = "";

        try {
//            PersonalUnlockAccount personalUnlockAccount = admin.personalUnlockAccount(ADMIN_ADDRESS, PASSWORD).send();
//            if (personalUnlockAccount.accountUnlocked()) {
                for (int i = 0; i < multipartFiles.size(); i++) {
                    InputStream inputStream = new ByteArrayInputStream(multipartFiles.get(i).getBytes());

                    NamedStreamable.InputStreamWrapper is = new NamedStreamable.InputStreamWrapper(inputStream);
                    MerkleNode response = ipfs.add(is).get(0);
                    String url = response.hash.toBase58();
                    imgUrls.add(url);
                    urlsString += (url  + ",");
                }
                urlsString = urlsString.substring(0, urlsString.length() - 1);

                org.web3j.protocol.core.methods.request.Transaction transaction = Transaction.createEthCallTransaction(ADMIN_ADDRESS, userWalletAddr, Numeric.toHexString(urlsString.getBytes(StandardCharsets.UTF_8)));
                EthSendTransaction ethCall = web3j.ethSendTransaction(transaction).sendAsync().get();
                value = ethCall.getTransactionHash();

                if(ethCall.getError() != null){
                    //에러 있을 때
                }
//            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        if(orderDetail != null){
            switch(orderDetail.getOrder().getState()){
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
            }
        }

        return imgUrls;
    }

    @Transactional
    public List<String> updateOrderDelivered(Long orderId, Long userId, List<MultipartFile> multipartFiles){
        List<String> imgUrls = new ArrayList<String>();
        Order order = orderRepository.findById(orderId).orElse(null);
        if(order == null){
            return null;
        }

        List<OrderDetail> orderDetails = order.getOrderDetails();

        User user = userRepository.findById(userId).orElse(null);
        String userWalletAddr = user.getWalletAddr();

        String value = null;
        String urlsString = "";

        try {
            //PersonalUnlockAccount personalUnlockAccount = admin.personalUnlockAccount(ADMIN_ADDRESS, PASSWORD).send();
            //if (personalUnlockAccount.accountUnlocked()) {
                for (int i = 0; i < multipartFiles.size(); i++) {
                    InputStream inputStream = new ByteArrayInputStream(multipartFiles.get(i).getBytes());

                    NamedStreamable.InputStreamWrapper is = new NamedStreamable.InputStreamWrapper(inputStream);
                    MerkleNode response = ipfs.add(is).get(0);
                    String url = response.hash.toBase58();
                    imgUrls.add(url);
                    urlsString += (url  + ",");
                }
                urlsString = urlsString.substring(0, urlsString.length() - 1);

                org.web3j.protocol.core.methods.request.Transaction transaction = Transaction.createEthCallTransaction(ADMIN_ADDRESS, userWalletAddr, Numeric.toHexString(urlsString.getBytes(StandardCharsets.UTF_8)));
                EthSendTransaction ethCall = web3j.ethSendTransaction(transaction).sendAsync().get();
                value = ethCall.getTransactionHash();

                if(ethCall.getError() != null){
                    //에러 있을 때
                }
            //}
        } catch (Exception e) {
            e.printStackTrace();
        }

        if(order.getState() == 2){
            if(value != null){
                for(OrderDetail orderDetail : orderDetails){
                    orderDetail.setBlockAddr3(value);
                }
            }
        }

        return imgUrls;
    }

    @Transactional
    public Order updateOrderState(Long orderId){
        Order order = orderRepository.findById(orderId).orElse(null);
        if(order == null){
            return null;
        }

        int state = 0;

        switch (order.getState()){
            case 0:
                state = 1;
                break;
            case 1:
                state = 2;
                break;
            case 2:
                state = 3;
                break;
        }

        order.setState(state);

        return order;
    }

    @Transactional
    public void registerReview(long orderId, ReviewPostReq reviewInfo) {
        Order order = orderRepository.findById(orderId).orElse(null);
        order.setReviewContent(reviewInfo.getContent());
        order.setReviewScore(reviewInfo.getScore());
        order.setReviewDate(LocalDateTime.now());
        order.setIsImg(reviewInfo.isImg());
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
