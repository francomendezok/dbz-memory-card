import cloud from '../assets/goku-vs-vegeta.gif'


export default function Loading () {
  return (
    <div className="bgc-div flex flex-col justify-center items-center w-screen h-screen">
      <h1 className='text-center text-4xl mb-10'>Loading</h1>
      <img className='h-3/4' src={cloud} alt="" />
    </div>
  )
}