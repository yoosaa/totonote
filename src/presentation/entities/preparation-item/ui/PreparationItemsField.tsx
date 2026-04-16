"use client";

import type { PreparationItem } from "@/src/domain/appointment/model/preparationItem";

type Props = {
  items: PreparationItem[];
  errors?: string[];
  onChange: (items: PreparationItem[]) => void;
};

const createPreparationItemId = () => {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `preparation-item-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}`;
};

const createEmptyPreparationItem = (): PreparationItem => ({
  id: createPreparationItemId(),
  label: "",
  checked: false,
});

export function PreparationItemsField({ items, errors, onChange }: Props) {
  const handleAdd = () => {
    onChange([...items, createEmptyPreparationItem()]);
  };

  const handleRemove = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  const handleLabelChange = (id: string, label: string) => {
    onChange(
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              label,
            }
          : item
      )
    );
  };

  const handleCheckedChange = (id: string, checked: boolean) => {
    onChange(
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              checked,
            }
          : item
      )
    );
  };

  return (
    <section className="space-y-4 rounded-lg border p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-1">
          <h2 className="text-base font-semibold">事前準備項目</h2>
          <p className="text-sm text-muted-foreground">
            当日までに必要な準備をチェックリストとして登録できます。
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="rounded-md border px-3 py-2 text-sm font-medium"
        >
          項目を追加
        </button>
      </div>

      {items.length === 0 ? (
        <div className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
          まだ準備項目はありません。
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li key={item.id} className="space-y-3 rounded-md border p-3">
              <div className="flex items-start justify-between gap-3">
                <label className="mt-2 flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={(event) =>
                      handleCheckedChange(item.id, event.target.checked)
                    }
                  />
                  完了
                </label>

                <button
                  type="button"
                  onClick={() => handleRemove(item.id)}
                  className="rounded-md border px-3 py-1.5 text-sm"
                >
                  削除
                </button>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor={`preparation-item-${item.id}`}
                  className="text-sm font-medium"
                >
                  項目 {index + 1}
                </label>
                <input
                  id={`preparation-item-${item.id}`}
                  value={item.label}
                  onChange={(event) =>
                    handleLabelChange(item.id, event.target.value)
                  }
                  className="w-full rounded-md border px-3 py-2 text-sm"
                  placeholder="例: ヒアリングシートを準備する"
                />
              </div>
            </li>
          ))}
        </ul>
      )}

      {errors?.map((message) => (
        <p key={message} className="text-sm text-red-600">
          {message}
        </p>
      ))}
    </section>
  );
}
