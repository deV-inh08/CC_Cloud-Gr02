import React, { useEffect, useState } from 'react';

interface CountdownProps {
  endTime: string; // Thời gian kết thúc Flash Sale (ISO 8601 format hoặc timestamp)
}

const CountdownTimer: React.FC<CountdownProps> = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Convert endTime to timestamp
    const endTimestamp = new Date(endTime).getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = endTimestamp - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        // Stop countdown
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Update countdown every second
    const timer = setInterval(calculateTimeLeft, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div className="flex gap-6 text-center">
      <div className="flex flex-col-reverse items-center">
        <span className="text-2xl font-bold">{timeLeft.days}</span>
        <span className="text-sm">Days</span>
      </div>
      <div className="flex flex-col-reverse items-center">
        <span className="text-2xl font-bold">{timeLeft.hours}</span>
        <span className="text-sm">Hours</span>
      </div>
      <div className="flex flex-col-reverse items-center">
        <span className="text-2xl font-bold">{timeLeft.minutes}</span>
        <span className="text-sm">Minutes</span>
      </div>
      <div className="flex flex-col-reverse items-center">
        <span className="text-2xl font-bold">{timeLeft.seconds}</span>
        <span className="text-sm">Seconds</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
