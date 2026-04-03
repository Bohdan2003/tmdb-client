import { cn } from "../../utils/cn";

interface TitleProps {
  className?: string;
  title: string;
  subtitle?: string;
}

export default function Title({ className, title, subtitle }: TitleProps) {
  return (
    <div className={cn(className)}>
      <h1 className="font-semibold text-4xl">
        {title}
      </h1>
      {subtitle && 
        <span className="opacity-50 mt-2">
          {subtitle}
        </span>
      }
    </div>
  );
}
