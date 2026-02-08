
import { cn } from "../../lib/utils";

const MaxWidthContainer = ({ children, className }) => {

  return (
    <div
      className={cn(
        "max-w-7xl mx-auto px-4",
        className,
      )}
    >
      {children}
    </div>
  );
};
export default MaxWidthContainer;
