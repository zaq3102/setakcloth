package com.ssafy.setak.db.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="`order`")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long id;

    private LocalDateTime date;
    private float totalPrice;
    private int state;
    private String hash;

    private LocalDate reviewDate;
    private int reviewScore;
    private String reviewContent;

    @Enumerated(EnumType.STRING)
    private OrderType orderType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "laundry_id")
    private Laundry laundry;



    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    private List<OrderDetail> orderDetails = new ArrayList<>();
}
