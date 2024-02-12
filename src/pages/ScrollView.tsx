import {IMAGE_INFO_DATA} from '../util/imageData';
import ScrollViewItem from '../components/ScrollViewItem';

const ScrollView = () => {
  return (
    <>
      {IMAGE_INFO_DATA.map((item) => {
        let className = ' w-1/2 h-2/3 bottom-5 left-1/2 -translate-x-1/2';
        if (item.id === 'i2') {
          className = ' w-1/2 h-1/2 bottom-10 left-5';
        } else if (item.id === 'i3') {
          className = ' w-1/2 h-2/3 top-1/2 right-5 -translate-y-1/2';
        }

        return (
          <ScrollViewItem
            key={item.id}
            bgSrc={item.bgImgSrc}
            bgAlt={item.bgDescription}
            siSrc={item.siImgSrc}
            siAlt={item.siDescription}
            className={className}
          />
        );
      })}
    </>
  );
};

export default ScrollView;
