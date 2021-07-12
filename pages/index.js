import Head from 'next/head';
import styled from 'styled-components';
import { API_URL } from '../utils/urls';
import ImageSlider from '../components/ImageSlider';
import Showcase from './showcase';
import { useRouter } from 'next/router';

const Home = ({ heroes }) => {
  const data = heroes.map((pic) => pic.hero_image);

  const reductImages = data[0].map((item) => item.url);

  const router = useRouter();

  const goToProducts = (e) => {
    e.preventDefault();
    router.push('/products');
  };

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <HomePage id='landing'>
        {heroes.map((hero, index) => (
          <div className='hero' key={index}>
            <div className='text-side'>
              <div className='hero-text'>
                <h1>{hero.cursive_slogan}</h1>
                <p>{hero.hero_text}</p>

                <button onClick={goToProducts} className='btn'>
                  More
                </button>
              </div>
            </div>
            <div className='image-side'>
              <ImageSlider images={[...reductImages]}>
                <p>Great tasting cakes</p>
                <small>{hero.slideshow_tag}</small>
              </ImageSlider>
            </div>
          </div>
        ))}
      </HomePage>
      <Showcase heroes={heroes} />
    </>
  );
};

const HomePage = styled.div`
  /* global start */
  width: 100%;
  position: relative;
  background: url(/images/henry-co-tqu0IOMaiU8-unsplash.jpg) no-repeat center
    center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  font-family: 'Quicksand', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .hero {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(1, 1fr);
    justify-content: center;
    align-items: center;
  }

  .text-side {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .hero-text {
    width: 100%;
    margin: 10px auto;
    text-align: center;
    width: 80%;
    line-height: 1.2;
    background: rgb(99, 79, 53, 0.2);
    border-radius: 5px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  }

  .text-side h1 {
    font-size: 5rem;
    letter-spacing: 0.3rem;
    font-weight: 500;
    border-bottom: 1px solid #634f35;
    color: #634f35;
    font-family: 'bella_scriptregular';
    text-align: center;
  }
  .hero-text p {
    font-size: 1.1rem;
    line-height: 1.5;
  }
  .text-side button {
    border: none;
    padding: 15px 80px;
    background: #634f35;
    color: #e1c089;
    margin: 10px;
    font-size: 1.2rem;
    transition: 0.5s ease-in-out;
    border-radius: 8px;
  }
  .text-side button:hover {
    background: #e1c089;
    color: #27221b;
  }

  .image-side {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
  }

  @media screen and (max-width: 768px) {
    .hero {
      grid-template-columns: repeat(1, 1fr);
      grid-template-rows: repeat(2, 1fr);
    }

    .text-side {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
    }

    .text-side h1 {
      font-size: 5.3rem;
    }

    .image-side {
      grid-row: 1 / 2;
    }

    .hero-text p {
      font-size: 1rem;
      line-height: 2;
    }
  }
`;

export async function getServerSideProps(contex) {
  const heroes_res = await fetch(`${API_URL}/heroes/`);

  const heroes = await heroes_res.json();

  return {
    props: {
      heroes: heroes,
    },
  };
}

export default Home;
