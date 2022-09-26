import React from "react";

const ServerElementSkeleton = () => (
  <div className="p-4 m-4 w-full bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700 md:w-5/12 lg:w-3/12">
    <div className="w-12 mb-4">
      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 "></div>
    </div>
    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
  </div>
);

export default function HomeSkeleton() {
  return (
    <div
      data-testid="home-skeleton"
      role="status"
      className="flex mt-16 flex-wrap justify-center w-full rounded shadow md:p-6 "
    >
      {Array(10)
        .fill(1)
        .map((_, index) => (
          <ServerElementSkeleton key={index} />
        ))}
    </div>
  );
}
