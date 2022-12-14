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
public class Laundry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "laundry_id")
    private Long id;

    private String regNum;
    private String laundryName;
    private String ceoName;
    private LocalDate regDate;

    @Embedded
    private Address address;

    private String imgUrl;
    private String description;
    private String contact;
    private boolean isPickup;
    private boolean isDeliver;
    private long minCost;
    private long deliveryCost;

    private LocalDateTime joinDate; //서비스 등록 날짜

    private long userId;

    @OneToMany(mappedBy = "laundry", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    private List<LaundryItem> laundryItems = new ArrayList<>();

    @OneToMany(mappedBy = "laundry", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    private List<Order> orders = new ArrayList<>();

    private boolean isWithdrawn;
}
