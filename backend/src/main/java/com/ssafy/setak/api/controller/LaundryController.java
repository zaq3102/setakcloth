package com.ssafy.setak.api.controller;

import com.ssafy.setak.api.request.LaundryCreateReq;
import com.ssafy.setak.api.request.LaundryItemAddReq;
import com.ssafy.setak.api.request.LaundryUpdateReq;
import com.ssafy.setak.api.response.LaundriesGetRes;
import com.ssafy.setak.api.response.LaundryDetailGetRes;
import com.ssafy.setak.api.response.LaundryGetRes;
import com.ssafy.setak.api.response.LaundryItemsGetRes;
import com.ssafy.setak.api.service.LaundryService;
import com.ssafy.setak.common.model.response.BaseResponseBody;
import com.ssafy.setak.db.entity.Laundry;
import com.ssafy.setak.db.entity.LaundryItem;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Tuple;
import java.util.List;


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
    public ResponseEntity<?> createLaundry(@RequestBody LaundryCreateReq laundryInfo) {
        Long ceoUserId = 2L;

        laundryService.createLaundry(ceoUserId, laundryInfo);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @GetMapping("/distance")
    @ApiOperation(value = "세탁소 전체 조회 - 거리순", notes = "세탁소 전체 조회 - 거리순")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 500, message = "세탁소 조회 실패"),
    })
    public ResponseEntity<?> getLaundryOrderByDistance() {
        Long userId = 1L;
        List<Tuple> laundries = laundryService.selectAllLaundryOrderByDistance(userId);

        return ResponseEntity.status(200).body(LaundriesGetRes.of(200, "Success", laundries));
    }

    @GetMapping("/order")
    @ApiOperation(value = "세탁소 전체 조회 - 주문 많은 순", notes = "세탁소 전체 조회 - 주문 많은 순")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 500, message = "세탁소 주문 많은 순 전체 조회 실패"),
    })
    public ResponseEntity<?> getLaundryOrderByOrder() {
        Long userId = 1L;
        List<Tuple> laundries = laundryService.selectAllLaundryOrderByOrder(userId);

        return ResponseEntity.status(200).body(LaundriesGetRes.of(200, "Success", laundries));
    }

    @GetMapping("/score")
    @ApiOperation(value = "세탁소 전체 조회 - 별점 순", notes = "세탁소 전체 조회 - 별점 순")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 500, message = "세탁소 별점 순 전체 조회 실패"),
    })
    public ResponseEntity<?> getLaundryOrderByScore() {
        Long userId = 1L;
        List<Tuple> laundries = laundryService.selectAllLaundryOrderByScore(userId);

        return ResponseEntity.status(200).body(LaundriesGetRes.of(200, "Success", laundries));
    }


    @GetMapping("/{laundry_id}")
    @ApiOperation(value = "세탁소 상세 조회", notes = "세탁소 상세 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 500, message = "세탁소 조회 실패"),
            @ApiResponse(code = 404, message = "세탁소 없음"),
    })
    public ResponseEntity<?> getLaundry(@PathVariable("laundry_id") Long laundryId) {
        Laundry laundry = laundryService.selectLaundry(laundryId);
        if (laundry != null) {
            return ResponseEntity.status(200).body(LaundryDetailGetRes.of(200, "Success", laundry));
        } else {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "Laundry Not Found"));
        }
    }


    @PostMapping("/{laundry_id}/update")
    @ApiOperation(value = "세탁소 수정", notes = "세탁소 수정")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 500, message = "세탁소 수정 실패"),
            @ApiResponse(code = 404, message = "세탁소 없음"),
    })
    public ResponseEntity<?> updateLaundry(@PathVariable("laundry_id") Long laundryId, @RequestBody LaundryUpdateReq laundryInfo) {
        if (laundryService.updateLaundry(laundryId, laundryInfo) != null)
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        else
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "Laundry Not Found"));
    }

    @PostMapping("/{laundry_id}/delete")
    @ApiOperation(value = "세탁소 삭제", notes = "세탁소 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 500, message = "세탁소 삭제 실패")
    })
    public ResponseEntity<?> deleteLaundry(@PathVariable("laundry_id") Long laundryId) {
        if (laundryService.deleteLaundry(laundryId)) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        } else {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "Laundry Not Found"));
        }
    }

    @PostMapping("/{laundry_id}/item/add")
    @ApiOperation(value = "세탁소 아이템 추가", notes = "세탁소 아이템 추가")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 500, message = "세탁소 아이템 추가 실패")
    })
    public ResponseEntity<?> addLaundryItem(@PathVariable("laundry_id") Long laundryId, @RequestBody LaundryItemAddReq laundryItemInfo) {
        laundryService.addLaundryItem(laundryId, laundryItemInfo);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @GetMapping("/{laundry_id}/item")
    @ApiOperation(value = "세탁소 아이템 전체 조회", notes = "세탁소 아이템 전체 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 500, message = "세탁소 아이템 전체 조회 실패"),
            @ApiResponse(code = 404, message = "세탁소 없음"),
    })
    public ResponseEntity<?> getLaundryItems(@PathVariable("laundry_id") Long laundryId) {
        List<LaundryItem> laundryItems = laundryService.getLaundryItems(laundryId);

        if (laundryItems != null) {
            return ResponseEntity.status(200).body(LaundryItemsGetRes.of(200, "Success", laundryItems));
        } else {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "Laundry Not Found"));
        }
    }

    @PostMapping("/{laundry_id}/item/{laundry_item_id}/update")
    @ApiOperation(value = "세탁소 아이템 수정", notes = "세탁소 아이템 수정")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 500, message = "세탁소 아이템 추가 실패")
    })
    public ResponseEntity<?> updateLaundryItem(@PathVariable("laundry_id") Long laundryId, @PathVariable("laundry_item_id") Long laundryItemId, @RequestBody LaundryItemAddReq laundryItemInfo) {
        LaundryItem laundryItem = laundryService.updateLaundryItem(laundryId, laundryItemId, laundryItemInfo);

        if (laundryItem != null) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        } else {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "Laundry or LaundryItem Not Found"));
        }
    }

    @PostMapping("/{laundry_id}/item/{laundry_item_id}/delete")
    @ApiOperation(value = "세탁소 아이템 삭제", notes = "세탁소 아이템 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 500, message = "세탁소 아이템 삭제 실패")
    })
    public ResponseEntity<?> deleteLaundryItem(@PathVariable("laundry_id") Long laundryId, @PathVariable("laundry_item_id") Long laundryItemId) {
        if (laundryService.deleteLaundryItem(laundryId, laundryItemId)) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        } else {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "Laundry or LaundryItem Not Found"));
        }
    }
}
