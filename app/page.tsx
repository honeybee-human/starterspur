"use client";

import React, { useState } from "react";
import dayjs from "dayjs";

const WeeklyCalendar: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState(dayjs().startOf("week"));


  const weekDays = Array.from({ length: 7 }, (_, i) => ({
    day: currentWeek.add(i, "day").format("ddd"),
    date: currentWeek.add(i, "day").format("D"),
    month: currentWeek.add(i, "day").format("MMM"),
  }));

  const handleWeekChange = (direction: "prev" | "next") => {
    setCurrentWeek((prev) =>
      direction === "prev" ? prev.subtract(1, "week") : prev.add(1, "week")
    );
  };

  const hours = Array.from({ length: 13 }, (_, i) => `${(i % 12) + 1} ${i < 11 ? 'AM' : 'PM'}`);



  return (
    <div className='flex'>
      <div className='w-[300px] h-[1024px] bg-[#EDEBE9]'></div>
      <div className='container pl-[36px] pr-[36px] pt-[24px] pb-[24px]'>
        <div className='w-[1140px] h-[64px] border-b border-[#DED9D6]'></div> {/* style notes: top spacer width: 1140 height: 64 bottom border 1px DED9D6 */}

        <div className='mt-[24px] mb-[16px] w-[1086px] h-[36px] font-[600] text-[30px] text-[#1B1919] leading-[36px]'>
          Scheduled Suites {/* style notes: header margintop: 24px marginbot: 16px width: fill 1068px height: hug 36px text weight: 600px font size: 30px lineheight: 36px */}
        </div>
        
        <div className='mb-[16px] w-[1086px] h-[36px] flex justify-between'> {/* style notes: top bar frame marginbot:16px width: fill 1068px height: hug 36px justify space between */}
          <div className='flex gap-[4px]'> {/* style notes: top bar frame RIGHT width: 389 height: 36 gap 4px */}
            <button
              className="p-[8px] pr-[12px] pl-[12px] rounded-[8px] bg-[#0435DD] text-white font-[600] text-[14px] leading-[20px]"
            >
              Schedule Test {/* style notes: button schedule test width: hug 145px height: fixed 36px border radius 8px padding topbot 8px padding rightleft 12px gap 8px icon 16x16 text weight 600 size 14px lineheight 20px color bg 0435DD */}
            </button>

            <div className="flex items-center justify-between w-[240px] h-[36px] border border-[#DED9D6] rounded-[6px] px-4"> {/* style notes: select trigger width: fixed 240px height: fixed 36px border 1px radius 8px (border radius/md) DED9D6 (warm gray) inner align justify space-between padding topbot 10px (spacing/2-5) padding rightleft 12px */}
              <button
                className="w-[16px] h-[16px] flex items-center justify-center"
                onClick={() => handleWeekChange("prev")}
              >
                {'<'} {/* style notes: icon 16x16 */}
              </button>
              <span className="text-[16px] font-[500] text-[#1B1919] leading-[24px]">
                Week of {currentWeek.format("MM/DD/YY")} {/* style notes: week statement width: 188px height: 24px text weight 500 size 16px lineheight 24px align center color 1b1919 */}
              </span>
              <button
                className="w-[16px] h-[16px] flex items-center justify-center"
                onClick={() => handleWeekChange("next")}
              >
                {'>'} {/* style notes: icon 16x16 */}
              </button>
            </div>
          </div>

          <div className='flex gap-2'> {/* style notes: top bar frame LEFT width: 72hug height: 36 hug radius 8px gap 2px */}
            <button
              className="w-[36px] h-[36px] rounded-md bg-[#F3F2F1] flex items-center justify-center"
              onClick={() => handleWeekChange("next")}
            >
              List {/* style notes: list icon width: 36 height: 36 radius: 8 padding topbot 8px leftright 12px gap 8px background f3f2f1 */}
            </button>

            <button
              className="w-[36px] h-[36px] rounded-md border border-[#DED9D6] flex items-center justify-center"
              onClick={() => handleWeekChange("next")}
            >
              Cal {/* style notes: calendar icon width: 36 height: 36 radius: 8 padding topbot 8px leftright 12px gap 8px border 1px all sides DED9D6 inner align */}
            </button>
          </div>
        </div>

        <div className='flex'>
          <div className="pt-[20px] w-[48px]"> {/* style notes: list of time width fixed 48px height hug 796px padding top 20px pst 48x48 font weight 400 size 12 line height 12 color 717070 times after 48x56 same */}
            <div className="h-[48px] flex items-center font-400 text-[12px] leading-[12px] text-[#717070]">PST</div>
            {hours.map((hour, index) => (
              <div key={index} className="h-[56px] flex items-center font-400 text-[12px] leading-[12px] text-[#717070]">
                {hour}
              </div>
            ))}
          </div>

          <div className='h-[808px] border border-[#DED9D6] rounded-[8px]'> {/* style notes: calendar box height 808px width 1020px border 1px border DED9D6 rounded 8px */}
            <div className="grid grid-cols-7">
              {weekDays.map((day, index) => (
                <div
                  key={index}
                  className={`h-[40px] w-[150px] pr-[16px] pl-[16px] bg-[#f3f2f1] text-center flex items-center gap-[8px] ${index === 0 ? 'rounded-tl-[8px]' : ''} ${index === weekDays.length - 1 ? 'rounded-tr-[8px]' : ''}`}
                >
                  <span className="text-[18px] font-[400] leading-[18px] text-[#1b1919]">
                    {day.date} {/* style notes: daynum font weight 400 18px 18px line height 1b1919 */}
                  </span>
                  <span className="text-[14px] font-[400] leading-[14px] text-[#717070]">
                    {day.day} {/* style notes: dayname weight 400 14px 14px line height 717070 */}
                  </span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7">
              {Array.from({ length: 7 }).map((_, dayIndex) => (
                <div key={dayIndex} className="grid grid-rows-24">
                  {hours.map((_, hourIndex) => (
                    <div
                      key={hourIndex}
                      className="h-[56px] w-[150px] border-b border-[#F3F2F1] border-l border-[#DED9D6] hover:bg-blue-100 cursor-pointer"
                    >{/* style notes: boxes width fill 145.71px height 56px fixed padding 4px gap 4px border 1px bottom f3f2f1 */}</div> 
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>


    </div>
  );
};

export default WeeklyCalendar;
