import backgroundMoney from '../assets/backgorund_money.png';
import backgroundBook from '../assets/background_book.jpg';
import backgroundExercise from '../assets/background_exercise.png';
import silhouetteMoney from '../assets/silhouette_money.png';
import silhouetteBook from '../assets/silhouette_book.png';
import silhouetteExercise from '../assets/silhouette_exercise.png';

export const IMAGE_INFO_DATA = [
  {
    id: 'i1',
    bgImgSrc: backgroundExercise,
    bgDescription: '운동 관련 배경 이미지',
    siImgSrc: silhouetteExercise,
    siDescription: '운동하는 사람 실루엣',
  },
  {
    id: 'i2',
    bgImgSrc: backgroundBook,
    bgDescription: '독서 관련 배경 이미지',
    siImgSrc: silhouetteBook,
    siDescription: '독서하는 사람 실루엣',
  },
  {
    id: 'i3',
    bgImgSrc: backgroundMoney,
    bgDescription: '투자 관련 배경 이미지',
    siImgSrc: silhouetteMoney,
    siDescription: '돈을 든 사람 실루엣',
  },
];
