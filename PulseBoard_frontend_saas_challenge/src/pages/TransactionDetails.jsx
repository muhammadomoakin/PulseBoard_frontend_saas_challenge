import { useParams } from "react-router-dom";

const TransactionDetails = () => {
  const { id } = useParams();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Transaction Details</h1>
      <p className="mt-4 text-gray-600">Viewing transaction: {id}</p>
    </div>
  );
};

export default TransactionDetails;
