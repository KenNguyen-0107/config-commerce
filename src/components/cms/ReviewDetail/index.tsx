import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";

const ReviewDetail = () => {
  return (
    <div className="max-w-3xl mx-auto p-4 font-sans">
      {/* Header with overall rating */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-6 h-6 fill-[#00B67A] stroke-[#00B67A]"
              />
            ))}
          </div>
          <div className="flex items-center gap-2 text-lg">
            <span className="font-bold">4.8</span>
            <span className="text-gray-500">/5</span>
            <span className="text-gray-500 mx-2">•</span>
            <span className="text-gray-500">14 reviews</span>
          </div>
        </div>
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Jacksons_Fencing-ubspAOZ2SkbL1MB0H1XdHdfsZTxJ3s.png"
          alt="Trustpilot"
          width={82}
          height={20}
          className="h-5 w-auto"
        />
      </div>

      {/* Rating categories */}
      <div className="grid gap-4 mb-8">
        {[
          "Design",
          "Ease of purchase",
          "Materials",
          "Quality",
          "Value for money",
        ].map((category) => (
          <div key={category} className="flex items-center justify-between">
            <span className="text-sm">{category}</span>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[#00B67A] stroke-[#00B67A]"
                  />
                ))}
              </div>
              <span className="text-sm font-medium">4.8</span>
              <span className="text-sm text-gray-500">/5</span>
            </div>
          </div>
        ))}
      </div>

      {/* Review distribution */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4">Reviews 14</h2>
        <div className="space-y-2">
          {[
            { label: "Excellent", value: 100 },
            { label: "Great", value: 0 },
            { label: "Average", value: 0 },
            { label: "Poor", value: 0 },
            { label: "Bad", value: 0 },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center gap-4">
              <div className="w-16 text-sm text-gray-500">{label}</div>
              <div className="flex-1 h-6 bg-gray-100 rounded">
                <div
                  className="h-full bg-gray-300 rounded"
                  style={{ width: `${value}%` }}
                />
              </div>
              <div className="w-12 text-sm text-gray-500 text-right">
                {value}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Individual reviews */}
      <div className="space-y-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="border-b pb-8">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">Gillygate</div>
              <div className="text-sm text-gray-500">15 hours ago</div>
            </div>
            <div className="flex mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-[#00B67A] stroke-[#00B67A]"
                />
              ))}
              <button className="ml-2 text-sm text-gray-500 hover:underline">
                Detail
              </button>
            </div>
            <p className="text-sm mb-4">
              Very helpful sales team especially Steven Leeper, who helped me
              get the correct ...
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[...Array(3)].map((_, j) => (
                <Image
                  key={j}
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Jacksons_Fencing-HvH94f2EhqivPRzRcAOARtxgaKPDi8.png"
                  alt="Review image"
                  width={200}
                  height={150}
                  className="w-full h-auto rounded"
                />
              ))}
            </div>
            <div className="flex items-center gap-2 mt-4">
              <div className="w-4 h-4 rounded-full bg-gray-200" />
              <span className="text-sm text-gray-500">
                Verified, collected by Jacksons Fencing
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Load more button */}
      <button className="w-full py-3 text-center text-sm font-medium hover:bg-gray-50 mt-4">
        Load more reviews
      </button>
    </div>
  );
};

export default ReviewDetail;
