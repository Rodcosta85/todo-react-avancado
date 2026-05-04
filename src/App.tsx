import { useActivities } from './myContext';
import Header from './components/layout/Header';
import List from './components/List';
import FormFilters from './components/FormFilters';
import ProgressBar from './components/ProgressBar';

function App() {

  const {
    allActivities,
    deletedCount,
  } = useActivities();

  const totalEver = allActivities.length + deletedCount;
  const progressPercent = totalEver === 0 ? 0 : (deletedCount / totalEver) * 100;
  const roundNumber = Math.floor(progressPercent)

  return (
    <div className='flex flex-col justify-start items-center gap-12.5
    w-full h-full md:h-screen lg:h-screen pb-10
    bg-slate-900 text-white'>
      <Header />
      <div className='flex justify-center
      w-full pl-5 pr-5 md:pl-10 md:pr-10 lg:pl-20 lg:pr-20'>
        <div className='flex flex-col
      md:justify-between
      lg:justify-between
      md:flex-row lg:flex-row gap-10
      w-276'>
          <div className='flex flex-col gap-10 md:w-[50%] lg:w-[50%]'>
            <ProgressBar roundNumber={roundNumber} />
            <FormFilters />
          </div>
          <List />
        </div>
      </div>
    </div>
  )
}

export default App
