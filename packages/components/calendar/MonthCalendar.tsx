import React, { useContext, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { CalendarProps } from '.';
import { Dayjs } from 'dayjs';
import LocaleContext from './LocaleContext';
import allLocales from './locale';
import cs from 'classnames'
interface MonthCalendarProps extends CalendarProps {
    selectHandler?: (date: Dayjs) => void,
    curMonth: Dayjs
}

function getAllDays(date: Dayjs) {
    const daysInMonth = date.daysInMonth()
    const startDate = date.startOf('month')
    const day = startDate.day()

    console.log(startDate.subtract(3, 'day'))

    const daysInfo: Array<{date: Dayjs, currentMonth: boolean}> = new Array(6 * 7)
    for(let i = 0; i < day; i++) {
        daysInfo[i] = {
            date: startDate.subtract(day - i, 'day'),
            currentMonth: false
        }
    }

    for(let i = day; i < daysInfo.length; i++) {
        const calcDate = startDate.add(i - day, 'day')
        daysInfo[i] = {
            date: calcDate,
            currentMonth: calcDate.month() === date.month()
        }
    }

    return daysInfo
}

const handleClick = (e: any) => {
    console.log(e)
}



function MonthCalendar(props: MonthCalendarProps) {
    const localeContext = useContext(LocaleContext)

    console.log(localeContext)
    const {
        value,
        dateRender,
        dateInnerContent,
        selectHandler,
        curMonth
    } = props;

    const CalenderLocale = allLocales[localeContext.locale]

    const weekList = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    const allDays = getAllDays(curMonth);

    function renderDays(
        days: Array<{date: Dayjs, currentMonth: boolean}>,
        // dateRender: MonthCalendarProps['dateRender'], 
        // dateInnerContent: MonthCalendarProps['dateInnerContent'],
        // value: Dayjs,
        // selectHandler: MonthCalendarProps['selectHandler']
    ) {
        const rows = []
        for(let i = 0; i < 6; i++) {
            const row = []
            for(let j = 0; j < 7; j++) {
                const item = days[i * 7 + j]
                row[j] = <div 
                    className={'calendar-month-body-cell ' + (item.currentMonth ? 'calendar-month-body-cell-current' : '')}
                    // onClick={() => selectHandler?.(item.date)}
                    onClick={handleClick}
                >
                    {
                        dateRender ? dateRender(item.date) : (
                            <div className='calendar-month-body-cell-date'>
                                <div className={
                                    cs("calendar-month-body-cell-date-value",
                                        value.format('YYYY-MM-DD') === item.date.format('YYYY-MM-DD')
                                            ? "calendar-month-body-cell-date-selected"
                                            : ""
                                    )
                                }>{item.date.date()}</div>
                                <div className='calendar-month-body-cell-date-content'>{dateInnerContent?.(item.date)}</div>
                            </div>
                        )
                    }
                    </div>
                
            }
    
            rows.push(row)
        }
        return rows.map(row => <div className='calendar-month-body-row'>{row}</div>)
    }
    return (
        <div className='calendar-month'>
            <div className='calendar-month-week-list'>
                {weekList.map((week)=> (
                    <div className='calendar-month-week-list-item' key={week}>
                        {CalenderLocale.week[week]}
                    </div>
                ))}
            </div>
            <div className='calendar-month-body'>
                {renderDays(allDays)}
            </div>
        </div>
    )
}

export default MonthCalendar