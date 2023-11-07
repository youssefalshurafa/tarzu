import Image from 'next/image';

interface Banner {
  banner: string;
}

const Banner = ({ banner }: Banner) => {
  return (
    <div className=" ">
      <Image
        src={banner}
        alt="banner"
        layout="responsive"
        width={500}
        height={500}
        priority
        style={{ margin: 'auto' }}
      />
    </div>
  );
};

export default Banner;
