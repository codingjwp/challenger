import {motion, useAnimation} from 'framer-motion';
import {useEffect} from 'react';

type LoadingSvgProps = {
  isAnimation: boolean;
};

export const LoadingSvg = ({isAnimation}: LoadingSvgProps) => {
  const contral = useAnimation();
  useEffect(() => {
    if (isAnimation) {
      contral.start({
        rotate: 360,
        transition: {
          duration: 1,
          repeat: Infinity,
        },
      });
    } else {
      contral.stop();
    }
    return () => contral.stop();
  }, [isAnimation, contral]);

  return (
    <motion.svg
      animate={contral}
      xmlns='http://www.w3.org/2000/svg'
      height='24'
      viewBox='0 -960 960 960'
      width='24'
      className={`${isAnimation && 'fill-black/80'}`}
    >
      <path d='M522-80v-82q34-5 66.5-18t61.5-34l56 58q-42 32-88 51.5T522-80Zm-80 0Q304-98 213-199.5T122-438q0-75 28.5-140.5t77-114q48.5-48.5 114-77T482-798h6l-62-62 56-58 160 160-160 160-56-56 64-64h-8q-117 0-198.5 81.5T202-438q0 104 68 182.5T442-162v82Zm322-134-58-56q21-29 34-61.5t18-66.5h82q-5 50-24.5 96T764-214Zm76-264h-82q-5-34-18-66.5T706-606l58-56q32 39 51 86t25 98Z' />
    </motion.svg>
  );
};

type SvgTypes = {
  className?: string;
};

export const ChallengeSvg = ({className}: SvgTypes) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height='24'
      viewBox='0 -960 960 960'
      width='24'
      className={className}
    >
      <path d='m387-412 35-114-92-74h114l36-112 36 112h114l-93 74 35 114-92-71-93 71ZM240-40v-309q-38-42-59-96t-21-115q0-134 93-227t227-93q134 0 227 93t93 227q0 61-21 115t-59 96v309l-240-80-240 80Zm240-280q100 0 170-70t70-170q0-100-70-170t-170-70q-100 0-170 70t-70 170q0 100 70 170t170 70ZM320-159l160-41 160 41v-124q-35 20-75.5 31.5T480-240q-44 0-84.5-11.5T320-283v124Zm160-62Z' />
    </svg>
  );
};
export const DashboardSvg = ({className}: SvgTypes) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height='24'
      viewBox='0 -960 960 960'
      width='24'
      className={className}
    >
      <path d='M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z' />
    </svg>
  );
};
export const LogoutSvg = ({className}: SvgTypes) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height='24'
      viewBox='0 -960 960 960'
      width='24'
      className={className}
    >
      <path d='M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z' />
    </svg>
  );
};

type DouqhuntSvgTypes = {
  radius: number;
  colors: string[];
  texts: string[];
  dataset: number[];
};

export const DouqhuntSvg = ({
  radius,
  colors,
  texts,
  dataset,
}: DouqhuntSvgTypes) => {
  const diameter = 2 * Math.PI * radius;
  const total = dataset.reduce((r, v) => r + v, 0);
  const acc = dataset.reduce(
    (arr, v) => {
      const last = arr[arr.length - 1];
      return [...arr, last + v];
    },
    [0],
  );

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 300 300'
      width='280'
      height='280'
    >
      {dataset.map((data, i) => {
        const ratio = data / total;
        const fillSpace = diameter * ratio;
        const emptySpace = diameter - fillSpace;
        const offset = (acc[i] / total) * diameter;
        return (
          <circle
            key={i}
            cx='140'
            cy='140'
            r={`${radius}`}
            fill='transparent'
            stroke={`${colors[i]}`}
            strokeWidth='80'
            strokeDasharray={`${fillSpace} ${emptySpace}`}
            strokeDashoffset={`${-offset}`}
          />
        );
      })}
    </svg>
  );
};
