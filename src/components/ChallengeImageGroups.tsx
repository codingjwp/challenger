import {ImageListTypes} from 'GlobalCommonTypes';

type ChallengeImageGroupsProps = {
  list: ImageListTypes[];
  imgLink?: string;
  onSelect?: (imgSrc: string) => void;
};
const ChallengeImageGroups = ({
  list,
  imgLink,
  onSelect,
}: ChallengeImageGroupsProps) => {
  return (
    <div className='grid gap-2 grid-cols-4 grid-rows-2 mb-4'>
      {list.map((item) => (
        <section
          key={item.id}
          className='flex flex-col w-full justify-center items-center'
        >
          <img
            className={`m-1 w-[7.5rem] h-[5rem] rounded object-cover ${imgLink === item.imgSrc && 'border-4 border-fuchsia-700'}`}
            id={item.type}
            src={`http://localhost:8080${item.imgSrc}`}
            alt={item.imgAlt}
            onClick={() => onSelect && onSelect(item.imgSrc)}
          />
          {item.success !== undefined && item.failure !== undefined && (
            <div className='flex justify-center items-center w-full m-1'>
              <span className='bg-teal-400 w-full rounded-lg text-center'>
                {item.success}
              </span>
              <span className='bg-rose-500 w-full rounded-lg text-center'>
                {item.failure}
              </span>
            </div>
          )}
        </section>
      ))}
    </div>
  );
};

export default ChallengeImageGroups;
