export const decimalToDegrees = (degrees: number, minutes: number, seconds: number) => {
    return degrees + (minutes / 60) + (seconds / 3600)
}