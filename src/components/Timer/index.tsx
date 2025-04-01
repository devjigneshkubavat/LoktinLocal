import { useState, useEffect, useCallback } from 'react';

export const useTimer = (initialTime: number = 20) => {
    const [timeLeft, setTimeLeft] = useState<number>(initialTime); // Current time
    const [isRunning, setIsRunning] = useState<boolean>(false); // Timer state

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;

        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        }

        if (timeLeft === 0) {
            setIsRunning(false); // Stop the timer automatically
            setTimeLeft(initialTime);
        }

        return () => {
            if (timer) clearInterval(timer); // Cleanup the interval on unmount or pause
        };
    }, [isRunning, timeLeft]);

    const formatTime = (time: number): string => {
        return time.toString().padStart(2, '0'); // Ensures double-digit format
    };

    // Action: Start the timer
    const start = useCallback(() => {
        if (timeLeft > 0) {
            setIsRunning(true);
        }
    }, [timeLeft]);

    // Action: Pause the timer
    const pause = useCallback(() => {
        setIsRunning(false);
    }, []);

    // Action: Reset the timer
    const reset = useCallback(() => {
        setIsRunning(false);
        setTimeLeft(initialTime);
    }, [initialTime]);

    return { timeLeft: formatTime(timeLeft), isRunning, start, pause, reset };
};
