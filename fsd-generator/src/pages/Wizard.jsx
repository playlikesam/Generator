import { useState } from "react";
import Preview from "../components/Preview";

export default function Wizard() {
    const [step, setStep] = useState(1);

    const [fsdData, setFsdData] = useState({
        title: "",
        introduction: "",
        includeIntegration: null,
        dfdImage: null,
        includeUseCases: null,
        useCases: []
    });

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold text-blue-600 mb-6">
                FSD Generator 🚀
            </h1>

            <div className="mb-4 text-lg font-semibold">
                Step {step} of 4
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-xl">

                {/* STEP 1 */}
                {step === 1 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Enter FSD Title</h2>
                        <input
                            type="text"
                            placeholder="Enter title..."
                            className="border p-2 w-full rounded"
                            value={fsdData.title}
                            onChange={(e) =>
                                setFsdData({ ...fsdData, title: e.target.value })
                            }
                        />
                    </div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Introduction</h2>
                        <textarea
                            placeholder="Enter introduction..."
                            className="border p-2 w-full rounded"
                            value={fsdData.introduction}
                            onChange={(e) =>
                                setFsdData({
                                    ...fsdData,
                                    introduction: e.target.value
                                })
                            }
                        />
                    </div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-2">
                            Include Integration Section?
                        </h2>

                        <div className="flex gap-4 mb-4">
                            <button
                                onClick={() =>
                                    setFsdData({ ...fsdData, includeIntegration: true })
                                }
                                className={`px-4 py-2 rounded ${fsdData.includeIntegration === true
                                    ? "bg-green-600 text-white"
                                    : "bg-gray-300"
                                    }`}
                            >
                                Yes
                            </button>

                            <button
                                onClick={() =>
                                    setFsdData({ ...fsdData, includeIntegration: false })
                                }
                                className={`px-4 py-2 rounded ${fsdData.includeIntegration === false
                                    ? "bg-red-600 text-white"
                                    : "bg-gray-300"
                                    }`}
                            >
                                No
                            </button>
                        </div>

                        {fsdData.includeIntegration && (
                            <div>
                                <label className="block mb-2 font-medium">
                                    Upload DFD (PNG)
                                </label>
                                <input
                                    type="file"
                                    accept="image/png"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const imageUrl = URL.createObjectURL(file);
                                            setFsdData({
                                                ...fsdData,
                                                dfdImage: imageUrl
                                            });
                                        }
                                    }}
                                />
                            </div>
                        )}
                    </div>
                )}

                {step === 4 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-2">
                            Include Use Cases?
                        </h2>

                        <div className="flex gap-4 mb-4">
                            <button
                                onClick={() =>
                                    setFsdData({ ...fsdData, includeUseCases: true })
                                }
                                className={`px-4 py-2 rounded ${fsdData.includeUseCases === true
                                        ? "bg-green-600 text-white"
                                        : "bg-gray-300"
                                    }`}
                            >
                                Yes
                            </button>

                            <button
                                onClick={() =>
                                    setFsdData({ ...fsdData, includeUseCases: false })
                                }
                                className={`px-4 py-2 rounded ${fsdData.includeUseCases === false
                                        ? "bg-red-600 text-white"
                                        : "bg-gray-300"
                                    }`}
                            >
                                No
                            </button>
                        </div>

                        {fsdData.includeUseCases && (
                            <div>
                                <button
                                    className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
                                    onClick={() =>
                                        setFsdData({
                                            ...fsdData,
                                            useCases: [
                                                ...fsdData.useCases,
                                                {
                                                    description: "",
                                                    steps: "",
                                                    swimlane: null
                                                }
                                            ]
                                        })
                                    }
                                >
                                    + Add Use Case
                                </button>

                                {fsdData.useCases.map((uc, index) => (
                                    <div
                                        key={index}
                                        className="border p-4 mb-4 rounded"
                                    >
                                        <h3 className="font-semibold mb-2">
                                            Use Case {index + 1}
                                        </h3>

                                        <textarea
                                            placeholder="Description"
                                            className="border p-2 w-full mb-2"
                                            value={uc.description}
                                            onChange={(e) => {
                                                const updated = [...fsdData.useCases];
                                                updated[index].description = e.target.value;
                                                setFsdData({ ...fsdData, useCases: updated });
                                            }}
                                        />

                                        <textarea
                                            placeholder="Steps / Explanation"
                                            className="border p-2 w-full mb-2"
                                            value={uc.steps}
                                            onChange={(e) => {
                                                const updated = [...fsdData.useCases];
                                                updated[index].steps = e.target.value;
                                                setFsdData({ ...fsdData, useCases: updated });
                                            }}
                                        />

                                        <input
                                            type="file"
                                            accept="image/png"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    const updated = [...fsdData.useCases];
                                                    updated[index].swimlane =
                                                        URL.createObjectURL(file);
                                                    setFsdData({ ...fsdData, useCases: updated });
                                                }
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Navigation */}
            <div className="mt-6 flex gap-4">
                <button
                    onClick={() => setStep(step - 1)}
                    disabled={step === 1}
                    className="bg-gray-400 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    Back
                </button>

                <button
                    onClick={() => setStep(step + 1)}
                    disabled={step === 4}
                    className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            {/* DEBUG (Temporary) */}
            <Preview fsdData={fsdData} />
        </div>
    );
}