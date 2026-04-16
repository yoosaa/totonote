import { PreparationItem } from "../model/preparationItem";

export type PreparationProgress = {
  totalCount: number;
  checkedCount: number;
  percentage: number;
  isCompleted: boolean;
};

export const calculatePreparationProgress = (
  items: PreparationItem[]
): PreparationProgress => {
  const totalCount = items.length;
  const checkedCount = items.filter((item) => item.checked).length;
  const percentage =
    totalCount === 0 ? 0 : Math.floor((checkedCount / totalCount) * 100);

  return {
    totalCount,
    checkedCount,
    percentage,
    isCompleted: totalCount > 0 && checkedCount === totalCount,
  };
};
