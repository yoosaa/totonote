import { PreparationItem } from "@/src/domain/appointment/model/preparationItem";
import { calculatePreparationProgress } from "@/src/domain/appointment/services/calculatePreparationProgress";

type Props = {
  items: PreparationItem[];
};

export function PreparationPanel({ items }: Props) {
  const progress = calculatePreparationProgress(items);

  return (
    <section className="space-y-4 rounded-lg border p-5">
      <div className="space-y-1">
        <h2 className="text-base font-semibold">事前準備</h2>
        <p className="text-sm text-muted-foreground">
          {progress.totalCount === 0
            ? "事前準備項目はまだありません。"
            : `${progress.checkedCount} / ${progress.totalCount} 完了`}
        </p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
          準備項目は未登録です。
        </div>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between rounded-md border px-3 py-2"
            >
              <span className="text-sm">{item.label}</span>
              <span className="text-xs text-muted-foreground">
                {item.checked ? "完了" : "未完了"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
