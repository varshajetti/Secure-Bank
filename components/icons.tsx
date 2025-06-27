import React from 'react';

const iconProps = {
  className: "w-6 h-6",
  strokeWidth: 1.5,
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg",
};

export const BrainCircuitIcon = () => (
    <svg {...iconProps} className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M8.25 21v-1.5M21 15.75h-1.5m-16.5 0H3m16.5-7.5-1.5-1.5m-12 12-1.5-1.5m1.5-12 1.5 1.5m12 9 1.5 1.5m-6.75-3.375h6.75a2.25 2.25 0 0 0 2.25-2.25V9a2.25 2.25 0 0 0-2.25-2.25h-6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
  );
  
export const DataStreamIcon = () => (
    <svg {...iconProps} className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75" />
    </svg>
);
  
export const FingerprintIcon = () => (
    <svg {...iconProps} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.588 8.268M12 18H5.25c-.621 0-1.125-.504-1.125-1.125v-6.75c0-.621.504-1.125 1.125-1.125H9.75" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 15.75c.243.243.498.487.764.717m-3.384-3.384c.033.033.064.067.098.1m2.12-.033c.032.033.066.064.098.098m2.12-.033c.032.033.066.064.098.098" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12h.008v.008H12V12Zm2.25 2.25h.007v.008h-.007v-.008Zm-.007-4.5h.007v.008H12v-.008Zm2.25 0h.008v.008h-.008V7.5Zm-4.5 4.5h.008v.008H9.75v-.008Zm0-2.25h.008v.008H9.75V9.75Z" />
    </svg>
);
  
export const BlockchainIcon = () => (
    <svg {...iconProps} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
);
  
export const DocumentLogIcon = () => (
    <svg {...iconProps} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
);

export const ShieldAlertIcon = () => (
  <svg {...iconProps} className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
  </svg>
);


export const LogOutIcon = () => (
    <svg {...iconProps} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H5" />
    </svg>
);

export const ChartBarIcon = () => (
  <svg {...iconProps} className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
  </svg>
);

export const SparklesIcon = () => (
    <svg {...iconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
    </svg>
);

export const ChatBubbleLeftRightIcon = () => (
    <svg {...iconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.72-3.72a2.25 2.25 0 0 0-3.182 0l-3.72 3.72a2.25 2.25 0 0 1-3.182 0l-6.364-6.364a2.25 2.25 0 0 1 0-3.182l2.828-2.828a2.25 2.25 0 0 1 3.182 0l3.72 3.72a2.25 2.25 0 0 0 3.182 0l3.72-3.72Z M15.75 9.75l-6.364-6.364a2.25 2.25 0 0 0-3.182 0l-2.828 2.828a2.25 2.25 0 0 0 0 3.182l6.364 6.364a2.25 2.25 0 0 0 3.182 0l2.828-2.828a2.25 2.25 0 0 0 0-3.182Z" />
    </svg>
);

export const XMarkIcon = () => (
    <svg {...iconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
);

export const PaperAirplaneIcon = () => (
    <svg {...iconProps} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
    </svg>
);

export const ShieldCheckIcon = () => (
    <svg {...iconProps} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.956 11.956 0 0 1 12 3c2.373 0 4.543.768 6.364 2.122a11.975 11.975 0 0 1 2.396 6.012A11.956 11.956 0 0 1 12 21a11.956 11.956 0 0 1-8.76-14.866A11.975 11.975 0 0 1 5.636 5.122A11.956 11.956 0 0 1 12 3Z" />
    </svg>
);

export const HomeIcon = () => (
    <svg {...iconProps} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
    </svg>
);