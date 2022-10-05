package com.ssafy.setak.db.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name="`order`")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long id;

    private LocalDateTime date;
    private Long totalPrice;
    private int state;
    private String hash;

    private LocalDateTime reviewDate;
    private Integer reviewScore;
    private String reviewContent;

    @Enumerated(EnumType.STRING)
    private OrderType orderType;

    Boolean isImg;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "laundry_id")
    private Laundry laundry;



    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    private List<OrderDetail> orderDetails = new ArrayList<>();
}
