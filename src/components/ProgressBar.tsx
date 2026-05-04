interface BarProps {
    roundNumber: number
}

const ProgressBar: React.FC<BarProps> = ({ roundNumber }) => {
  return (
    <div className='flex flex-col gap-4'>
          <h2 className='text-[20px] text-center'>Porcentagem de conclusão ---- {roundNumber}%</h2>
          {/* barra de progresso em si */}
          <div
            className="progress-bar-container"
            style={{
              width: '100%',
              backgroundColor: '#E5E5E5', 
              height: '20px',
              border: '1px solid',
              padding: '1px'
            }}>
            <div
              className="progress-bar-fill"
              style={{
                width: `${roundNumber}%`,
                backgroundColor: 'oklch(0.75 0.183 55.934)',     
                height: '100%',
                transition: 'width 0.3s ease-in-out'
              }}/>
          </div>
        </div>
  )
}

export default ProgressBar