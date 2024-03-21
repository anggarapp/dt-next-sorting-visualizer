'use client';

import { createContext, useContext, useState } from "react";
import { SortingAlgorithmType } from "../lib/types";
import { MAX_ANIMATION_SPEED } from "../lib/util";

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
    runAnimation: () => void;
}

const SortingAlgotithmContext = createContext<SortingAlgorithmContextType | undefined>(undefined)

export const SortingAlgotithmProvider = ({ children }: { children: React.ReactNode }) => {
    const [arrayToSort, setArrayToSort] = useState<number[]>([100, 20, 45, 55, 66])
    const [selectedAlgorithm, setSelectedAlgorithm] = useState<SortingAlgorithmType>("bubble")
    const [isSorting, setIsSorting] = useState<boolean>(false)
    const [animationSpeed, setAnimationSpeed] = useState<number>(MAX_ANIMATION_SPEED)
    const [isAnimationComplete, setIsAnimationComplete] = useState<boolean>(false)
    const resetArrayAndAnimation = () => { }
    const runAnimation = () => { }

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
        runAnimation
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