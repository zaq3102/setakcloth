import { request, requestAuth } from './axios';

// 내 리뷰 조회
export const myReviewRequest = async () => {
  try {
    const payload = await requestAuth.get('/order/review');
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

// 고객 주문 정보 전체 조회
export const myorderCtmRequest = async () => {
  try {
    const payload = await requestAuth.get('/order');
    return payload;
  } catch (err) {
    return err;
  }
};

// 세탁소 주문 전체 조회
export const myorderCeoRequest = async (dataToSubmit) => {
  try {
    const payload = await requestAuth.get(`/order/laundry/${dataToSubmit}`);
    return payload;
  } catch (err) {
    return err;
  }
};

// 주문 등록
export const orderRequest = async (dataToSubmit) => {
  try {
    const payload = await requestAuth.post('/order/create', dataToSubmit);
    return payload;
  } catch (err) {
    return err;
  }
};

// 주문 하나 조회
export const getOrderRequest = async (dataToSubmit) => {
  try {
    const payload = await requestAuth.get(`/order/${dataToSubmit}`);
    return payload;
  } catch (err) {
    return err;
  }
};

// 주문 상세 변경
export const changeState = async (dataToSubmit, orderDetailId) => {
  try {
    const payload = await requestAuth.post(
      `/order/laundry/detail/${orderDetailId}/update`,
      dataToSubmit
    );
    return payload;
  } catch (err) {
    return err;
  }
};
