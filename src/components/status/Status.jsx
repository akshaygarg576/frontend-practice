const Status = ({ winner, nextPlayer }) => {
  return !winner ? (
    <h3>Next Player: {nextPlayer}</h3>
  ) : (
    <h1>Winner: {winner}</h1>
  );
};

export default Status;
