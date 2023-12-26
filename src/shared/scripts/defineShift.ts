export const defineShift = (hr: number) => {
  if (hr > 4 && hr < 12) {
    return 'MANHÃ'
  } else if (hr >= 12 && hr < 18) {
    return 'TARDE'
  }
  return 'NOITE'
}
