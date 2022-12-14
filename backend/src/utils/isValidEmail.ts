export function isValidEmail(email: string): boolean {
  const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g
  return regexEmail.test(email)
}
