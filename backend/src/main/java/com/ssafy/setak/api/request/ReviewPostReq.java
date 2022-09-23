package com.ssafy.setak.api.request;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("ReviewPostRequest")
public class ReviewPostReq {

    @ApiModelProperty(name = "이미지를 보여주는가", example = "dbwowo@naver.com")
    boolean isImg;

    @ApiModelProperty(name = "리뷰 내용", example = "dbwowo")
    String content;

    @ApiModelProperty(name = "리뷰 점수", example = "dbwowo")
    int score;


}
