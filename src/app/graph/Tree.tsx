// components/Tree.jsx
import React from 'react';
import Link from 'next/link';

const TreeNode = ({ node }: { node: any }) => {
  return (
    <div className="flex flex-col items-start relative ml-8 pt-4">
      {/* Node Content */}
      <Link href={`/profile/${node.id}`} className="border-2 border-black bg-white px-6 py-3 rounded-lg shadow-[3px_3px_0_0_#000] 
          transition-transform hover:translate-x-0.5 hover:translate-y-0.5 relative z-10">
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

const Tree = ({ data }: { data: any }) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 border-2 border-black bg-[#f0fff7] rounded-xl 
        shadow-[5px_5px_0_0_#000]">
      <h2 className="text-3xl font-black mb-6 text-[#FF6B6B]">Your Chain</h2>
      <TreeNode node={data} />
    </div>
  );
};

export default Tree;
