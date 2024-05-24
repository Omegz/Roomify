// ParentComponent.tsx or PageComponent.tsx
import React from "react";
import KaffeSalonenLatte from "~/app/_components/KaffeSalonenLatte";

const ParentComponent: React.FC = () => {
  return (
    <div>
      <KaffeSalonenLatte />
    </div>
  );
};

export default ParentComponent;
