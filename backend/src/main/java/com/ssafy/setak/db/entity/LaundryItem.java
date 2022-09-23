package com.ssafy.setak.db.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LaundryItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "laundry_item_id")
    private Long id;

    private String name;
    private long price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "laundry_id")
    private Laundry laundry;
}
