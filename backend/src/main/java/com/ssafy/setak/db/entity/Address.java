package com.ssafy.setak.db.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Embeddable
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Address {
    private String addr;
    private String addrDetail;
    private float addrLat;
    private float addrLng;
}

