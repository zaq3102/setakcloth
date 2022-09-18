package com.ssafy.setak.db.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CeoUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ceo_user_id")
    private Long id;

    private String email;
    private String pwd;
    private boolean isSocial;
    private boolean isWithdrawn;

    @OneToOne
    @JoinColumn(name = "ceo_wallet_id")
    private CeoWallet ceoWallet;

    @OneToMany(mappedBy = "ceoUser", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    private List<Laundry> laundries = new ArrayList<>();
}
