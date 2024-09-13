

export default function Dice({generateDice,toggleLock,dice,lockedDice}) {

    return (
        <div className="flex flex-wrap">
            {dice.map((dieValue, index) => (
                <div
                    key={index}
                    className={`flex-col box-border border-2 ${
                        lockedDice[index] ? 'border-border-colors  bg-Text-C text-back ' : 'border-border-colors bg-back text-Text-C'
                    } rounded-lg w-1/6 sm:w-1/6 lg:w-1/6 justify-center text-center mt-5 ml-5 mb-5  h-14 sm:h-10 content-center hover:shadow-lg cursor-pointer`}
                    onDoubleClick={() => toggleLock(index)}
                >
                    <h1>{dieValue}</h1>
                </div>
            ))}
        </div>
    );
}
