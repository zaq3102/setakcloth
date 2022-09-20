package com.ssafy.setak.api.controller;

import com.ssafy.setak.api.request.LaundryCreateReq;
import com.ssafy.setak.api.request.LaundryUpdateReq;
import com.ssafy.setak.api.service.LaundryService;
import com.ssafy.setak.common.model.response.BaseResponseBody;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sun.jvm.hotspot.code.ScopeDesc;

@Api(value = "Laundry API", tags = {"Laundry"})
@RestController
@RequestMapping("/laundry")
public class LaundryController {

    @Autowired
    private LaundryService laundryService;

    @PostMapping("/create")
    @ApiOperation(value = "세탁소 등록", notes = "세탁소 등록")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 500, message = "세탁소 등록 실패")
    })
    public ResponseEntity<?> createLaundry(@RequestBody LaundryCreateReq laundryInfo){
        Long ceoUserId = 1L;

        laundryService.createLaundry(ceoUserId, laundryInfo);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    //TODO: 세탁소 전체 조회 - 거리순
    //TODO: 세탁소 전체 조회 - 리뷰많은 순 (특정거리 이내)
    //TODO: 세탁소 전체 조회 - 별점 순 (특정거리 이내)
    //TODO: 세탁소 상세 조회

    @PostMapping("/{laundry_id}/update")
    @ApiOperation(value = "세탁소 수정", notes = "세탁소 수정")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 500, message = "세탁소 수정 실패"),
            @ApiResponse(code = 404, message = "세탁소 없음"),
    })
    public ResponseEntity<?> updateLaundry(@PathVariable("laundry_id") Long laundryId, @RequestBody LaundryUpdateReq laundryInfo){
        if(laundryService.updateLaundry(laundryId, laundryInfo))
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        else
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "Laundry Not Found"));
    }

    //TODO: 세탁소 삭제
}
