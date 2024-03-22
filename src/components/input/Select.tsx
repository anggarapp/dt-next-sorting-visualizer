import { SelectOptionsType } from "@/lib/types"

export const Select = ({
    options,
    defaultValue,
    onChange,
    isDisabled = false,
}: {
    options: SelectOptionsType[],
    defaultValue: string,
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    isDisabled?: boolean,
}) => {
    return (
        <div className="inline-block relative w-48">
            <select
                defaultValue={defaultValue}
                onChange={onChange}
                disabled={isDisabled}
                className="block appearance-none h-8 w-full bg-system-cyan500 border px-4 py-1 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline text-gray-700"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <svg
                    className="fill-slate-300 h-4 w-4"
                    viewBox="0 0 20 20"
                >
                    <path />
                </svg>
            </div>
        </div>
    )
}