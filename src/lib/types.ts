export type SortingAlgorithmType =
    | "bubble"
    | "insertion"
    | "selectioninsertion"
    | "merge"
    | "quick"

export type SelectOptionsType = {
    value: string;
    label: string;
}

export type AnimationArrayType = [number[], boolean][];