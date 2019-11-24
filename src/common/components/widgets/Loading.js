import Lottie from '../../../libraries/Lottie'

export default () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: 999
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          opacity: 0.6,
          backgroundColor: '#000',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex'
        }}
      >
        <Lottie
          options={{
            animationData: require('../../../assets/animations/loading_common.json')
          }}
          style={{
            marginBottom: 150
          }}
          width={120}
          height={120}
        />
      </div>
    </div>
  )
}
