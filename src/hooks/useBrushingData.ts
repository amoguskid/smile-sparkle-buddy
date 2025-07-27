import { useState, useEffect } from "react";

interface BrushingRecord {
  date: string;
  morning: boolean;
  night: boolean;
}

export const useBrushingData = () => {
  const [records, setRecords] = useState<BrushingRecord[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('brushingRecords');
    if (savedData) {
      try {
        setRecords(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading brushing data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever records change
  useEffect(() => {
    localStorage.setItem('brushingRecords', JSON.stringify(records));
  }, [records]);

  const addBrushingSession = (period: 'morning' | 'night') => {
    const today = new Date().toDateString();
    
    setRecords(prev => {
      const existingRecord = prev.find(r => r.date === today);
      
      if (existingRecord) {
        // Update existing record
        return prev.map(r => 
          r.date === today 
            ? { ...r, [period]: true }
            : r
        );
      } else {
        // Create new record
        const newRecord: BrushingRecord = {
          date: today,
          morning: period === 'morning',
          night: period === 'night'
        };
        return [...prev, newRecord];
      }
    });
  };

  const getTodaysProgress = () => {
    const today = new Date().toDateString();
    const todayRecord = records.find(r => r.date === today);
    return {
      morning: todayRecord?.morning || false,
      night: todayRecord?.night || false
    };
  };

  const getStreak = () => {
    let streak = 0;
    const sortedRecords = [...records].sort((a, b) => b.date.localeCompare(a.date));
    
    for (const record of sortedRecords) {
      if (record.morning && record.night) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  return {
    records,
    addBrushingSession,
    getTodaysProgress,
    getStreak
  };
};