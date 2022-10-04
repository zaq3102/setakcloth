import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  SelectChangeEvent
  TextField
} from '@mui/material';
import { Box } from '@mui/system';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import StarIcon from '@mui/icons-material/Star';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import '../../../styles/Customer.scss';
import Address from '../../../components/common/Address';
import {
  LaundryLatestRequest,
  LaundryDistRequest,
  LaundryScoreRequest
} from '../../../store/actions/services/laundryService';

import {
  LaundryLikeRequest,
  InfoRequest
} from '../../../store/actions/services/userService';

const CtmHome: React.FC = () => {
  const navigate = useNavigate();
  const [openAddress, setOpenAddress] = useState(false);
  const [myaddress, setMyaddress] = useState<string>('');
  const [laundryList, setLaundryList] = useState([]);
  const [align, setAlign] = React.useState('');

  const handleSelect = (event: SelectChangeEvent) => {
    setAlign(event.target.value as string);
  };

  const getMyInfo = async () => {
    const result = await InfoRequest();
    if (result?.data?.userInfo) {
      const userInfo = result?.data?.userInfo;
      setMyaddress(`${userInfo.addr} ${userInfo.addrDetail}`);
    } else {
      navigate('/error');
    }
  };

  const onclicklaundry = (value: number) => {
    navigate(`./${value}`);
  };

  const getList = async (value) => {
    let result = '';
    switch (value) {
      case 0: // 최신순
        result = await LaundryLatestRequest();
        break;
      case 1: // 거리순
        result = await LaundryDistRequest();
        break;
      case 2: // 별점순
        result = await LaundryScoreRequest();
        break;
      case 3: // 즐겨찾기
        result = await LaundryLikeRequest();
        break;
      default: // 초기 값, 최신순
        result = await LaundryLatestRequest();
        break;
    }
    if (result?.data?.laundries) {
      setLaundryList(result?.data?.laundries);
    } else if (result?.data?.laundrys) {
      setLaundryList(result?.data?.laundrys);
    } else {
      navigate('/error');
    }
  };

  useEffect(() => {
    getMyInfo();
    getList();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleButton = (num) => {
    getList(num);
  };

  // 주소 변경 로직
  const AddressFunc = (value) => {
    setMyaddress(value);
  };

  const handleClose = () => {
    setOpenAddress(false);
  };

  return (
    <div>
      {/* 주소 */}
      <div className="ctm-home">
        <div className="ctm-address-area">
          <div className="my-address-title">
            <Chip
              size="small"
              color="color5"
              label="우리집"
              variant="outlined"
            />
          </div>
          <div className="my-address-content">{myaddress}</div>
          <Button
            className="address-modify-btn"
            onClick={() => setOpenAddress(true)}>
            sx={{ minWidth: 5 }}
            <ModeEditOutlineOutlinedIcon sx={{ fontSize: 20 }} color="color5" />
          </Button>
        </div>

        {/* 주소 변경 모달 */}
        <Dialog open={openAddress} onClose={handleClose}>
          <Address
            AddressFunc={AddressFunc}
            handleClose={handleClose}
            type="change"
          />
        </Dialog>
      </div>

      {/* 정렬 선택 */}
      <div className="select-area">
        <FormControl
          sx={{
            m: 0,
            p: 0,
            minWidth: 120
          }}
          className="select">
          <InputLabel sx={{ fontSize: 7 }}>
            <div className="inputlabel-default">정렬</div>
          </InputLabel>
          <Select
            displayEmpty
            onChange={handleSelect}
            inputProps={{ 'aria-label': 'Without label' }}>
            <MenuItem onClick={() => handleButton(0)} value="최신 등록순">
              최신등록순
            </MenuItem>
            <MenuItem onClick={() => handleButton(1)} value="거리순">
              거리순
            </MenuItem>
            <MenuItem onClick={() => handleButton(2)} value="별점순">
              별점순
            </MenuItem>
            <MenuItem onClick={() => handleButton(3)} value="즐겨찾기">
              즐겨찾기
            </MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* 최신 세탁소 5개 리스트 */}
      <div className="latest-list-area">
        {laundryList.map((item) => (
          <Card
            key={item.laundryId}
            id="laundryCard"
            sx={{
              padding: 1,
              margin: 0.5,
              boxShadow: 0,
              backgroundColor: '#e0ebf5'
            }}
            onClick={() => onclicklaundry(item.laundryId)}>
            <div className="item-content-left">
              <CardMedia
                id="cardImg"
                component="img"
                image="../assets/ctmhome0.png"
              />
            </div>
            {/* image={item.imgUrl} /> */}
            <CardContent sx={{ p: 1 }} id="item-content-right">
              <div className="item-title-area">
                <div className="item-title">{item.laundryName}</div>
                <Rating
                  name="text-feedback"
                  value={item.score}
                  readOnly
                  precision={0.5}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="large" />
                  }
                  size="large"
                />
                <Box>{item.score === -1 ? null : item.score}</Box>
              </div>
              <div className="item-content">
<<<<<<< frontend/src/components/user/customer/CtmHome.tsx
                <div className="item-content-left">
                  <div className="laundry-location">
                    {item.addr} {item.addrDetail}
                  </div>
                </div>
                <div className="laundry-cost">
                  최소 이용금액 : {item.minCost}원, 배달비 : {item.deliverCost}
                  원
                </div>
              </div>
              <div className="item-chips">
                {item.deliver ? (
                  <Chip
                    className="delivery-chip"
                    label="배달 가능"
                    size="small"
                    color="color1"
                    variant="outlined"
                  />
                ) : null}
                {item.pickup ? (
                  <Chip
                    label="수거 가능"
                    size="small"
                    color="default"
                    variant="outlined"
                  />
                ) : null}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CtmHome;
