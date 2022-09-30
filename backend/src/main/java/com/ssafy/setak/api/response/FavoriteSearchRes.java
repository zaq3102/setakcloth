package com.ssafy.setak.api.response;
import com.ssafy.setak.common.model.response.BaseResponseBody;
import com.ssafy.setak.db.entity.Favorite;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("FavoriteGetResponse")
public class FavoriteSearchRes extends BaseResponseBody  {

    @ApiModelProperty(name = "즐겨찾기 유무")
    Boolean isFavorite;


    public static FavoriteSearchRes of(Integer statusCode, String message,Boolean state) {
        FavoriteSearchRes res = new FavoriteSearchRes();
        res.isFavorite=state;
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;


    }


}
