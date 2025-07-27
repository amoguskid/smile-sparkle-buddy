import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import starSticker from "@/assets/star-sticker.png";
import morningSun from "@/assets/morning-sun.png";
import nightMoon from "@/assets/night-moon.png";

interface BrushingRecord {
  date: string;
  morning: boolean;
  night: boolean;
}

interface StickerChartProps {
  onAddSticker: (period: 'morning' | 'night') => void;
  records: BrushingRecord[];
}

export const StickerChart = ({ onAddSticker, records }: StickerChartProps) => {
  const [currentStreak, setCurrentStreak] = useState(0);

  useEffect(() => {
    // Calculate current streak
    let streak = 0;
    const sortedRecords = [...records].sort((a, b) => b.date.localeCompare(a.date));
    
    for (const record of sortedRecords) {
      if (record.morning && record.night) {
        streak++;
      } else {
        break;
      }
    }
    setCurrentStreak(streak);
  }, [records]);

  const today = new Date().toDateString();
  const todayRecord = records.find(r => r.date === today);

  const getLastSevenDays = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date);
    }
    return days;
  };

  const getDayRecord = (date: Date) => {
    return records.find(r => r.date === date.toDateString());
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-yellow-light/30 to-purple-light/30 border-2 border-accent/20 shadow-fun">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-2 flex items-center justify-center gap-2">
            <Calendar className="w-8 h-8" />
            Brushing Chart
          </h2>
          <div className="text-xl text-muted-foreground">
            Current Streak: <span className="text-2xl font-bold text-accent">{currentStreak}</span> days! 🔥
          </div>
        </div>

        {/* Today's Progress */}
        <Card className="p-4 bg-white/80 shadow-sm">
          <h3 className="text-xl font-bold mb-4 text-center">Today's Brushing</h3>
          <div className="flex justify-center gap-8">
            <div className="text-center">
              <div className="mb-2">
                <img src={morningSun} alt="Morning" className="w-16 h-16 mx-auto" />
              </div>
              <div className="mb-2 text-lg font-semibold">Morning</div>
              {todayRecord?.morning ? (
                <div className="flex justify-center">
                  <img src={starSticker} alt="Star" className="w-12 h-12 animate-celebrate" />
                </div>
              ) : (
                <Button 
                  variant="morning" 
                  size="lg"
                  onClick={() => onAddSticker('morning')}
                  className="animate-pulse"
                >
                  Add Sticker!
                </Button>
              )}
            </div>

            <div className="text-center">
              <div className="mb-2">
                <img src={nightMoon} alt="Night" className="w-16 h-16 mx-auto" />
              </div>
              <div className="mb-2 text-lg font-semibold">Night</div>
              {todayRecord?.night ? (
                <div className="flex justify-center">
                  <img src={starSticker} alt="Star" className="w-12 h-12 animate-celebrate" />
                </div>
              ) : (
                <Button 
                  variant="night" 
                  size="lg"
                  onClick={() => onAddSticker('night')}
                  className="animate-pulse"
                >
                  Add Sticker!
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Weekly Progress */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-center">This Week</h3>
          <div className="grid grid-cols-7 gap-2">
            {getLastSevenDays().map((date, index) => {
              const record = getDayRecord(date);
              const dayName = date.toLocaleDateString('en', { weekday: 'short' });
              const isToday = date.toDateString() === today;
              
              return (
                <div 
                  key={index} 
                  className={`p-3 rounded-xl text-center ${isToday ? 'bg-primary/20 border-2 border-primary' : 'bg-white/50'} shadow-sm`}
                >
                  <div className="text-sm font-semibold mb-2">{dayName}</div>
                  <div className="space-y-1">
                    <div className="h-8 flex justify-center items-center">
                      {record?.morning ? (
                        <img src={starSticker} alt="Morning Star" className="w-6 h-6" />
                      ) : (
                        <img src={morningSun} alt="Morning" className="w-6 h-6 opacity-30" />
                      )}
                    </div>
                    <div className="h-8 flex justify-center items-center">
                      {record?.night ? (
                        <img src={starSticker} alt="Night Star" className="w-6 h-6" />
                      ) : (
                        <img src={nightMoon} alt="Night" className="w-6 h-6 opacity-30" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievements */}
        {currentStreak >= 3 && (
          <Card className="p-4 bg-gradient-celebration text-white text-center animate-slide-up">
            <div className="text-2xl font-bold mb-2">🏆 Amazing!</div>
            <div className="text-lg">
              {currentStreak >= 7 ? "You're a Brushing Champion! 🌟" : 
               currentStreak >= 5 ? "You're on fire! Keep it up! 🔥" : 
               "Great job staying consistent! 💪"}
            </div>
          </Card>
        )}
      </div>
    </Card>
  );
};