import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y} from 'swiper/modules';

import "swiper/css"
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-coverflow';

import Image from 'next/image'

const SwiperBox = ()=>{
    return(
    <Swiper
        effect={'coverflow'}
        modules={[Navigation, Pagination, A11y]}
        navigation
        grabCursor={true}
        pagination={{ clickable: true }}
        spaceBetween={5}
        slidesPerView={1}
        // coverflowEffect={{
        //   rotate: 50,
        //   stretch: 0,
        //   depth: 100,
        //   modifier: 1,
        //   slideShadows: false,
        // }}
        onSlideChange={() => {
            //console.log('slide change')
        }}
        onSwiper={(swiper) => {
            //console.log(swiper)
        }}
        >
        <SwiperSlide>
            <Image
                    src="/images/reddead.jpg"
                    width="1900"
                    height="1000"
                    alt="swiper image"
                />
        </SwiperSlide>
        <SwiperSlide>
            <Image
                    src="/images/reddead.jpg"
                    width="1900"
                    height="1000"
                    alt="swiper image"
                />
        </SwiperSlide>
        <SwiperSlide>
            <Image
                    src="/images/reddead.jpg"
                    width="1900"
                    height="1000"
                    alt="swiper image"
                />
        </SwiperSlide>
    </Swiper>
    )
}
export default SwiperBox;