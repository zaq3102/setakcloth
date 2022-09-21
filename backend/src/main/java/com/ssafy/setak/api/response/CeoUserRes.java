package com.ssafy.setak.api.response;


import com.ssafy.setak.db.entity.CeoUser;
import com.ssafy.setak.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("CeoUserResponse")
public class CeoUserRes {

    @ApiModelProperty(name = "CEO ID", example = "123")
    Long ceoId;

    @ApiModelProperty(name = "CEO 이메일", example = "dbwowo@naver.com")
    String email;


    @ApiModelProperty(name = "소셜 로그인 여부", example = "true")
    boolean isSocial;


    public static CeoUserRes of (CeoUser ceoUser) {
        CeoUserRes res = new CeoUserRes();
        res.setCeoId(ceoUser.getId());
        res.setEmail(ceoUser.getEmail());
        res.setSocial(ceoUser.isSocial());

        return res;
    }


}
