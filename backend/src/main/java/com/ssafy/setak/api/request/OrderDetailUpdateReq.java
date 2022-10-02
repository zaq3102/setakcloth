package com.ssafy.setak.api.request;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;

@Data
@ApiModel("OrderDetailUpdateRequest")
public class OrderDetailUpdateReq {
    @ApiModelProperty(name = "이미지 주소", example = "http://j7a706.p.ssafy.io:8085/ipfs/QmR5frs334UAfAfrrjWbTqFJsmEFEjomGFpGgFrmHqY3Za")
    List<String> imgUrl;
}
