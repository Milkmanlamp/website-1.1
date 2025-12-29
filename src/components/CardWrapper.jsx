import { Card } from "@/components/ui/card";

export default function CardWrapper({ children, className = "" }) {
  return <Card className={`main-card px-5 pb-5 ${className}`}>{children}</Card>;
}

