import React, { CSSProperties, ReactNode, useEffect, useImperativeHandle, useRef, useState } from 'react';
import MonthCalendar from './MonthCalendar';
import './index.scss';
import dayjs, { Dayjs } from 'dayjs';
import Header from './Header';
import cs from 'classnames'
import LocaleContext from './LocaleContext';
export interface CalendarProps {
    value: Dayjs;
    style?: CSSProperties;
    className?: string | string[];
    // 定制日期显示，会完全覆盖日期单元格
    dateRender?: (currentDate: Dayjs) => ReactNode;
    // 定制日期单元格，内容会被添加到单元格内，只在全屏日历模式下生效。
    dateInnerContent?: (currentDate: Dayjs) => ReactNode;
    // 国际化相关
    locale?: string;
    onChange?: (date: Dayjs) => void;
}

function Calendar(props: CalendarProps) {
    const {
        value,
        style,
        className,
        locale,
        onChange
    } = props;

    const [curValue, setCurValue] = useState<Dayjs>(value)

    const [curMonth, setCurMonth] = useState<Dayjs>(value);

    const classNames = cs("calendar", className);

    function changeDate(date: Dayjs) {
        setCurValue(date)
        setCurMonth(date)
        onChange?.(date)
    }

    function selectHandler(date: Dayjs) {
        changeDate(date)
    }

    function todayHandler() {
        const date = dayjs(Date.now())
        changeDate(date)
    }
    
    function prevMonthHandler() {
        setCurMonth(curMonth.subtract(1, 'month'))
    }

    function nextMonthHandler() {
        setCurMonth(curMonth.add(1, 'month'))
    }

    return <LocaleContext.Provider value={{
        locale: locale || navigator.language
    }}>
        <div className={classNames} style={style}>
            <Header curMonth={curMonth} todayHandler={todayHandler} prevMonthHandler={prevMonthHandler} nextMonthHandler={nextMonthHandler} />
            <MonthCalendar {...props} selectHandler={selectHandler} curMonth={curMonth} value={curValue} />
        </div>
    </LocaleContext.Provider>

}

export default Calendar;
