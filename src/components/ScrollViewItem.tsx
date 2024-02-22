import Button from '@ui/Button';

type ScrollViewItemProps = {
  viewId: string;
  bgSrc: string;
  bgAlt: string;
  siSrc: string;
  siAlt: string;
  className?: string;
  viewContent: string;
  onMovePath: () => void;
};

const ScrollViewItem = ({
  viewId,
  bgSrc,
  bgAlt,
  siSrc,
  siAlt,
  className,
  viewContent,
  onMovePath,
}: ScrollViewItemProps) => {
  const siImgStyle = 'absolute z-1' + (className ? className : '');

  return (
    <section className='relative h-screen snap-center'>
      <div
        className={`absolute top-20 z-[1] text-center w-full ${viewId === 'i2' ? 'text-white' : 'text-black'}`}
      >
        <h2 className='font-sans text-[44px] font-bold'>{viewContent}</h2>
        <Button
          onClick={onMovePath}
          mode='text'
          className='uppercase tracking-widest text-3xl hover:text-red-600 hover:underline hover:underline-offset-[10px]'
        >
          challenge
        </Button>
      </div>
      <img
        className='absolute top-0 left-0 w-full h-full object-cover'
        src={bgSrc}
        alt={bgAlt}
      />
      <img className={siImgStyle} src={siSrc} alt={siAlt} />
    </section>
  );
};

export default ScrollViewItem;
