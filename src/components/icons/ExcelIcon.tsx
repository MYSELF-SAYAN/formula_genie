import React from 'react';

interface ExcelIconProps {
  className?: string;
  size?: number;
}

export const ExcelIcon: React.FC<ExcelIconProps> = ({ className, size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
      fill="#217346"
    />
    <path
      d="M7 7L10.5 12L7 17H9.5L11.75 13.5L14 17H16.5L13 12L16.5 7H14L11.75 10.5L9.5 7H7Z"
      fill="white"
    />
  </svg>
);
