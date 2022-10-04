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
import { LaundryLatestRequest } from '../../../store/actions/services/laundryService';
import { InfoRequest } from '../../../store/actions/services/userService';
import Address from '../../../components/common/Address';

const CtmHome: React.FC = () => {
  const navigate = useNavigate();
  const [openAddress, setOpenAddress] = useState(false);
  const [myaddress, setMyaddress] = useState<string>('');
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

  const handleButton = (mode) => {
    navigate('./laundrylist', { state: mode });
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

      <div className="select-area">
        <FormControl className="select">
          <InputLabel id="select-label">최신 등록 순</InputLabel>
          <Select
            labelId="select"
            id="select"
            value={align}
            label="정렬"
            onChange={handleSelect}>
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
            sx={{ padding: 1, margin: 1 }}
            onClick={() => onclicklaundry(item.laundryId)}>
            <CardMedia
              id="cardImg"
              component="img"
              image="../assets/ctmhome0.png"
            />
            {/* image={item.imgUrl} /> */}
            <CardContent id="laundryBox">
              <div className="item-title-area">
                <div className="item-title">{item.laundryName}</div>
                <Rating
                  name="text-feedback"
                  value={item.score}
                  readOnly
                  precision={0.5}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                  size="large"
                />
                <Box>{item.score === -1 ? null : item.score}</Box>
              </div>
              <div className="item-content">
                <div className="item-content-left">
                  <div className="laundry-location">
                    {item.addr} {item.addrDetail}
                  </div>
                  <div className="laundry-cost">
                    <div className="laundry-mincost">
                      최소 이용금액 : {item.minCost}원
                    </div>
                    <div>배달비 : {item.deliverCost}원</div>
                  </div>
                </div>
                <div className="item-content-right">
                  <div className="item-chips">
                    {item.deliver ? (
                      <Chip
                        className="delivery-chip"
                        label="배달"
                        size="small"
                        color="color1"
                        variant="outlined"
                      />
                    ) : null}
                    {item.pickup ? (
                      <Chip
                        label="수거"
                        size="small"
                        color="default"
                        variant="outlined"
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CtmHome;
