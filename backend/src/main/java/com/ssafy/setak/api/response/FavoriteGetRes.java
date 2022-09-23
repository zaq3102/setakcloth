package com.ssafy.setak.api.response;

import com.ssafy.setak.common.model.response.BaseResponseBody;
import com.ssafy.setak.db.entity.Favorite;
import com.ssafy.setak.db.entity.Laundry;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@ApiModel("FavoriteGetResponse")
public class FavoriteGetRes extends BaseResponseBody {

    @ApiModelProperty(name = "세탁 아이템")
    List<FavoriteLaundryGetRes> laundrys;


    public static FavoriteGetRes of(Integer statusCode, String message, List<Favorite> favorites) {
        FavoriteGetRes res = new FavoriteGetRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setLaundrys(favorites);
        return res;
    }
    public void setLaundrys(List<Favorite> favorites){
        this.laundrys = new ArrayList<FavoriteLaundryGetRes>();
        for(Favorite favorite : favorites){
            this.laundrys.add(FavoriteLaundryGetRes.of(favorite));
        }
    }


}
