package com.ssafy.setak.api.response;

import com.ssafy.setak.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;




@Data
@ApiModel("UserResponse")
public class UserRes {
    @ApiModelProperty(name = "유저 ID", example = "123")
    Long userId;

    @ApiModelProperty(name = "CEO 이메일", example = "dbwowo@naver.com")
    String ceoEmail;

    @ApiModelProperty(name = "유저 이메일", example = "dbwowo@naver.com")
    String userEmail;

    @ApiModelProperty(name = "유저 닉네임", example = "벙글재열")
    String nickName;

    @ApiModelProperty(name = "유저 주소", example = "추후 수정 필요")
    String addr;

    @ApiModelProperty(name = "유저 상세 주소", example = "추후 수정 필요2")
    String addrDetail;

    @ApiModelProperty(name = "유저 주소의 위도", example = "37.241541")
    double addrLat;

    @ApiModelProperty(name = "유저 주소의 경도", example = "131.864935")
    double addrLng;

    @ApiModelProperty(name = "소셜 로그인 여부", example = "true")
    boolean isSocial;

    @ApiModelProperty(name = "타입", example = "true")
    String userType;

    @ApiModelProperty(name = "지갑주소", example = "123123123123123")
    String wallet;

    @ApiModelProperty(name = "잔고", example = "123123123123123")
    float balance;

    public static UserRes of (User user) {
        UserRes res = new UserRes();

        res.setUserId(user.getId());
        res.setUserEmail(user.getUserEmail());
        res.setCeoEmail(user.getCeoEmail());
        res.setNickName(user.getNickName());
        res.setAddr(user.getAddress().getAddr());
        res.setAddrDetail(user.getAddress().getAddrDetail());
        res.setAddrLat(user.getAddress().getAddrLat());
        res.setAddrLng(user.getAddress().getAddrLng());
        res.setSocial(user.isSocial());
        res.setUserType(user.getUserType().toString());
        res.setBalance(user.getBalance());
        res.setWallet(user.getWalletAddr());
        return res;
    }
}
