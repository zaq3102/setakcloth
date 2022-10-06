import {
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  RadioGroup,
  TextField,
  Button,
  Radio
} from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { myorderCeoRequest } from '../../../store/actions/services/orderService';
import Address from '../../../components/common/Address';
import {
  LaundryRegistRequest,
  myLaundryRequest
} from '../../../store/actions/services/laundryService';
import Swal from 'sweetalert2';

const CeoHome: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [state0, setState0] = useState([]);
  const [state1, setState1] = useState([]);
  const [state2, setState2] = useState([]);
  const [state3, setState3] = useState([]);

  // const modes = ['수락 대기중', '세탁중', '세탁 완료', '배달중'];
  const modes = [
    ['수락 대기중', state0],
    ['세탁중', state1],
    ['세탁 완료', state2],
    ['배달중', state3]
  ];
  const [orderList, setOrderList] = useState([]);

  // 아직 세탁소를 등록하지 않았을 때 쓸 값들
  const [openRegist, setOpenRegist] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const [regNum, setRegNum] = useState('');
  const [laundryName, setLaundryName] = useState<string>('');
  const [ceoName, setCeoName] = useState<string>('');
  const [regDate, setRegDate] = useState(
    new Date().toISOString().substr(0, 10)
  );
  const [description, setDescription] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [minCost, setMinCost] = useState(0);
  const [deliveryCost, setdeliveryCost] = useState(0);
  const [pickup, setPickup] = useState<boolean>(true);
  const [deliver, setDeliver] = useState<boolean>(true);

  const [addrInfo, setAddrInfo] = useState({});
  const [addr, setAddr] = useState('');
  const [addrDetail, setAddrDetail] = useState('');

  const handleDeliver = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === 'true') {
      setDeliver(true);
    } else {
      setDeliver(false);
      setdeliveryCost(0);
      setMinCost(0);
    }
  };

  const handlePickup = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === 'true') {
      setPickup(true);
    } else {
      setPickup(false);
    }
  };

  const handleMinCost = (event) => {
    if (event.target.value.trim() < 0) {
      setMinCost(0);
    } else {
      setMinCost(event.target.value.trim());
    }
  };

  const handleDeliveryCost = (event) => {
    if (event.target.value.trim() < 0) {
      setdeliveryCost(0);
    } else {
      setdeliveryCost(event.target.value.trim());
    }
  };

  // 주소 변경 로직
  const AddressFunc = (value) => {
    setAddrInfo(value);
    setAddr(value.addr);
    setAddrDetail(value.addrDetail);
  };

  const handleClose = (value) => {
    if (value === 4) {
      setOpenRegist(false);
    } else if (value === 5) {
      setOpenAddress(false);
    }
  };

  const handleRegistLaundry = async () => {
    const LaundryInfo = {
      regNum,
      laundryName,
      ceoName,
      regDate,
      addr: addrInfo.addr,
      addrDetail: addrInfo.addrDetail,
      addrLat: addrInfo.addrLat,
      addrLng: addrInfo.addrLng,
      deliver,
      pickup,
      description,
      contact,
      deliveryCost,
      minCost
    };

    const result = await LaundryRegistRequest(LaundryInfo);
    if (result?.data?.message === 'Success') {
      Swal.fire({
        width: 200,
        icon: 'success',
        text: '세탁소 등록이 완료되었습니다.'
      });
      handleClose(4);
      const result2 = await myLaundryRequest();
      if (result2?.payload?.data?.laundries) {
        dispatch(result2);
      } else {
        navigate('/error');
      }
    } else {
      navigate('/error');
    }
    handleClose(4);
  };

  const laundryId = useSelector(
    (state) => state?.laundry?.laundryInfo[0]?.laundryId
  );

  const onClickItem = (value: string) => {
    navigate(`./${value}`);
  };

  const getList = async () => {
    const result = await myorderCeoRequest(laundryId);
    if (result?.data?.orders) {
      const list = result?.data?.orders;
      setOrderList(list);
      setState0(list.filter((order) => order.state === 0));
      setState1(list.filter((order) => order.state === 1));
      setState2(list.filter((order) => order.state === 2));
      setState3(list.filter((order) => order.state === 3));
      console.log(list);
    } else {
      navigate('/error');
    }
  };

  useEffect(() => {
    if (laundryId) {
      getList();
    }
  }, []);

  return (
    <div>
      {laundryId ? (
        <div className="ceo-laundry-modes">
          {modes.map((mode) => (
            <div className="ceo-laundry-mode">
              <Chip label={mode[0]} color="color2" variant="outlined" />
              {mode[1].map((order) => (
                <div
                  key={order.orderId}
                  className="ceo-order-item"
                  onClick={() => onClickItem(order.orderId)}>
                  <span className="ceo-order-item-Time-text">
                    <span className="ceo-order-item-orderNo-text">
                      [주문 번호: {order.orderId}]{' '}
                    </span>
                    <div className="ceo-order-item-date">
                      주문 날짜: {order.date.substring(0, 16)}
                    </div>
                  </span>
                  <div className="ceo-order-item-text">
                    {order.userAddr} {order.userAddrDetail}
                  </div>
                  {order.orderType === 'DELIVERY' ? (
                    <Chip label="배달" color="color4" variant="contained" />
                  ) : (
                    <Chip label="수거" color="color3" variant="contained" />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="ceo-home-not-regist">
          <div className="ceo-home-not-regist-button">
            <div className="ceo-home-not-regist-text">
              세탁소를 등록해서 세탁클로쓰의 더 많은 서비스를 이용해보세요.
            </div>
            <div className="go-regist-button">
              <Button
                size="small"
                color="color1"
                variant="contained"
                onClick={() => setOpenRegist(true)}>
                세탁소 등록
              </Button>
            </div>
          </div>
          <div className="ceo-home-not-regist-img-div">
            <img
              src="https://setakcloth.s3.ap-northeast-2.amazonaws.com/prices.png"
              className="ceo-home-not-regist-img"
              alt="laundry-img"
            />
          </div>
        </div>
      )}

      {/* 모달 모음집 */}
      <Dialog open={openRegist} onClose={handleClose}>
        <div className="ceo-item-modal">
          <DialogTitle sx={{ fontSize: 'x-large', fontWeight: 'bold' }}>
            세탁소 등록하기
          </DialogTitle>
          <DialogContent>
            <div className="ceo-regist-laundry">
              <TextField
                sx={{ mt: 1, mb: 1, bgcolor: '#F8FFFD' }}
                variant="filled"
                focused
                color="color2_2"
                className="ceo-text-field"
                required
                label="사업자 등록번호"
                name="laundry-num"
                fullWidth
                value={regNum}
                onChange={(event) => setRegNum(event.target.value.trim())}
              />
              <TextField
                sx={{ mt: 1, mb: 1, bgcolor: '#F8FFFD' }}
                variant="filled"
                focused
                color="color2_2"
                required
                label="대표자 성명"
                name="ceo-name"
                fullWidth
                value={ceoName}
                inputProps={{
                  maxLength: 10
                }}
                onChange={(event) => setCeoName(event.target.value.trim())}
              />
              <TextField
                sx={{ mt: 2, mb: 1, bgcolor: '#F8FFFD' }}
                variant="filled"
                focused
                color="color2_2"
                required
                label="개업일자"
                name="reg-date"
                type="date"
                fullWidth
                value={regDate}
                onChange={(event) => setRegDate(event.target.value)}
              />
              <TextField
                sx={{ mt: 2, mb: 3, bgcolor: '#F8FFFD' }}
                variant="filled"
                focused
                color="color2_2"
                required
                label="상호명"
                name="laundry-name"
                fullWidth
                value={laundryName}
                inputProps={{
                  maxLength: 20
                }}
                onChange={(event) => setLaundryName(event.target.value)}
              />
              <div className="address-item">
                <div className="address-reg-btn">
                  <Button
                    onClick={() => setOpenAddress(true)}
                    variant="outlined"
                    color="color2_2">
                    주소 검색
                  </Button>
                </div>
                <TextField
                  sx={{ mt: 2, mb: 2, bgcolor: '#F8FFFD' }}
                  variant="filled"
                  focused
                  color="color2_2"
                  required
                  label="기본 주소"
                  name="laundry-addr"
                  fullWidth
                  value={addr}
                  disabled
                />
                <TextField
                  sx={{ mt: 2, bgcolor: '#F8FFFD' }}
                  variant="filled"
                  focused
                  color="color2_2"
                  required
                  label="상세 주소"
                  name="laundry-addr"
                  fullWidth
                  value={addrDetail}
                  disabled
                />
              </div>
              <TextField
                sx={{ mt: 3, mb: 1, bgcolor: '#F8FFFD' }}
                variant="filled"
                focused
                color="color2_2"
                required
                label="세탁소 설명"
                fullWidth
                multiline
                rows={5}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="최대 255자까지 작성할 수 있습니다."
                inputProps={{
                  maxLength: 255
                }}
              />
              <TextField
                sx={{ mt: 2, mb: 3, bgcolor: '#F8FFFD' }}
                variant="filled"
                focused
                color="color2_2"
                required
                label="세탁소 전화번호"
                fullWidth
                inputProps={{
                  maxLength: 15
                }}
                value={
                  contact
                  // .replace(/[^0-9]/g, '')
                  // .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)
                }
                onChange={(event) => setContact(event.target.value.trim())}
              />
              <div className="ceo-modal-bottom">
                <div className="bool-text">
                  배달 가능 여부
                  <RadioGroup value={deliver} onChange={handleDeliver}>
                    <FormControlLabel value control={<Radio />} label="가능" />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="배달 불가 (손님이 직접 수거)"
                    />
                    {deliver === true ? (
                      <>
                        <TextField
                          color="color2_2"
                          variant="filled"
                          focused
                          sx={{ mt: 3, mb: 1, bgcolor: '#F8FFFD' }}
                          required
                          label="최소 주문 금액"
                          fullWidth
                          type="number"
                          inputProps={{
                            step: 1000
                          }}
                          value={minCost}
                          onChange={handleMinCost}
                        />
                        <TextField
                          color="color2_2"
                          variant="filled"
                          focused
                          sx={{ mt: 2, mb: 2, bgcolor: '#F8FFFD' }}
                          required
                          label="배달료"
                          fullWidth
                          type="number"
                          inputProps={{
                            step: 1000
                          }}
                          value={deliveryCost}
                          onChange={handleDeliveryCost}
                        />
                      </>
                    ) : (
                      <></>
                    )}
                  </RadioGroup>
                </div>
                <div className="bool-text">
                  픽업(손님이 직접 수거) 가능 여부
                  <RadioGroup value={pickup} onChange={handlePickup}>
                    <FormControlLabel value control={<Radio />} label="가능" />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="불가능"
                    />
                  </RadioGroup>
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleRegistLaundry}
              focused
              variant="contained"
              color="color2_2"
              disabled={
                !regNum ||
                !laundryName ||
                !ceoName ||
                !addrInfo ||
                !description ||
                !contact
              }>
              등록하기
            </Button>
            <Button onClick={() => handleClose(4)} color="color2_2">
              취소
            </Button>
          </DialogActions>
        </div>
      </Dialog>

      {/* 주소 변경 모달 */}
      <Dialog open={openAddress} onClose={() => handleClose(5)}>
        <Address
          AddressFunc={AddressFunc}
          handleClose={handleClose}
          type="regist"
        />
      </Dialog>
    </div>
  );
};

export default CeoHome;
