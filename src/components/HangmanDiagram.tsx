const HEAD = (
<div className="absolute right-[-24px] top-[30px] w-[50px] h-[50px] border-black border-2 rounded-full "/>
)

const BODY = (
    <div className="absolute top-[80px] right-0 w-[3px] h-[50px] bg-black"/>
)

 const RIGHT_ARM = (
<div  className="absolute top-[70px] right-0 origin-bottom-left rotate-[50deg] w-[3px] h-[40px] bg-black"/>
)

const LEFT_ARM = (
<div  className="absolute top-[70px] right-0 origin-bottom-right rotate-[-50deg] w-[3px] h-[40px] bg-black"/>
)

const LEFT_LEG = (
    <div  className="absolute top-[90px] right-[-2px] origin-bottom-left rotate-[-150deg] w-[3px] h-[40px] bg-black"/>
)

const RIGHT_LEG = (
<div  className="absolute top-[89px] right-[-4px] origin-bottom-left rotate-[150deg] w-[3px] h-[40px] bg-black"/>
)



type props = {
    numberOfGuesses: number
}

function HangmanDiagram({numberOfGuesses}:props) {
  return (
    <div className=" h-[250px] w-[160px] relative my-5">
        <div className="absolute top-0 left-[80px] w-[78px] h-[4px] bg-black"/>
        <div className="absolute top-0 right-0 h-[30px] w-[4px] bg-black"/>

        {numberOfGuesses>=1 && HEAD}
        {numberOfGuesses>=2 && BODY}
        {numberOfGuesses>=3 && RIGHT_ARM}
        {numberOfGuesses>=4 && LEFT_ARM}
        {numberOfGuesses>=5 && LEFT_LEG}
        {numberOfGuesses>=6 && RIGHT_LEG}

        <div className="absolute h-full w-[4px] bg-black left-[80px]"/>
        <div className="absolute bottom-0 h-[4px] w-full bg-black"/>
    </div>
  )
}

export default HangmanDiagram