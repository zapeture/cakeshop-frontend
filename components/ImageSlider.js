import { useEffect, useState } from 'react';
import styled from 'styled-components';
const Wrapper = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: hidden;

  @media screen and (max-width: 768px) {
    height: 50vh;
  }
`;
const Slide = styled.div`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  background-position: center;
  background-size: 90%;
  background-repeat: no-repeat;
  transition: 750ms all ease-in-out;
  @media screen and (max-width: 768px) {
    background-size: 90%;
  }
`;

const ChildrenWrapper = styled.div`
  position: absolute;
  width: 50%;
  top: 20%;
  left: 30%;
  text-align: center;

  padding: 10px;
  color: #634f35;
  transform: translate(-50%, -50%);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  background: rgb(99, 79, 53, 0.3);
  border-radius: 5px;

  p {
    font-size: 1.5rem;
  }
`;

const ImageSlider = ({
  images = [],
  autoPlay = true,
  autoPlayTime = 3000,
  children,
  ...props
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide(newSlideIndex + 1);

      const newSlideIndex =
        currentSlide > images.length - 1 ? 0 : currentSlide + 1;

      setCurrentSlide(newSlideIndex);
    }, autoPlayTime);

    return () => clearTimeout(timer);
  }, [currentSlide, autoPlayTime]);
  return (
    <Wrapper {...props}>
      {images[0].map((image, index) => (
        <Slide
          key={index}
          style={{
            backgroundImage: `url(${image.url})`,
            marginLeft: index === 0 ? `-${currentSlide * 100}%` : undefined,
          }}></Slide>
      ))}
      <ChildrenWrapper>{children}</ChildrenWrapper>
    </Wrapper>
  );
};

export default ImageSlider;
