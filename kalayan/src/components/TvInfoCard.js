import React from 'react';

export default function TvInfoCard({ tvData }) {
  const { id, size, installDate, subscription } = tvData || {};

  return (
    <div className=" dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md mx-auto">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">TV Information</h3>

      <div className="space-y-3 text-gray-700 dark:text-gray-300">
        <div className="flex justify-between">
          <span className="font-medium">TV ID:</span>
          <span>{id || "N/A"}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Screen Size:</span>
          <span>{size || "N/A"}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Installed On:</span>
          <span>{installDate || "N/A"}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Subscription Type:</span>
          <span>{subscription || "N/A"}</span>
        </div>
      </div>
    </div>
  );
}
