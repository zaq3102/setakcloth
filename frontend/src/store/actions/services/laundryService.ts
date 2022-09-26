import { request, requestAuth } from './axios';

// 세탁소 전체 조회 (거리순)
export const LaundryDistRequest = async () => {
  try {
    const payload = await requestAuth.get('/laundry/distance');
    console.log(payload);
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
