export default function Preview({ fsdData }) {
  return (
    <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-3xl mt-10">

      {/* Title */}
      <h1 className="text-2xl font-bold text-center mb-6">
        {fsdData.title || "FSD Title"}
      </h1>

      {/* Introduction */}
      {fsdData.introduction && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">1. Introduction</h2>
          <p className="text-gray-700 whitespace-pre-line">
            {fsdData.introduction}
          </p>
        </div>
      )}

      {/* Integration Section */}
      {fsdData.includeIntegration && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">
            2. Integration & Data Flow
          </h2>

          <p className="text-gray-600 mb-3">
            Below is the data flow diagram:
          </p>

          {fsdData.dfdImage ? (
            <img
              src={fsdData.dfdImage}
              alt="DFD"
              className="w-full border rounded"
            />
          ) : (
            <p className="text-gray-400 italic">
              No diagram uploaded
            </p>
          )}
        </div>
      )}

      {fsdData.includeUseCases && fsdData.useCases.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">
            3. Use Cases
          </h2>

          {fsdData.useCases.map((uc, index) => (
            <div key={index} className="mb-6">
              <h3 className="font-semibold mb-2">
                Use Case {index + 1}
              </h3>

              <p className="mb-2">{uc.description}</p>

              {uc.swimlane && (
                <img
                  src={uc.swimlane}
                  className="w-full border rounded mb-2"
                />
              )}

              <p className="text-gray-700 whitespace-pre-line">
                {uc.steps}
              </p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}