import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  ClickAwayListener,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  Grow,
  InputLabel,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Rating,
  Select,
  SelectChangeEvent,
  TextField
} from '@mui/material';
import { Box } from '@mui/system';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import StarIcon from '@mui/icons-material/Star';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import DaumPostcode from 'react-daum-postcode';
import '../../../styles/Customer.scss';
import { LaundryLatestRequest } from '../../../store/actions/services/laundryService';
import {
  changeAddrRequest,
  getLocationxyRequest,
  InfoRequest
} from '../../../store/actions/services/userService';

declare global {
  interface Window {
    kakao?: any;
  }
}
const { kakao } = window;

const CtmHome: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [myaddress, setMyaddress] = useState<string>('');
  const [addr, setAddr] = useState<string>('');
  const [addrDetail, setAddrDetail] = useState<string>('');
  const [latestLaundry, setLatestLaundry] = useState([]);
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

  const getLatestLaundry = async () => {
    const result = await LaundryLatestRequest();
    if (result?.data?.laundries) {
      setLatestLaundry(result?.data?.laundries);
    } else {
      console.log('error');
    }
  };

  useEffect(() => {
    getMyInfo();
    getLatestLaundry();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = async () => {
    const result1 = await getLocationxyRequest(`${addr} ${addrDetail}`);
    if (result1?.data?.documents) {
      const addrInfo = {
        addr,
        addrLat: result1?.data?.documents[0].y,
        addrLng: result1?.data?.documents[0].x,
        addrDetail
      };
      const result2 = await changeAddrRequest(addrInfo);
      if (result2?.data) {
        setMyaddress(`${addr} ${addrDetail}`);
      } else {
        navigate('/error');
      }
    } else {
      navigate('/error');
    }
    setOpen(false);
  };

  const handleButton = (mode) => {
    navigate('./laundrylist', { state: mode });
  };

  const handleComplete = async (data) => {
    setAddr(`${data.address} ${data.buildingName}`);
  };

  const addrDetailChange = (event) => {
    setAddrDetail(event.target.value);
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
            sx={{ minWidth: 5 }}
            className="address-modify-btn"
            onClick={handleClickOpen}>
            <ModeEditOutlineOutlinedIcon sx={{ fontSize: 20 }} color="color5" />
          </Button>
        </div>

        {/* 주소 변경 모달 창 */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>주소 변경하기</DialogTitle>
          <DaumPostcode autoClose={false} onComplete={handleComplete} />
          <TextField
            id="outlined-basic"
            label="상세 주소 입력"
            variant="outlined"
            value={addrDetail}
            onChange={addrDetailChange}
          />
          <DialogActions>
            <Button onClick={handleClose}>취소</Button>
            <Button onClick={handleChange}>변경</Button>
          </DialogActions>
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
          <InputLabel>
            <div className="inputlabel-default">최신 등록 순</div>
          </InputLabel>
          <Select
            displayEmpty
            value={align}
            onChange={handleSelect}
            inputProps={{ 'aria-label': 'Without label' }}>
            <MenuItem onClick={() => handleButton(1)} value="전체보기">
              전체보기
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
        {latestLaundry.map((item) => (
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
                <div className="laundry-location">
                  {item.addr} {item.addrDetail}
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
