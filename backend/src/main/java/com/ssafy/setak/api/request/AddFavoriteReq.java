package com.ssafy.setak.api.request;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("AddFavoriteRequest")
public class AddFavoriteReq {

    @ApiModelProperty(name = "", example = "yoojaeyeol1234!")
    private long laundryId;
}
