type ScrollViewItemProps = {
  bgSrc: string;
  bgAlt: string;
  siSrc: string;
  siAlt: string;
  className?: string;
};

const ScrollViewItem = ({
  bgSrc,
  bgAlt,
  siSrc,
  siAlt,
  className,
}: ScrollViewItemProps) => {
  const siImgStyle = 'absolute z-1' + (className ? className : '');
  return (
    <section className='relative h-screen'>
      <img
        className='absolute top-0 left-0 w-full h-full object-fill'
        src={bgSrc}
        alt={bgAlt}
      />
      <img className={siImgStyle} src={siSrc} alt={siAlt} />
    </section>
  );
};

export default ScrollViewItem;
