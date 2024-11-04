type SquareProps = {
  value: boolean;
}
export const Square = ({ value }: SquareProps) => {
  return (
    <div className="flex mr-1">
      {[1, 2, 3].map((_, index) => <div key={index} className={`h-4 w-4 border border-black ${value ? 'bg-green-400 ' : 'bg-white'}`} />)}
    </div>
  )
};
