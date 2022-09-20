package com.ssafy.setak.api.response;

import com.ssafy.setak.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@ApiModel("UserResponse")
public class UserRes {
    @ApiModelProperty(name = "유저 ID", example = "123")
    Long userId;

    @ApiModelProperty(name = "유저 이메일", example = "dbwowo@naver.com")
    String email;

    @ApiModelProperty(name = "유저 닉네임", example = "벙글재열")
    String nickName;

    @ApiModelProperty(name = "유저 주소", example = "추후 수정 필요")
    String addr;

    @ApiModelProperty(name = "유저 주소의 위도", example = "37.241541")
    float addrLat;

    @ApiModelProperty(name = "유저 주소의 경도", example = "131.864935")
    float addrLng;

    @ApiModelProperty(name = "소셜 로그인 여부", example = "true")
    boolean isSocial;

    public static UserRes of (User user) {
        UserRes res = new UserRes();
        res.setUserId(user.getId());
        res.setEmail(user.getEmail());
        res.setNickName(user.getNickName());
        res.setAddr(user.getAddr());
        res.setAddrLat(user.getAddrLat());
        res.setAddrLng(user.getAddrLng());
        res.setSocial(user.isSocial());
        return res;
    }
}
