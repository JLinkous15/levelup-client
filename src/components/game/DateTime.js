export const DateTimeConverter = (date) => {
    const [newDate, time] = date.split("T")
    const newTime = time.slice(0,5)
    return [newDate, newTime]
}

export const DateTimeFieldConverter = (date, time) => {
    return `${date}T${time}Z`
}