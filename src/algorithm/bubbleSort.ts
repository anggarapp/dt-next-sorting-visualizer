import { AnimationArrayType } from "@/lib/types";

function runBubbleSort(array: number[], animation: AnimationArrayType) {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - 1 - i; j++) {
            animation.push([[j, j + 1], false]);
            if (array[j] > array[j + 1]) {
                animation.push([[j, array[j + 1]], true]);
                animation.push([[j + 1, array[j]], true]);
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
        }
    }
}

export function generateBubbleSortAnimationArray(
    isSorting: boolean,
    array: number[],
    runAnimation: (animation: AnimationArrayType) => void
) {
    if (isSorting) return
    if (array.length <= 1) return [];

    const animation: AnimationArrayType = [];
    const auxiliaryArray = array.slice();
    runBubbleSort(auxiliaryArray, animation);
    runAnimation(animation);
}

