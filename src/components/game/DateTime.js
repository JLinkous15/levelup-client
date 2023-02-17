export const DateTimeConverter = (date) => {
    const [newDate, time] = date.split("T")
    const newTime = time.slice(0,5)
    return [newDate, newTime]
}

export const DateTimeFieldConverter = (datetime) => {
    return `${datetime}:00Z`
}

export const DefaultDate = (date) => {
    const newDate = date.substring(0, date.length-4)
    return newDate
}