import React from "react";
import Image from "next/image";

type WorkItemProps = {
  title: string;
  description: string;
  img_uri?: string;
  link: string;
  link_text: string;
};

export const WorkItem: React.FC<WorkItemProps> = ({
  title,
  description,
  img_uri,
  link,
  link_text,
}: WorkItemProps) => {
  return (
    <div className="w-full md:w-1/3 px-4 mb-2">
      <div className="bg-card slide-card shadow rounded-lg post-card overflow-hidden mb-2">
        <div className="p-4">

        {img_uri ? (
            <div className="flex justify-center mb-6">
              <Image
                src={img_uri}
                alt="{title} logo"
                width={96}
                height={96}
                className="rounded-full"
              />
            </div>
          ) : (
            <div className="flex justify-center mb-6">
              <Image
                src="/logo192.png"
                alt="CRFA logo"
                width={96}
                height={96}
                className="rounded-full"
              />
            </div>
          )}

          <h2 className="text-lg font-bold text-slate-100 mb-2">{title}</h2>
          <p className="text-gray-400 mb-4">{description}</p>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline transition duration-200"
          >
            {link_text}
          </a>
        </div>
      </div>
    </div>
  );
};