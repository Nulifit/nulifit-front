export function passwordValidator(password) {
  if (!password) return "A senha não pode estar vazia."
  if (password.length < 5) return 'A senha deve ter pelo menos 5 caracteres.'
  return ''
}
