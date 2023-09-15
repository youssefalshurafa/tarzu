import Image from 'next/image';

interface Banner {
  banner: string;
}

const Banner = ({ banner }: Banner) => {
  return (
    <Image
      src={banner}
      alt="banner"
      width={728}
      height={90}
      priority
      style={{ margin: 'auto' }}
    />
  );
};

export default Banner;
