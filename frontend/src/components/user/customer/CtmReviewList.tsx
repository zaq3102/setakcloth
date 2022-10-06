import { Card, CardContent, CardMedia, Pagination } from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { myReviewRequest } from '../../../store/actions/services/orderService';
import { InfoRequest } from '../../../store/actions/services/userService';
import '../../../styles/Customer.scss';

const CtmReviewList = () => {
  const navigate = useNavigate();
  const [reviewList, setReviewList] = useState([]);
  const [pageReview, setPageReview] = useState(1);

  const getMyReviews = async () => {
    const result = await myReviewRequest();
    if (result?.data?.reviews) {
      setReviewList(result?.data?.reviews);
    } else {
      navigate('/error');
    }
  };

  const pageReviewChange = (event, value) => {
    setPageReview(value);
  };

  useEffect(() => {
    getMyReviews();
  }, []);

  return (
    <div>
      <div className="ctm-title-bar">
        <div className="ctm-title-text">나의 리뷰 목록</div>
      </div>
      <div className="ctm-order-list">
        {/* {reviewList.map((review, idx) => (
        <Card
          sx={{ maxWidth: 2 / 7, maxHeight: 1 / 2, borderRadius: 10 }}
          key={idx}
          className="ctm-mypage-right-bottom-review">
          <CardMedia
            component="img"
            height="100"
            image="../assets/laundry1.jpg"
            alt="green iguana"
          />
          <CardContent
            className="ctm-mypage-right-bottom-review-text"
            sx={{ maxWidth: 1, maxHeight: 1 / 2 }}>
            [{review.laundryName}] {review.content}
          </CardContent>
        </Card>
      ))} */}
        {reviewList
          .sort((a, b) => {
            return (
              new Date(a.scheduled_for).getTime() -
              new Date(b.scheduled_for).getTime()
            );
          })
          .reverse()
          .slice((pageReview - 1) * 3, pageReview * 3)
          .map((review) => (
            <div className="laundry-my-review">
              <div className="review-wrap">
                <div className="review-wrap-left">
                  <img
                    className="laundry-my-review-img"
                    src="../assets/user.png"
                    alt="user-img"
                  />
                </div>
                <div>
                  <div className="laundry-my-review-info">
                    <div className="laundry-my-review-nickname">
                      {review.laundryName}
                    </div>
                    {/* <div className="laundry-my-review-rate">
                              <Rating
                                value={review.score}
                                readOnly
                                precision={0.5}
                                emptyIcon={<StarIcon />}
                                size="medium"
                              />
                            </div> */}
                    <div className="laundry-my-review-score-info-edited">
                      <img
                        className="laundry-my-review-star-img"
                        src="https://cdn-icons-png.flaticon.com/512/2107/2107957.png"
                        alt="star"
                      />
                      <div className="laundry-my-review-score">
                        {review.score}
                      </div>
                      <div className="laundry-my-review-content">
                        {review.content}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        <div className="ctm-laundry-toggle-review-page">
          <Pagination
            count={Math.ceil(reviewList.length / 3)}
            page={pageReview}
            variant="outlined"
            color="color2"
            className={`${
              reviewList.length === 0 ? 'ctm-no-pagination' : 'ctm-pagination'
            }`}
            onChange={pageReviewChange}
          />
        </div>
      </div>
    </div>
  );
};
export default CtmReviewList;
