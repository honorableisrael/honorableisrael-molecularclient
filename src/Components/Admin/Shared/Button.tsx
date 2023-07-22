import React, { MouseEventHandler } from "react";

interface IProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  name: string;
  children?: React.ReactNode;
  customeStyle?: string;
  isBusy?:boolean;
}

export const CustomButton = ({
  onClick,
  disabled,
  customeStyle,
  name,
  isBusy,
  children,
}: IProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "10px 20px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
      className={customeStyle}>
      {!isBusy?name:"Processing..."}
      {!name && children}
    </button>
  );
};
