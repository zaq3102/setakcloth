import { LAUNDRY_ITEM_LIST, LAUNDRY_INFO } from '../types/types';
import { request, requestAuth } from './axios';

// 세탁소 전체 조회 (거리순)
export const LaundryDistRequest = async () => {
  try {
    const payload = await requestAuth.get('/laundry/distance');
    return payload;
  } catch (err) {
    return err;
  }
};

// 세탁소 전체 조회 (주문 많은 순)
export const LaundryManyRequest = async () => {
  try {
    const payload = await requestAuth.get('/laundry/order');
    return payload;
  } catch (err) {
    return err;
  }
};

// 세탁소 전체 조회 (별점 순)
export const LaundryScoreRequest = async () => {
  try {
    const payload = await requestAuth.get('/laundry/score');
    return payload;
  } catch (err) {
    return err;
  }
};

// 세탁소 등록
export const LaundryRegistRequest = async (dataToSubmit) => {
  try {
    const payload = await requestAuth.post('/laundry/create', dataToSubmit);
    return payload;
  } catch (err) {
    return err;
  }
};

// 사업자 세탁소 정보 가져오기
export const myLaundryRequest = async () => {
  try {
    const payload = await requestAuth.get('/laundry');
    return {
      type: LAUNDRY_INFO,
      payload
    };
  } catch (err) {
    return err;
  }
};

// 세탁소 하나 조회
export const LaundryDetailRequest = async (dataToSubmit) => {
  try {
    const payload = await requestAuth.get(`/laundry/${dataToSubmit}`);
    return payload;
  } catch (err) {
    return err;
  }
};

// 세탁소 아이템 전체 조회
export const myLaundryItemsRequest = async (dataToSubmit) => {
  try {
    const payload = await requestAuth.get(`/laundry/${dataToSubmit}/item`);
    return {
      type: LAUNDRY_ITEM_LIST,
      payload
    };
  } catch (err) {
    return err;
  }
};

// 세탁소 아이템 등록
export const LaundryItemAddRequest = async (data1, data2) => {
  try {
    const payload = await requestAuth.post(`/laundry/${data1}/item/add`, data2);
    return payload;
  } catch (err) {
    return err;
  }
};

// 세탁소 아이템 삭제
export const LaundryItemDelRequest = async (data1, data2) => {
  try {
    const payload = await requestAuth.post(
      `/laundry/${data1}/item/${data2}/delete`
    );
    return payload;
  } catch (err) {
    return err;
  }
};

// 세탁소 리뷰 조회
export const LaundryReviewRequest = async (dataToSubmit) => {
  try {
    const payload = await requestAuth.get(`/order/review/${dataToSubmit}`);
    return payload;
  } catch (err) {
    return err;
  }
};
