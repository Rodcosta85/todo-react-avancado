import { useActivities } from './myContext';
import Header from './components/layout/Header';
import List from './components/List';
import FormFilters from './components/FormFilters';
import ProgressBar from './components/ProgressBar';

function App() {

  const {
    allActivities,
    resetApp
  } = useActivities();

  const totalTasks = allActivities.length;
  const completedTasks = allActivities.filter(activity => activity.isCompleted).length;
  const progressPercent = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
  const roundNumber = Math.floor(progressPercent);

  return (
    <div className='flex flex-col justify-start items-center gap-12.5
    w-full h-screen pb-10
    bg-slate-900 text-white'>
      <Header />
      <div className='flex flex-col gap-2 items-center justify-center
      pl-5 pr-5 md:pl-10 md:pr-10 lg:pl-20 lg:pr-20'>
        <h2 className='font-medium text-2xl text-center'>TriTask, seu administrador de to-do favorito</h2>
        <p className='text-center text-sm'>Adicione, conclua a task, recomece-a, ou delete por completo. Se quiser, também temos a opção de começar tudo do zero!</p>
      </div>
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
      <button
        onClick={resetApp}
        className='py-2 px-4 rounded-md bg-orange-400 font-bold cursor-pointer'>
        RECOMEÇAR
      </button>
    </div>
  )
}

export default App
