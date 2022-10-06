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
  const [myaddress, setMyaddress] = useState<string>('');
  const [laundryList, setLaundryList] = useState([]);
  const [align, setAlign] = useState('');
  const [openAddress, setOpenAddress] = useState(false);

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
        result = await LaundryDistRequest();
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

  const handleClose = () => {
    setOpenAddress(false);
  };

  const handleButton = (num) => {
    getList(num);
  };

  // 주소 변경 로직
  const AddressFunc = (value) => {
    setMyaddress(value);
  };

  return (
    <div>
      {/* 주소 */}
      <div className="ctm-home">
        <div className="ctm-address-area">세탁소 전체조회</div>
      </div>
      <Box sx={{ fontSize: 'small', alignI: 'center' }}>
        <Chip
          sx={{ mr: 1 }}
          size="small"
          color="color1"
          label="우리집"
          variant="outlined"
        />
        {myaddress}
        <Button
          sx={{ minWidth: 5 }}
          className="address-modify-btn"
          onClick={() => setOpenAddress(true)}>
          <ModeEditOutlineOutlinedIcon sx={{ fontSize: 20 }} color="color1" />
        </Button>
        {/* 주소 변경 모달 */}
        <Dialog open={openAddress} onClose={handleClose}>
          <Address
            AddressFunc={AddressFunc}
            handleClose={handleClose}
            type="change"
          />
        </Dialog>
      </Box>

      {/* 정렬 선택 */}
      <Box sx={{ textAlign: 'right' }}>
        <FormControl
          size="small"
          sx={{
            m: 0,
            mb: 1,
            mt: 1,
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
            <MenuItem
              onClick={() => handleButton(0)}
              value="최신 등록순"
              sx={{ fontSize: 'small', fontWeight: 'bold' }}>
              최신등록순
            </MenuItem>
            <MenuItem
              onClick={() => handleButton(1)}
              value="거리순"
              sx={{ fontSize: 'small', fontWeight: 'bold' }}>
              거리순
            </MenuItem>
            <MenuItem
              onClick={() => handleButton(2)}
              value="별점순"
              sx={{ fontSize: 'small', fontWeight: 'bold' }}>
              별점순
            </MenuItem>
            <MenuItem
              onClick={() => handleButton(3)}
              value="즐겨찾기"
              sx={{ fontSize: 'small', fontWeight: 'bold' }}>
              즐겨찾기
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

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
                image={
                  item.imgUrl
                    ? item.imgUrl
                    : 'https://setakcloth.s3.ap-northeast-2.amazonaws.com/fcf639ab-acd0-4d92-aa2c-562d7e7f1545_lndry.png'
                }
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
                <Box>
                  {item.score === -1 ? null : Math.round(item.score * 10) / 10}
                </Box>
              </div>
              <div className="item-content">
                <div className="laundry-location">
                  {item.addr} {item.addrDetail}
                </div>
                <div className="laundry-cost">
                  최소 이용 금액 : {item.minCost} CLN
                </div>
                <div className="laundry-cost">
                  배달비 : {item.deliverCost} CLN
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
