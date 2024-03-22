'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { AnimationArrayType, SortingAlgorithmType } from "../lib/types";
import { MAX_ANIMATION_SPEED, generateRandomNumberFromInterval } from "../lib/util";

interface SortingAlgorithmContextType {
    arrayToSort: number[];
    setArrayToSort: (array: number[]) => void;
    selectedAlgorithm: SortingAlgorithmType;
    setSelectedAlgorithm: (algorithm: SortingAlgorithmType) => void;
    isSorting: boolean;
    setIsSorting: (isSorting: boolean) => void;
    animationSpeed: number;
    setAnimationSpeed: (speed: number) => void;
    isAnimationComplete: boolean;
    setIsAnimationComplete: (isComplete: boolean) => void;
    resetArrayAndAnimation: () => void;
    runAnimation: (animation: AnimationArrayType) => void;
    requiresReset: boolean;
}

const SortingAlgotithmContext = createContext<SortingAlgorithmContextType | undefined>(undefined)

export const SortingAlgotithmProvider = ({ children }: { children: React.ReactNode }) => {
    const [arrayToSort, setArrayToSort] = useState<number[]>([])
    const [selectedAlgorithm, setSelectedAlgorithm] = useState<SortingAlgorithmType>("bubble")
    const [isSorting, setIsSorting] = useState<boolean>(false)
    const [animationSpeed, setAnimationSpeed] = useState<number>(MAX_ANIMATION_SPEED)
    const [isAnimationComplete, setIsAnimationComplete] = useState<boolean>(false)

    const requiresReset = isAnimationComplete || isSorting;

    useEffect(() => {
        resetArrayAndAnimation();
        window.addEventListener("resize", resetArrayAndAnimation);

        return () => {
            window.removeEventListener("resize", resetArrayAndAnimation)
        }
    }, [])

    const resetArrayAndAnimation = () => {
        const contentContainer = document.getElementById("content-container");
        if (!contentContainer) return;
        const contentContainerWidth = contentContainer.clientWidth;
        const tempArray: number[] = [];
        const numLines = contentContainerWidth / 8;
        const containerHeight = window.innerHeight;
        const maxLinesheght = Math.max(containerHeight - 420, 100)

        for (let i = 0; i < numLines; i++) {
            tempArray.push(generateRandomNumberFromInterval(100, maxLinesheght - 100));
        }

        setArrayToSort(tempArray);
        setIsAnimationComplete(false);
        setIsSorting(false);

    }
    const runAnimation = (animations: AnimationArrayType) => {
        setIsSorting(true);

        const inversedSpeed = (1 / animationSpeed) * 200;
        const arrayLines = document.getElementsByClassName("array-line") as HTMLCollectionOf<HTMLElement>;
        const updateClassList = (
            indexes: number[],
            addClassName: string,
            removeClassName: string,
        ) => {
            indexes.forEach((index) => {
                arrayLines[index].classList.add(addClassName)
                arrayLines[index].classList.remove(removeClassName)
            })
        }

        const updateHeightValue = (
            lineIndex: number,
            newHeight: number | undefined,
        ) => {
            if (newHeight === undefined) return;
            arrayLines[lineIndex].style.height = `${newHeight}px`;
        }

        animations.forEach((animation, index) => {
            setTimeout(() => {
                const [values, isSwap] = animation;

                if (!isSwap) {
                    updateClassList(values, "changed-line-color", "default-line-color")
                    setTimeout(() => {
                        updateClassList(values, "default-line-color", "changed-line-color")
                    }, inversedSpeed)
                } else {
                    const [lineIndex, newHeight] = values;
                    updateHeightValue(lineIndex, newHeight);
                }
            }, index * inversedSpeed)
        })
    }

    const value = {
        arrayToSort,
        setArrayToSort,
        selectedAlgorithm,
        setSelectedAlgorithm,
        isSorting,
        setIsSorting,
        animationSpeed,
        setAnimationSpeed,
        isAnimationComplete,
        setIsAnimationComplete,
        resetArrayAndAnimation,
        runAnimation,
        requiresReset,
    }

    return <SortingAlgotithmContext.Provider value={value}>
        {children}
    </SortingAlgotithmContext.Provider>
}

export const useSortingAlgorithmContext = () => {
    const context = useContext(SortingAlgotithmContext)
    if (!context) {
        throw new Error("useSortingAlgorithmContext must be used within a SortingAlgotithmContext")
    }
    return context
}