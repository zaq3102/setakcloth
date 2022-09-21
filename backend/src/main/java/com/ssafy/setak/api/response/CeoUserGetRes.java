package com.ssafy.setak.api.response;

import com.ssafy.setak.common.model.response.BaseResponseBody;
import com.ssafy.setak.db.entity.CeoUser;
import com.ssafy.setak.db.entity.User;
import io.swagger.annotations.ApiModel;
import lombok.Data;
import org.checkerframework.checker.units.qual.A;

@Data
@ApiModel("CeoUserGetResponse")
public class CeoUserGetRes extends BaseResponseBody {

    CeoUserRes ceoUserInfo;


    public static CeoUserGetRes of(Integer statusCode, String message, CeoUser userInfo) {
        CeoUserGetRes res = new CeoUserGetRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setCeoUserInfo(userInfo);
        return res;
    }

    public void setCeoUserInfo(CeoUser ceoUser) {
        this.ceoUserInfo = CeoUserRes.of(ceoUser);
    }


}
