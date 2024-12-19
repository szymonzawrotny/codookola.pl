import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y} from 'swiper/modules';

import "swiper/css"
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-coverflow';

import Image from 'next/image'

const SwiperBox = ({path="/images/default.jpg",path2="/images/default.jpg",path3="/images/default.jpg"})=>{
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
                    src={path}
                    width="1900"
                    height="1000"
                    alt="swiper image"
                />
        </SwiperSlide>
        <SwiperSlide>
            <Image
                    src={path2}
                    width="1900"
                    height="1000"
                    alt="swiper image"
                />
        </SwiperSlide>
        <SwiperSlide>
            <Image
                    src={path3}
                    width="1900"
                    height="1000"
                    alt="swiper image"
                />
        </SwiperSlide>
    </Swiper>
    )
}
export default SwiperBox;