import { useEffect, useRef, useState } from 'react';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import './CustomersReviewSlider.scss';
import nextId from 'react-id-generator';
import Modal from '../../../../shared-components/Modal/Modal';
import ratingSprite from '../../../../assets/icons/rating/sprite-rating.svg';
import CustomerReview from './components/CustomerReview/CustomerReview';
import CommentTextarea from './components/CommentTextArea/CommentTextarea';
import { useAppSelector } from '../../../../hooks/hooks';

const CustomersReviewSlider = () => {
    const [modalActive, setModalActive] = useState<boolean>(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [ratingError, setRatingError] = useState(false);
    const [rating, setRating] = useState(0);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [reviewSubmit, setReviewSubmit] = useState<boolean>(false);
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const { reviews } = useAppSelector(
        (state) => state.productInformation.productInfo
    );

    const handleStarClick = (selectedRating: number) => {
        setRating(selectedRating);
    };

    const updateSubmitButtonStatus = (newName: string, newEmail: string) => {
        if (newName.trim() !== '' && newEmail.trim() !== '') {
            setIsSubmitDisabled(false);
        } else {
            setIsSubmitDisabled(true);
        }
    };

    const handleNameChange = (event: any) => {
        const newName = event.target.value;
        setName(newName);
        updateSubmitButtonStatus(newName, email);
    };

    const handleEmailChange = (event: any) => {
        const newEmail = event.target.value;
        setEmail(newEmail);
        updateSubmitButtonStatus(name, newEmail);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (name === '') {
            setNameError(true);
        } else {
            setNameError(false);
        }

        if (email === '') {
            setEmailError(true);
        } else {
            setEmailError(false);
        }

        if (rating > 1) {
            setRatingError(false);
        } else {
            setRatingError(true);
        }
    };

    useEffect(() => {
        if (name !== '') {
            setNameError(false);
        }

        if (email !== '') {
            setEmailError(false);
        }

        if (rating > 1) {
            setRatingError(false);
        }
    }, [name, email, rating]);

    const stars = () => {
        return (
            <div className="stars-rating">
                {[1, 2, 3, 4, 5].map((starIndex) => (
                    <svg
                        key={starIndex}
                        width="20"
                        height="20"
                        onClick={() => handleStarClick(starIndex)}
                    >
                        <use
                            href={`${ratingSprite}#${
                                starIndex <= rating ? 'active' : 'inactive'
                            }`}
                        />
                    </svg>
                ))}
            </div>
        );
    };

    return (
        <>
            <div className="container">
                <div className="customers-review">
                    <div className="customers-review__slider-top">
                        <h1 className="customers-review__slider-top_title">
                            Відгуки покупців
                        </h1>
                        <div className="customers-review__navigation">
                            <button
                                className="customers-review__prev-btn"
                                type="button"
                                aria-label="попередній слайд"
                                ref={prevRef}
                            >
                                <svg
                                    className="customers-review__prev-icon"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g id="02.Icons/Arrow">
                                        <path
                                            id="Line 2 (Stroke)"
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M7.82475 16.8011L2.25628 12.4801C1.91457 12.215 1.91457 11.785 2.25628 11.5199L7.82475 7.19887C8.16646 6.93371 8.72048 6.93371 9.06218 7.19887C9.40389 7.46403 9.40389 7.89393 9.06218 8.15909L4.98744 11.321L23 11.321L23 12.679L4.98744 12.679L9.06218 15.8409C9.40389 16.1061 9.40389 16.536 9.06218 16.8011C8.72048 17.0663 8.16646 17.0663 7.82475 16.8011Z"
                                        />
                                    </g>
                                </svg>
                            </button>
                            <button
                                className="customers-review__next-btn"
                                type="button"
                                aria-label="наступний слайд"
                                ref={nextRef}
                            >
                                <svg
                                    className="customers-review__next-icon"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g id="02.Icons/Arrow">
                                        <path
                                            id="Line 2 (Stroke)"
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M16.1753 7.19887L21.7437 11.5199C22.0854 11.785 22.0854 12.215 21.7437 12.4801L16.1753 16.8011C15.8335 17.0663 15.2795 17.0663 14.9378 16.8011C14.5961 16.536 14.5961 16.1061 14.9378 15.8409L19.0126 12.679L1 12.679L1 11.321L19.0126 11.321L14.9378 8.15909C14.5961 7.89394 14.5961 7.46403 14.9378 7.19887C15.2795 6.93371 15.8335 6.93371 16.1753 7.19887Z"
                                        />
                                    </g>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <Swiper
                        slidesPerView={4}
                        modules={[Navigation]}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        breakpoints={{
                            0: {
                                slidesPerView: 'auto',
                            },
                            340: {
                                slidesPerView: 2,
                            },
                            400: {
                                slidesPerView: 2,
                            },
                            424: {
                                slidesPerView: 2,
                            },
                            546: {
                                slidesPerView: 2,
                            },
                            700: {
                                slidesPerView: 3,
                            },
                            810: {
                                slidesPerView: 3,
                            },
                            1100: {
                                slidesPerView: 3,
                            },
                            1294: {
                                slidesPerView: 4,
                            },
                        }}
                        className="mySwiper"
                    >
                        {reviews?.map((review) => (
                            <SwiperSlide key={nextId('customer-review')}>
                                <CustomerReview
                                    name={review.userName}
                                    dateAdded={review.data}
                                    content={review.review}
                                    rating={review.rating}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <button
                        onClick={() => setModalActive(true)}
                        type="button"
                        className="customers-review__button"
                    >
                        Написати відгук
                    </button>
                </div>
            </div>
            <Modal
                active={modalActive}
                setActive={setModalActive}
                isDataLoadedToServer={reviewSubmit}
                setisDataLoadedToServer={setReviewSubmit}
                isSubmitedText="Ваш відгук успішно додано!"
                maxwidth="916px"
            >
                <div>
                    <h1 className="customers-review__modal_title">
                        Написати відгук
                    </h1>
                    <div className="customers-review__modal_rating">
                        <h2 className="customers-review__modal_rating_title">
                            Ваша оцінка
                        </h2>
                        {stars()}
                        {ratingError && (
                            <p className="rating-error">
                                Необхідно поставити оцінку
                            </p>
                        )}
                    </div>
                    <form
                        className="customers-review__modal_form modal-form"
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <div className="customers-review__modal_inputs">
                            <input
                                type="text"
                                className={`customers-review__modal_inputs_input ${
                                    nameError ? 'error' : ''
                                }`}
                                placeholder="Ваше ім’я*"
                                value={name}
                                onChange={handleNameChange}
                            />
                            <input
                                type="text"
                                className={`customers-review__modal_inputs_input ${
                                    emailError ? 'error' : ''
                                }`}
                                placeholder="Ел. пошта*"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        <CommentTextarea />
                        <button
                            onClick={() => {
                                if (!isSubmitDisabled) {
                                    setReviewSubmit(true);
                                }
                            }}
                            className="customers-review__modal_button"
                            type="submit"
                        >
                            Додати відгук
                        </button>
                    </form>
                </div>
            </Modal>
        </>
    );
};

export default CustomersReviewSlider;
