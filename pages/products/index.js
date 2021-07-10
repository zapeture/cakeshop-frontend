import styled from 'styled-components';
import Head from 'next/dist/next-server/lib/head';
import Link from 'next/link';
import Image from 'next/image';
import { API_URL } from '../../utils/urls';
import { twoDecimals } from '../../utils/format';
export default function Products({ products }) {
  return (
    <>
      <Head>
        <title>Products</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <ProductsStyles id='products'>
        <h1 className='section-title'>Our Cakes</h1>
        <div className='products-grid'>
          {products.map((product) => (
            <div className='card' key={product._id}>
              <Link href={`/products/${product.slug}`}>
                <a>
                  <Image
                    src={product.image.url}
                    alt={product.image.name}
                    width={500}
                    height={500}
                  />
                  <div className='product-details'>
                    <p>{product.name}</p>
                    <h4>${twoDecimals(product.price)}</h4>
                  </div>
                </a>
              </Link>
            </div>
          ))}
        </div>
      </ProductsStyles>
    </>
  );
}

const ProductsStyles = styled.div`
  a {
    text-decoration: none;
  }
  width: 100%;
  min-height: 100vh;
  background: url(/images/henry-co-tqu0IOMaiU8-unsplash.jpg) no-repeat center
    center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  font-family: 'Quicksand', sans-serif;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 3rem;
    text-align: center;
    margin: 20px auto;
    color: #27221b;
  }

  .products-grid {
    margin: auto;
    width: 90%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(2, 2fr);
    grid-gap: 30px;
  }

  .products-grid .card {
    max-width: 499px;
    background: #634f35;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 30px 90px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    transition: all 0.5s ease-in-out;
  }
  .products-grid .card:hover {
    transform: scale(1.05);
  }
  .products-grid .card img {
    width: 100%;
    border-radius: 5px;
  }

  .products-grid .card .product-details {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .products-grid .card .product-details p {
    text-align: center;
    color: #e1c089;
    font-size: 1.1rem;
    font-weight: 300;
    margin: 5px 0;
  }
  .products-grid .card .product-details h4 {
    text-align: center;
    color: #f4f0e1;
    font-size: 1.3rem;
    margin: 5px 0;
  }
  .products-grid .card .product-details .btn {
    padding: 5px 20px;
    background: #e1c089;
    border: none;
    font-size: 1.2rem;
    font-family: 'Quicksand', sans-serif;
    margin: 10px 0;
  }
  .products-grid .card .product-details .btn:hover {
    background: #f4f0e1;
    color: #27221b;
  }

  @media (max-width: 1201px) {
    .products-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  @media (max-width: 1024px) {
    .products-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media (max-width: 768px) {
    .products-grid {
      grid-template-columns: repeat(2, 1fr);
      margin-bottom: 40px;
    }
  }

  @media only screen and (max-width: 500px) {
    .products-grid {
      grid-template-columns: repeat(1, 6fr);
      margin-bottom: 40px;
    }
  }
`;

export async function getServerSideProps(context) {
  //fetch the products
  const product_res = await fetch(`${API_URL}/products/`);

  const products = await product_res.json();

  return {
    props: {
      products: products,
    },
  };
}
