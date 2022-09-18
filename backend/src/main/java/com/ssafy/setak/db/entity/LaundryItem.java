package com.ssafy.setak.db.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LaundryItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "laundry_item_id")
    private Long id;

    private String name;
    private int price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "laundry_id")
    private Laundry laundry;
}
