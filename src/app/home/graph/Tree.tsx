// components/Tree.jsx
import React from "react";
import Link from "next/link";
import { useState } from "react";

const TreeNode = ({ node }: { node: any }) => {
  return (
    <div className="flex flex-col items-start relative ml-8 pt-4">
      {/* Node Content */}
      <Link
        href={`/home/profile/${node.id}`}
        className="border-2 border-black bg-white px-6 py-3 rounded-lg shadow-[3px_3px_0_0_#000] 
          transition-transform hover:translate-x-0.5 hover:translate-y-0.5 relative z-10"
      >
        <span className="font-medium text-gray-900">{node.name}</span>
      </Link>

      {/* Children */}
      {node.children?.length > 0 && (
        <div className="relative mt-4 border-l-2 border-black ml-4 pl-4 space-y-4">
          {node.children.map((childNode: any, index: number) => (
            <div key={index} className="relative">
              {/* Vertical connector */}
              <div className="absolute w-4 h-[2px] bg-black top-6 -left-4" />
              <TreeNode node={childNode} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Tree = ({ data, data2 }: { data: any; data2?: any }) => {
  const [showSecondTree, setShowSecondTree] = useState(true);
  console.log(showSecondTree);
  console.log(data);
  console.log(data2);
  return (
    <div
      className="w-full max-w-4xl mx-auto p-6 border-2 border-black bg-[#f0fff7] rounded-xl 
        shadow-[5px_5px_0_0_#000] overflow-x-auto"
      style={{ maxHeight: "80vh" }}
    >
      <h2 className="text-3xl font-black mb-6 text-[#FF6B6B]">Your Ripples</h2>


      {/* Toggle Checkbox */}
      {data2 && (
        <label className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            className="w-4 h-4"
            checked={showSecondTree}
            onChange={() => setShowSecondTree(!showSecondTree)}
          />
          <span className="text-sm font-medium text-black">Hide referrer's tree</span>
        </label>
      )}



      <div className="overflow-auto">
        <TreeNode node={(showSecondTree && data2) ? data2 : data} />
      </div>
    </div>
  );
};

export default Tree;
