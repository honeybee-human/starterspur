"use client"

import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import ScheduleModal from "./components/ScheduleModal";
import { getCountries, createCountry } from './components/actions';

const WeeklyCalendar: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState(dayjs().startOf("week"));
  const [showModal, setShowModal] = useState(false);
  const [countries, setCountries] = useState<{ id: string; name: string; datestart: string }[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getCountries();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const addCountry = async (formData: FormData) => {
    try {
      await createCountry(formData);
      const data = await getCountries();
      setCountries(data);
    } catch (error) {
      console.error('Error adding country:', error);
    }
  };

  const weekDays = Array.from({ length: 7 }, (_, i) => ({
    day: currentWeek.add(i, "day").format("ddd"),
    date: currentWeek.add(i, "day").date(),
    month: currentWeek.add(i, "day").month() + 1,
    year: currentWeek.year(),
  }));

  const handleWeekChange = (direction: "prev" | "next") => {
    setCurrentWeek((prev) =>
      direction === "prev" ? prev.subtract(1, "week") : prev.add(1, "week")
    );
  };

  const hournames = Array.from({ length: 13 }, (_, i) => `${(i % 12) + 1} ${i < 11 ? 'AM' : 'PM'}`);
  const hours12 = Array.from({ length: 12 }, (_, i) => i + 1);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const getDayAndTime = (timestamp: string) => {
    const day = dayjs(timestamp).format("ddd");
    const hour = dayjs(timestamp).hour();
    const roundedHour = Math.round(hour % 12 || 12);
    return { day, hour: roundedHour };
  };

  return (
    <>
      <div className='flex'>
        <div className='w-[300px] h-[1024px] bg-[#EDEBE9]'></div>
        <div className='container pl-[36px] pr-[36px] pt-[24px] pb-[24px]'>
          <div className='mt-[24px] mb-[16px] w-[1086px] h-[36px] font-[600] text-[30px] text-[#1B1919] leading-[36px]'>
            Scheduled Suites {/* style notes: header margintop: 24px marginbot: 16px width: fill 1068px height: hug 36px text weight: 600px font size: 30px lineheight: 36px */}
          </div>

          <div className='mb-[16px] w-[1086px] h-[36px] flex justify-between'> {/* style notes: top bar frame marginbot:16px width: fill 1068px height: hug 36px justify space between */}
            <div className='flex gap-[4px]'> {/* style notes: top bar frame RIGHT width: 389 height: 36 gap 4px */}
              <button
                className="p-[8px] pr-[12px] pl-[12px] rounded-[8px] bg-[#0435DD] text-white font-[600] text-[14px] leading-[20px]"
                onClick={openModal}
              >
                Schedule Test {/* style notes: button schedule test width: hug 145px height: fixed 36px border radius 8px padding topbot 8px padding rightleft 12px gap 8px icon 16x16 text weight 600 size 14px lineheight 20px color bg 0435DD */}
              </button>
              {showModal && <ScheduleModal closeModal={closeModal} addCountry={addCountry} />} {/* Pass addCountry to the modal */}

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
            <div className="pt-[20px] w-[48px]">
              <div className="h-[48px] flex items-center font-400 text-[12px] leading-[12px] text-[#717070]">PST</div>
              {hournames.map((hourname, index) => (
                <div key={index} className="h-[56px] flex items-center font-400 text-[12px] leading-[12px] text-[#717070]">
                  {hourname}
                </div>
              ))}
            </div>

            <div className='h-[808px] border border-[#DED9D6] rounded-[8px]'>
              <div className="grid grid-cols-7">
                {weekDays.map((day, index) => (
                  <div
                    key={index}
                    className={`h-[40px] w-[150px] pr-[16px] pl-[16px] bg-[#f3f2f1] text-center flex items-center gap-[8px] ${index === 0 ? 'rounded-tl-[8px]' : ''} ${index === weekDays.length - 1 ? 'rounded-tr-[8px]' : ''}`}
                  >
                    <span className="text-[18px] font-[400] leading-[18px] text-[#1b1919]">
                      {day.date}
                    </span>
                    <span className="text-[14px] font-[400] leading-[14px] text-[#717070]">
                      {day.day}
                    </span>
                  </div>
                ))}
              </div>



              <div className="grid grid-cols-7">
                {Array.from({ length: 7 }).map((_, dayIndex) => (
                  <div key={dayIndex} className="grid grid-rows-24">
                    {hours12.map((_, hourIndex) => (
                      <div
                      key={`${dayIndex}-${hourIndex}-${weekDays[dayIndex].month}-${weekDays[dayIndex].date}-${weekDays[dayIndex].year}`}
                      className="h-[56px] w-[150px] border-b border-[#F3F2F1] border-l border-[#DED9D6] hover:bg-blue-100 cursor-pointer"
                      >
                        {/* {hourIndex}
                        {weekDays[dayIndex].month}/{weekDays[dayIndex].date}/{weekDays[dayIndex].year} */}
            {countries
                          .filter(country => {
                            const { day, hour } = getDayAndTime(country.datestart);
                            return day === weekDays[dayIndex].day && hour === (hourIndex);
                          })
                          .map((country) => (
                            <div key={country.id} className="text-center text-sm text-[#1B1919]">
                              {country.name}
                            </div>
                          ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>





            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default WeeklyCalendar;
