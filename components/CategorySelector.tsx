"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  MemberCategory,
  MemberCategories,
  isCustomCategory,
  CustomCategory,
} from "@/actions/types/members";
import { useState } from "react";

interface CategorySelectorProps {
  selectedCategories?: MemberCategories;
  onChange?: (categories: MemberCategories) => void;
}

export default function CategorySelector({
  selectedCategories = [],
  onChange,
}: CategorySelectorProps) {
  const [customText, setCustomText] = useState(
    selectedCategories.find((c) => isCustomCategory(c))?.customText || ""
  );

  const handleCategoryUpdate = (
    category: MemberCategory | null,
    checked?: boolean,
    text?: string
  ) => {
    if (!onChange) return;

    // Handle custom text update
    if (text !== undefined) {
      setCustomText(text);
      const newCategories = selectedCategories.map((c) =>
        isCustomCategory(c)
          ? ({ type: MemberCategory.Other, customText: text } as CustomCategory)
          : c
      );
      onChange(newCategories);
      return;
    }

    // Handle category checkbox changes
    if (category === null || checked === undefined) return;

    if (category === MemberCategory.Other) {
      if (checked) {
        const newCategories = selectedCategories.filter(
          (c) => !isCustomCategory(c)
        );
        const customCategory: CustomCategory = {
          type: MemberCategory.Other,
          customText,
        };
        onChange([...newCategories, customCategory]);
      } else {
        onChange(selectedCategories.filter((c) => !isCustomCategory(c)));
      }
      return;
    }

    // For regular categories, preserve the Other category if it exists
    const otherCategory = selectedCategories.find((c) => isCustomCategory(c));
    const regularCategories = selectedCategories.filter(
      (c) => !isCustomCategory(c)
    ) as MemberCategory[];
    const newRegularCategories = checked
      ? [...regularCategories, category]
      : regularCategories.filter((c) => c !== category);

    onChange(
      otherCategory
        ? [...newRegularCategories, otherCategory]
        : newRegularCategories
    );
  };

  const regularCategories = Object.values(MemberCategory).filter(
    (c) => c !== MemberCategory.Other
  );

  return (
    <div className="space-y-4">
      <Label>Practice Areas</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {regularCategories.map((category) => (
          <div key={category} className="flex items-center space-x-2">
            <Checkbox
              id={category}
              checked={selectedCategories.some((c) => c === category)}
              onCheckedChange={(checked) =>
                handleCategoryUpdate(category, checked as boolean)
              }
            />
            <Label htmlFor={category} className="text-sm font-normal">
              {category}
            </Label>
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-4 mt-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id={MemberCategory.Other}
            checked={selectedCategories.some((c) => isCustomCategory(c))}
            onCheckedChange={(checked) =>
              handleCategoryUpdate(MemberCategory.Other, checked as boolean)
            }
          />
          <Label htmlFor={MemberCategory.Other} className="text-sm font-normal">
            {MemberCategory.Other}
          </Label>
        </div>
        {selectedCategories.some((c) => isCustomCategory(c)) && (
          <Input
            value={customText}
            onChange={(e) =>
              handleCategoryUpdate(null, undefined, e.target.value)
            }
            placeholder="Specify other practice area"
            className="max-w-xs"
          />
        )}
      </div>
    </div>
  );
}
