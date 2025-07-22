import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

type HeadingLevel = "h2" | "h3" | "h4" | "h6";

interface HeadingProps {
    level: HeadingLevel;
    children: ReactNode;
    className?: string;
}

const headingBaseClass = "font-frutiger-bold text-center";

const headingClasses: Record<HeadingLevel, string> = {
    h2: "text-3xl leading-md",
    h3: "text-2xl leading-sm",
    h4: "text-xl leading-lg",
    h6: "text-md leading-sm",
};

const Heading: FC<HeadingProps> = ({ level, children, className }) => {
    const Tag = level;
    const combinedClassName = cn(headingBaseClass, headingClasses[level], className);

    return <Tag className={combinedClassName}>{children}</Tag>;
};

export default Heading;