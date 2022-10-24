import { ReactChildren, ReactChild } from "react";
import LoadingSpiner from "./LoadingSpinner";

type IconButtonProps = {
  children: ReactChildren | ReactChild;
  Icon?: any;
  activeButton?: boolean;
  onClick: () => void;
};

export default function IconButton({
  children,
  Icon,
  activeButton,
  onClick,
}: IconButtonProps) {
  const onClickButton = () => {
    if (activeButton === undefined || activeButton === true) onClick();
  };
      return (
        <button
          type="button"
          onClick={onClickButton}
          className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-xs leading-4 font-medium rounded-md text-white bg-primary-dark hover:bg-primary-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          {activeButton === false ? (
            <LoadingSpiner />
          ) : (
            Icon && <Icon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
          )}
          {children}
        </button>
      );
   
}
