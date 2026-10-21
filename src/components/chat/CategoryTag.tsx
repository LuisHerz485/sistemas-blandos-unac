import type { Category } from '../../lib/categories.ts'

interface CategoryTagProps {
    readonly category: Category
}

export function CategoryTag({ category }: CategoryTagProps) {
    return (
        <span className="cat-tag" data-cat={category}>
            <i aria-hidden="true" />
            {category}
        </span>
    )
}
